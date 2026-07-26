import { type FastifySchema } from 'fastify';

export const registerAdminSchema: FastifySchema = {
	body: {
		type: 'object',
		additionalProperties: false,
		required: ['email', 'password'],
		properties: {
			email: {
				type: 'string',
				format: 'email',
			},
			password: {
				type: 'string',
				minLength: 6,
			},
		},
	},
};

export const loginAdminSchema: FastifySchema = {
	body: {
		type: 'object',
		additionalProperties: false,
		required: ['email', 'password'],
		properties: {
			email: {
				type: 'string',
				format: 'email',
			},
			password: {
				type: 'string',
				minLength: 6,
			},
		},
	},
};
