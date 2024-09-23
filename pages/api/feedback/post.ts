import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/models/Feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { author, document, rating, comment } = req.body;

        try {
            await dbConnect();

            const newFeedback = new Feedback({
                author,
                document,
                rating,
                comment
            });

            await newFeedback.save();

            res.status(200).json({ message: 'Thêm phản hổi thành công', newFeedback: newFeedback });
        } catch (e) {
            res.status(500).json({ message: 'Có lỗi xảy ra khi thêm phản hổi', error: e });
        }
    } else {
        res.status(405).json({ message: `Method ${req.method} không được hỗ trợ` });
    }
}
