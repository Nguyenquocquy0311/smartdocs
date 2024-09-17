import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Tag from '@/models/Tag';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Tên tag không được để trống' });
      }

      const existingTags = await Tag.findOne({ name });
      if (existingTags) {
        return res.status(400).json({ message: 'Tên tag đã tồn tại' });
      }

      const newTag = new Tag({ name });
      await newTag.save();

      return res.status(201).json({ message: 'Thêm tag thành công', data: newTag });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi thêm tag', error: e });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
