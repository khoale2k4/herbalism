// components/BlogContent.tsx
import { ReactNode, ReactElement, isValidElement } from 'react';
import Image from 'next/image';

interface BlogContentProps {
  children: ReactNode;
}

const BlogContent = ({ children }: BlogContentProps) => {
  return (
    <div className="prose prose-lg max-w-none  
                  prose-headings: prose-headings:font-normal
                  prose-p:leading-relaxed prose-p:text-justify
                  prose-img:rounded-xl prose-img:shadow-lg
                  prose-blockquote:border-l-4 prose-blockquote:border-primary
                  prose-blockquote:bg-gray-50 prose-blockquote:
                  prose-ul:list-disc prose-ol:list-decimal
                  prose-a:text-blue-600 hover:prose-a:text-blue-800
                  prose-pre:bg-gray-100 prose-pre:
                  prose-code:before:content-none prose-code:after:content-none">
      {children}
    </div>
  );
};

const isImageElement = (element: any): element is ReactElement<typeof Image> => {
  return isValidElement(element) && element.type === Image;
};

const processContent = (content: ReactNode[]) => {
  return content.map((item, index) => {
    if (item == null) return null;
    
    if (typeof item === 'string' || typeof item === 'number' || typeof item === 'boolean') {
      return <p key={index} className="mb-6">{item.toString()}</p>;
    }

    if (!isValidElement(item)) {
      return <div key={index} className="my-6">{item}</div>;
    }

    // Xử lý hình ảnh
    if (isImageElement(item)) {
      return (
        <div key={index} className="my-8 flex justify-center">
          {item}
        </div>
      );
    }

    // Xử lý headings
    if (typeof item.type === 'string') {
      switch (item.type) {
        case 'h1':
          return <h1 key={index} className="text-4xl mt-12 mb-6 ">{item.props.children}</h1>;
        case 'h2':
          return <h2 key={index} className="text-3xl mt-10 mb-5 ">{item.props.children}</h2>;
        case 'h3':
          return <h3 key={index} className="text-2xl mt-8 mb-4">{item.props.children}</h3>;
        case 'ul':
        case 'ol':
          return (
            <item.type 
              key={index} 
              className={`${item.props.className || ''} my-6 pl-6 space-y-2`}
            >
              {item.props.children}
            </item.type>
          );
        case 'blockquote':
          return (
            <blockquote key={index} className="my-8 p-6 italic border-l-4 border-primary bg-gray-50 ">
              {item.props.children}
            </blockquote>
          );
        default:
          return <div key={index} className="my-6">{item}</div>;
      }
    }

    // Mặc định cho các phần tử JSX khác
    return <div key={index} className="my-6">{item}</div>;
  });
};

export { BlogContent, processContent };