import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const categories = await Category.find();
    res.status(200).json({ message: 'Lấy dữ liệu thành công', data: categories});
  } catch (error) {
    res.status(500).json({ error: 'Failed to load categories' });
  }
}