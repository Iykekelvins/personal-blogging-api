import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { AppError } from './AppError.js';
import { PrismaClientKnownRequestError } from '../generated/prisma/internal/prismaNamespace.js';

export function isFastifyError(error: unknown): error is FastifyError {
	return error instanceof Error && 'code' in error;
}

export const errorHandler = (
	error: FastifyError,
	request: FastifyRequest,
	reply: FastifyReply,
) => {
	console.log(error);

	if ((error as FastifyError).validation) {
		return reply.status(400).send({
			message: 'Validation error',
			errors: (error as FastifyError).validation?.map((err) => ({
				field: err.instancePath.slice(1),
				message: err.message,
			})),
		});
	}

	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		});
	}

	if (isFastifyError(error)) {
		if (error.code === 'FST_JWT_NO_AUTHORIZATION_IN_HEADER') {
			return reply.status(401).send({
				message: 'Authentication required',
			});
		}

		if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_INVALID') {
			return reply.status(401).send({
				message: 'Invalid authentication token',
			});
		}

		if (error.code === 'P2002') {
			if (error.message.includes('email')) {
				return reply.status(409).send({
					message: 'Email already exists',
				});
			}
			if (error.message.includes('slug')) {
				return reply.status(409).send({
					message: 'Slug already exists',
				});
			}

			return reply.status(409).send({
				message: 'Resource already exists',
			});
		}
	}

	return reply.status(500).send({
		message: 'Internal server error',
	});
};
