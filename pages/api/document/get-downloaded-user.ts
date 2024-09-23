import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';
import Download from '@/models/Download';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    const { firebase_uid } = req.query;

    if (!firebase_uid) {
        return res.status(400).json({ message: 'Chưa truyền firebase_uid' });
    }

    try {
        const downloads = await Download.find({ userId: firebase_uid }).select('documentId');

        const documentIds = downloads.map(download => download.documentId);

        const docs = await Document.find({ _id: { $in: documentIds } }).select('title category tags description views createdAt downloadCount downloadPoints fileType');

        res.status(200).json({ message: 'Lấy dữ liệu thành công', data: docs });
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Không thể lấy dữ liệu tài liệu' });
    }
}
