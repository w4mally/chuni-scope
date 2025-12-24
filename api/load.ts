import { VercelRequest, VercelResponse } from '@vercel/node';
import Redis from 'ioredis';

const redis = new Redis(process.env.REDIS_URL!);

export default async function handler(req: VercelRequest, res: VercelResponse) {
	const { id } = req.query;

	if (!id || Array.isArray(id)) return res.status(400).json({ error: 'Invalid ID' });

	try {
		const dataStr = await redis.get(id);

		if (!dataStr) return res.status(404).json({ error: 'Data not found' });

		await redis.del(id);

		return res.status(200).json(JSON.parse(dataStr));
	} catch (error) {
		return res.status(500).json({ error: 'Internal Server Error' });
	} finally {
        await redis.quit();
    }
}
