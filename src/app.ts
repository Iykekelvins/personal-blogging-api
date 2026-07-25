import Fastify from 'fastify';
import healthRoute from './routes/health.js';
import prismaPlugin from './plugins/prisma.js';

const app = Fastify({ logger: true });

app.register(prismaPlugin);
app.register(healthRoute);

export default app;
