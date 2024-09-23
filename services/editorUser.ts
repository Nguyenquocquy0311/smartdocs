
const API_URL = '/api/user';

export const getAllUsers = async (): Promise<Document[]> => {
    try {
        const response = await fetch(`${API_URL}`, {
            method: 'GET',
        });

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching docs:', error);
        throw error;
    }
};

export const getProfileUser = async (firebase_uid: string): Promise<Document[]> => {
    try {
        const response = await fetch(`${API_URL}?firebase_uid=${firebase_uid}`, {
            method: 'GET',
        });

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching docs:', error);
        throw error;
    }
};

