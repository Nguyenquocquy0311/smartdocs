import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  const { documentId } = req.query;

  try {
    const document = await Document.findById(documentId);

    if (!document) {
      return res.status(404).json({ error: 'Tài liệu không tồn tại.' });
    }

    res.status(200).json({ downloadUrl: document.fileUrl });
  } catch (error) {
    res.status(500).json({ error: 'Lỗi hệ thống khi tải tài liệu.' });
  }
}
