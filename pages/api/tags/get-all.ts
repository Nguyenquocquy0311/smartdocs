import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Tag from '@/models/Tag';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();

  try {
    const tags = await Tag.find();
    res.status(200).json({ message: 'Lấy dữ liệu thành công', data: tags});
  } catch (error) {
    res.status(500).json({ error: 'Failed to load tags' });
  }
}