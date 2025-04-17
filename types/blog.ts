// types/blog.ts
export interface BlogPost {
  title: string;
  imageUrl: string;
  author: {
    name: string
  };
  createdAt: string;
  content: string;
}
