import { FastifyPluginAsync } from 'fastify';
import { RegisterAdminDto, LoginAdminDto } from '../types/auth.js';
import { registerAdminSchema, loginAdminSchema } from '../schemas/auth.js';
import auth from '../services/auth.js';

const authRoutes: FastifyPluginAsync = async (app) => {
	app.post<{
		Body: RegisterAdminDto;
	}>(
		'/register',
		{
			schema: registerAdminSchema,
		},
		async (request, reply) => {
			const admin = await auth.registerAdmin(app.prisma, request.body);
			return admin;
		},
	);

	app.post<{
		Body: LoginAdminDto;
	}>(
		'/login',
		{
			schema: loginAdminSchema,
		},
		async (request, reply) => {
			const admin = await auth.loginAdmin(app.prisma, request.body);
			const token = await reply.jwtSign({
				id: admin.id,
				email: admin.email,
			});

			return { admin, token };
		},
	);
};

export default authRoutes;
