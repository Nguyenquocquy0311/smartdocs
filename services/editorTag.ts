import { Tag } from "@/types/Tag";

const API_URL = '/api/tags';

export const getAllTags = async (): Promise<Tag[]> => {
  try {
    const response = await fetch(`${API_URL}/get-all`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch tags');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

export const addTag = async (tagName: string): Promise<Tag> => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: tagName }),
    });

    if (!response.ok) {
      throw new Error('Failed to add tag');
    }

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

    if (!response.ok) {
      throw new Error('Failed to update tag');
    }

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
