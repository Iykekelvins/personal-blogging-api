import Fastify from 'fastify';

const app = Fastify({ logger: true });

app.get('/', async () => {
	return {
		message: 'Personal Blogging API is running',
	};
});

export default app;
