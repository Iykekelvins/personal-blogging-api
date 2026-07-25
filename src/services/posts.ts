import { PrismaClient } from '../generated/prisma/client.js';
import { CreatePostDto, UpdatePostDto } from '../types/posts.js';
import { AppError } from '../utils/AppError.js';

const getAllPosts = async (prisma: PrismaClient) => {
	return prisma.post.findMany();
};

const getPostById = async (prisma: PrismaClient, id: number) => {
	const post = await prisma.post.findUnique({ where: { id } });

	if (!post) {
		throw new AppError('Post not found', 404);
	}

	return post;
};

const createPost = async (
	prisma: PrismaClient,
	data: CreatePostDto & { adminId: number },
) => {
	return prisma.post.create({
		data,
	});
};

const updatePost = async (prisma: PrismaClient, id: number, data: UpdatePostDto) => {
	const post = await prisma.post.findUnique({
		where: { id },
	});

	if (!post) {
		throw new AppError('Post not found', 404);
	}

	return prisma.post.update({
		where: { id },
		data,
	});
};

export async function deletePost(prisma: PrismaClient, id: number) {
	const post = await prisma.post.findUnique({
		where: { id },
	});

	if (!post) {
		throw new AppError('Post not found', 404);
	}

	return prisma.post.delete({
		where: { id },
	});
}

export default {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
};
