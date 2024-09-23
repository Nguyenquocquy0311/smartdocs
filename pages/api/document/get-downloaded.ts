import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';
import Download from '@/models/Download';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    try {
        const docs = await Download.find();
        res.status(200).json({ message: 'Lấy dữ liệu thành công', data: docs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load downloaded docs' });
    }
}