// Its purpose is to teach TypeScript about our custom Fastify properties.
import { PrismaClient } from '../generated/prisma/client.ts';

declare module 'fastify' {
	interface FastifyInstance {
		prisma: PrismaClient;
	}
}
