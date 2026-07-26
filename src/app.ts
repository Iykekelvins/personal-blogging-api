import Fastify, { FastifyError } from 'fastify';
import healthRoute from './routes/health.js';
import prismaPlugin from './plugins/prisma.js';
import postsRoutes from './routes/posts.js';
import authRoutes from './routes/auth.js';
import fastifyJwt from '@fastify/jwt';
import { errorHandler } from './utils/error.js';

const app = Fastify({ logger: true });

app.register(prismaPlugin);
app.register(fastifyJwt, {
	secret: process.env.JWT_SECRET!,
});
app.register(healthRoute);
app.register(authRoutes, {
	prefix: '/api/auth',
});
app.register(postsRoutes, {
	prefix: '/api/posts',
});

app.setErrorHandler(errorHandler);

export default app;
