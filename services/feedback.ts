import { Feedback } from "@/types/Feedback";

const API_URL = '/api/feedback';

export const getFeedbacksWithDocs = async (document: string): Promise<Feedback[]> => {
  try {
    const response = await fetch(`${API_URL}/get-with-docs?documentId=${document}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch feedback');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const addFeedback = async (author: string, document: string, rating: number, comment: string): Promise<Feedback> => {
  try {
    const response = await fetch(`${API_URL}/post`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ author: author, document: document, rating: rating, comment: comment }),
    });

    if (!response.ok) {
      throw new Error('Failed to add feedback');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error adding feedback:', error);
    throw error;
  }
};

