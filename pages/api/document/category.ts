import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';
import mongoose from 'mongoose';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { category, currentDocId } = req.query;

    if (!category) {
        return res.status(400).json({ message: 'Chưa truyền tham số thể loại' });
    }

    try {
        const currentDocObjectId = new mongoose.Types.ObjectId(currentDocId as string);

        const docs = await Document.find({
            _id: { $ne: currentDocObjectId },
            category: category
        });
        res.status(200).json({ message: 'Lấy dữ liệu thành công', count: docs.length, data: docs });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load documents' });
    }
}