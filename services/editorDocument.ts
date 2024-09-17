import { Document } from "@/types/Document";

const API_URL = '/api/document';

export const getAllDocument = async (): Promise<Document[]> => {
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

export const getApprovedDocument = async (): Promise<Document[]> => {
  try {
    const response = await fetch(`${API_URL}/approved`, {
      method: 'GET',
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching docs:', error);
    throw error;
  }
};

export const getDocumentWithCategory = async (category: string): Promise<Document[]> => {
  try {
    const response = await fetch(`${API_URL}/category?category=${category}`, {
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
    const response = await fetch(`${API_URL}/uploaded?firebase_uid=${firebase_uid}`, {
      method: 'GET',
    });

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching docs:', error);
    throw error;
  }
};

export const uploadDocument = async (documentData: Document) => {
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(documentData),
  });

  if (!response.ok) {
    throw new Error('Failed to upload document data');
  }

  return response.json();
};

export const downloadDocument = async (documentId: string) => {
  try {
    const response = await fetch(`/api/document/download?documentId=${documentId}`);
    const data = await response.json();

    if (response.ok) {
      window.location.href = data.downloadUrl;
    } else {
      throw new Error('Tải tài liệu thất bại');
    }
  } catch (error) {
    throw new Error('Lỗi hệ thống khi tải tài liệu.');
  }
};