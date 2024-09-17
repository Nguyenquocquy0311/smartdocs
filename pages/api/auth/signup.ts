import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/models/User';
import dbConnect from '@/lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { uid, email, password, full_name, gender, point } = req.body;

    try {
      await dbConnect();

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email đã tồn tại' });
      }

      // Tạo user mới
      const newUser = new User({
        uid,
        email,
        password,  
        full_name,
        gender,
        point,
      });

      await newUser.save(); // Lưu user vào MongoDB

      res.status(200).json({ message: 'Đã tạo user', user: newUser });
    } catch (e) {
      res.status(500).json({ message: 'Failed to save user', error: e });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
