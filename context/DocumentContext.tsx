import React, { createContext, useState, ReactNode, useContext } from 'react';
import { Document } from '../types/Document';

interface DocumentContextType {
  selectedDocument: Document | null;
  setSelectedDocument: (doc: Document) => void;
}

// Khởi tạo context
const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

// Custom hook để sử dụng DocumentContext
export const useDocument = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
};

// Provider để bao bọc ứng dụng
export const DocumentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  return (
    <DocumentContext.Provider value={{ selectedDocument, setSelectedDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};
