import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    try {
        const docs = await Document.find({ justPosted: true })
        res.status(200).json({ message: 'Lấy dữ liệu thành công', data: docs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load documents' });
    }
}