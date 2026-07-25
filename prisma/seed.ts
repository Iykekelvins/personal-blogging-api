import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({
	connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
	adapter,
});

async function main() {
	console.log('RUNNING SEED...');

	await prisma.admin.create({
		data: {
			email: 'kelvinadmin@blogging.com',
			password: 'password123',
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (err) => {
		console.error(err);
		await prisma.$disconnect();
		process.exit(1);
	});
