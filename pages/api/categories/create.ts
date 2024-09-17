import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { name } = req.body;

      if (!name) {
        return res.status(400).json({ message: 'Tên thể loại không được để trống' });
      }

      const existingCategories = await Category.findOne({ name });
      if (existingCategories) {
        return res.status(400).json({ message: 'Tên thể loại đã tồn tại' });
      }

      const newCategory = new Category({ name });
      await newCategory.save();

      return res.status(201).json({ message: 'Thêm thể loại mới thành công', data: newCategory });
    } catch (e) {
      return res.status(500).json({ message: 'Lỗi khi thêm thể loại', error: e });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
