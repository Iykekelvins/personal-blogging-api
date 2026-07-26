import { PrismaClient } from '../generated/prisma/client.js';
import { LoginAdminDto, RegisterAdminDto } from '../types/auth.js';
import { AppError } from '../utils/AppError.js';
import bcrypt from 'bcryptjs';

const registerAdmin = async (prisma: PrismaClient, data: RegisterAdminDto) => {
	const hashedPassword = await bcrypt.hash(data.password, 10);

	return prisma.admin.create({
		data: {
			email: data.email,
			password: hashedPassword,
		},
		omit: {
			password: true,
		},
	});
};

const loginAdmin = async (prisma: PrismaClient, data: LoginAdminDto) => {
	const admin = await prisma.admin.findUnique({
		where: { email: data.email },
	});
	if (!admin) {
		throw new AppError('Invalid credentials', 401);
	}

	const isPasswordValid = await bcrypt.compare(data.password, admin.password);
	if (!isPasswordValid) {
		throw new AppError('Invalid credentials', 401);
	}

	const { password, ...rest } = admin;

	return rest;
};

export default {
	registerAdmin,
	loginAdmin,
};
