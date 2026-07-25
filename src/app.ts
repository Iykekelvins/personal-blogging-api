import Fastify from 'fastify';
import healthRoute from './routes/health.js';
import prismaPlugin from './plugins/prisma.js';
import postsRoutes from './routes/posts.js';
import { AppError } from './utils/AppError.js';

const app = Fastify({ logger: true });

app.register(prismaPlugin);
app.register(healthRoute);
app.register(postsRoutes, {
	prefix: '/posts',
});

app.setErrorHandler((error, request, reply) => {
	if (error instanceof AppError) {
		return reply.status(error.statusCode).send({
			message: error.message,
		});
	}

	return reply.status(500).send({
		message: 'Internal server error',
	});
});

export default app;
