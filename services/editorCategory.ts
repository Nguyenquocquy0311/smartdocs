import { Category } from "@/types/Category";

const API_URL = '/api/categories';

export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch(`${API_URL}/get-all`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Hàm thêm mới một category
export const addCategory = async (categoryName: string): Promise<Category> => {
  try {
    const response = await fetch(`${API_URL}/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: categoryName }),
    });

    if (!response.ok) {
      throw new Error('Failed to add category');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error adding category:', error);
    throw error;
  }
};

// Hàm cập nhật category theo id
export const updateCategory = async (categoryId: string, categoryName: string): Promise<Category> => {
  try {
    const response = await fetch(`${API_URL}/update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: categoryId, name: categoryName }),
    });

    if (!response.ok) {
      throw new Error('Failed to update category');
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

// Hàm xóa category theo id
export const deleteCategory = async (categoryId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: categoryId }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete category');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};
