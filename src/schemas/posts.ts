import { type FastifySchema } from 'fastify';

export const createPostSchema: FastifySchema = {
	body: {
		type: 'object',
		additionalProperties: false,
		required: ['title', 'slug', 'content'],
		properties: {
			slug: {
				type: 'string',
				minLength: 1,
				maxLength: 100,
			},
			title: {
				type: 'string',
				minLength: 1,
				maxLength: 255,
			},
			content: {
				type: 'string',
				minLength: 1,
			},
		},
	},
};

export const updatePostSchema: FastifySchema = {
	body: {
		type: 'object',
		additionalProperties: false,
		properties: {
			slug: {
				type: 'string',
				minLength: 1,
			},
			title: {
				type: 'string',
				minLength: 1,
			},
			content: {
				type: 'string',
				minLength: 1,
			},
		},
	},
};
