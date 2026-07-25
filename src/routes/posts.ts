import { FastifyPluginAsync } from 'fastify';
import { createPostSchema, updatePostSchema } from '../schemas/posts.js';
import { CreatePostDto, UpdatePostDto } from '../types/posts.js';

import postService from '../services/posts.js';

type IdParams = {
	id: string;
};

const postsRoutes: FastifyPluginAsync = async (app) => {
	app.get('/', async () => {
		const posts = await postService.getAllPosts(app.prisma);

		return posts;
	});

	app.post<{
		Body: CreatePostDto;
	}>(
		'/',
		{
			schema: createPostSchema,
		},
		async (request, reply) => {
			const { content, title, slug } = request.body;

			const newPost = await postService.createPost(app.prisma, {
				content,
				title,
				slug,
				adminId: 1,
			});

			reply.status(201).send({
				message: 'Post created',
				post: newPost,
			});
		},
	);

	app.get<{
		Params: IdParams;
	}>('/:id', async (request, reply) => {
		const id = parseInt(request.params.id);
		const post = await postService.getPostById(app.prisma, id);

		return post;
	});

	app.put<{
		Params: IdParams;
		Body: UpdatePostDto;
	}>('/:id', { schema: updatePostSchema }, async (request, reply) => {
		const id = parseInt(request.params.id);

		const updatedPost = await postService.updatePost(app.prisma, id, request.body);

		reply.send(updatedPost);
	});

	app.delete<{
		Params: IdParams;
	}>('/:id', async (request, reply) => {
		const id = parseInt(request.params.id);
		await postService.deletePost(app.prisma, id);

		reply.status(204).send({
			message: 'Post deleted',
		});
	});
};

export default postsRoutes;
