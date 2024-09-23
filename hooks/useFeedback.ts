import { useState, useCallback } from 'react';
import { addFeedback, getFeedbacksWithDocs } from '@/services/feedback';
import { Feedback } from '@/types/Feedback';

export const useFeedback = (document: string) => {
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    const fetchFeedbacks = useCallback(async () => {
        try {
            const fetchedFeedbacks = await getFeedbacksWithDocs(document);
            setFeedbacks(fetchedFeedbacks);
        } catch (error) {
            console.error('Failed to fetch feedbacks', error);
        }
    }, [document]);

    const submitFeedback = async (userInfo: any, ratingValue: number, commentValue: string) => {
        try {
            await addFeedback(userInfo.uid, document, ratingValue, commentValue);
            await fetchFeedbacks();
        } catch (error) {
            throw new Error('Failed to submit feedback');
        }
    };

    return { feedbacks, fetchFeedbacks, submitFeedback };
};
