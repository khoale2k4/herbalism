// types/blog.ts
export interface BlogPost {
    title: string;
    titleImg: string;
    author: string;
    date: string;
    content: (string | JSX.Element)[];
  }
  