import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    try {
        const users = await User.find({});
        res.status(200).json({ message: 'Lấy dữ liệu thành công', data: users });
    } catch (error) {
        res.status(500).json({ error: 'Failed to load users' });
    }
}