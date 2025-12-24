import { VercelRequest, VercelResponse } from '@vercel/node';
import Redis from 'ioredis';
import { v4 as uuidv4 } from 'uuid';

const ALLOWED_ORIGINS = [
	'https://new.chunithm-net.com',
	'http://localhost:3000',
	'http://localhost:5173',
];

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const origin = req.headers.origin;
    const redis = new Redis(process.env.REDIS_URL!);

	if (origin && ALLOWED_ORIGINS.includes(origin)) {
		res.setHeader('Access-Control-Allow-Origin', origin);
	} else {
		return res.status(403).end();
	}

	res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

	if (req.method === 'OPTIONS') {
		return res.status(200).end();
	}

	try {
		const data = req.body;
		const id = uuidv4();

		await redis.setex(id, 600, JSON.stringify(data));

		return res.status(200).json({ id });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: 'Internal Server Error' });
	} finally {
        await redis.quit();
    }
}
