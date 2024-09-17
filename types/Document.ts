export interface Document {
  _id: string,
  title: string;
  description: string;
  category: string;
  fileUrl: string;
  fileType: string;
  downloadCount: number;
  likes: number;
  liked: boolean;
  createdAt: string;
  views: number;
  downloads: number;
  author: string;
  tags: string[];
  vip: boolean;
  downloadPoints: number;
}
