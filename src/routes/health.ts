import { FastifyPluginAsync } from 'fastify';

const healthRoute: FastifyPluginAsync = async (app) => {
	app.get('/', async () => {
		return {
			message: 'Personal Blogging API is running',
		};
	});
};

export default healthRoute;
