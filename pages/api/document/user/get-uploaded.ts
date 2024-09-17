import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { firebase_uid } = req.query;

  if (!firebase_uid) {
    return res.status(400).json({ message: 'Chưa truyền firebase_uid' });
  }

  try {
    const docs = await Document.find({ approved: true, author: firebase_uid }).select('title category tags description view createdAt downloadCount downloadPoints fileType');
    res.status(200).json({ message: 'Lấy dữ liệu thành công', data: docs });
  } catch (error) {
    res.status(500).json({ error: 'Failed to load categories' });
  }
}