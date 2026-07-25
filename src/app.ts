import Fastify from 'fastify';
import healthRoute from './routes/health.js';

const app = Fastify({ logger: true });

app.register(healthRoute);

export default app;
