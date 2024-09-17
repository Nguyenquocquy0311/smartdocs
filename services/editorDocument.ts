const API_URL = '/api/document';

export const getApprovedDocument = async (): Promise<Document[]> => {
  try {
    const response = await fetch(`${API_URL}/user/get-all`, {
      method: 'GET',
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching docs:', error);
    throw error;
  }
};

export const getUploadedDocument = async (firebase_uid: string): Promise<Document[]> => {
  try {
    const response = await fetch(`${API_URL}/user/get-uploaded?firebase_uid=${firebase_uid}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching docs:', error);
    throw error;
  }
};

export const addTag = async (tagName: string): Promise<Document> => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: tagName }),
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error adding tag:', error);
    throw error;
  }
};

export const updateTag = async (tagId: string, tagName: string): Promise<Tag> => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: tagId, name: tagName }),
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating tag:', error);
    throw error;
  }
};

export const deleteTag = async (tagId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: tagId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete tag');
    }
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw error;
  }
};
