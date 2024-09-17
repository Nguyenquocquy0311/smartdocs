import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Document from '@/models/Document';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { title, description, category, fileUrl, source, downloadPoints, tags, author } = req.body;
    
    try {
      await dbConnect();

      const existingDocs = await Document.findOne({ title });
      if (existingDocs) {
        return res.status(400).json({ message: 'Tên tài liệu đã tồn tại' });
      }

      const newDocument = new Document({
        title,
        description,
        category,
        fileUrl,
        source,
        downloadPoints,
        tags,
        author,
      });
      
      await newDocument.save();
      
      res.status(200).json({ message: 'Tài liệu đã được tải lên và lưu vào db thành công', document: newDocument });
    } catch (e) {
      res.status(500).json({ message: 'Có lỗi xảy ra khi tải tài liệu lên', error: e });
    }
  } else {
    res.status(405).json({ message: `Method ${req.method} không được hỗ trợ` });
  }
}
