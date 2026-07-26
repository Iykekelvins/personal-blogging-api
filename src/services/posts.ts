import { PrismaClient, Prisma } from '../generated/prisma/client.js';
import { CreatePostDto, UpdatePostDto } from '../types/posts.js';
import { AppError } from '../utils/AppError.js';

export type PostsQuery = {
	date?: string;
};

const getAllPosts = async (prisma: PrismaClient, filters: PostsQuery) => {
	const where: Prisma.PostWhereInput = {
		publishedAt: {
			not: null,
		},
	};

	if (filters.date) {
		where.publishedAt = {
			gte: new Date(filters.date),
		};
	}

	const posts = prisma.post.findMany({
		where,
		orderBy: {
			publishedAt: 'desc',
		},
	});

	return posts;
};

const getPostById = async (prisma: PrismaClient, id: number) => {
	const post = await prisma.post.findUnique({
		where: {
			id,
			publishedAt: {
				not: null,
			},
		},
	});

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

const deletePost = async (prisma: PrismaClient, id: number) => {
	const post = await prisma.post.findUnique({
		where: { id },
	});

	if (!post) {
		throw new AppError('Post not found', 404);
	}

	return prisma.post.delete({
		where: { id },
	});
};

const publishPost = async (prisma: PrismaClient, id: number) => {
	const post = await prisma.post.findUnique({
		where: { id },
	});

	if (!post) {
		throw new AppError('Post not found', 404);
	}

	return prisma.post.update({
		where: { id },
		data: {
			publishedAt: new Date(),
		},
	});
};

const authorizePostOwner = async (
	prisma: PrismaClient,
	postId: number,
	adminId: number,
) => {
	const post = await prisma.post.findUnique({
		where: { id: postId },
	});

	if (!post) {
		throw new AppError('Post not found', 404);
	}

	if (adminId !== post?.adminId) {
		throw new AppError('Not allowed', 403);
	}
};

export default {
	getAllPosts,
	getPostById,
	createPost,
	updatePost,
	deletePost,
	publishPost,
	authorizePostOwner,
};
