// components/BlogContent.tsx
import { ReactNode, ReactElement, isValidElement } from 'react';
import Image from 'next/image';
import parse, { domToReact } from 'html-react-parser';
import type { HTMLReactParserOptions, Element } from 'html-react-parser';

interface BlogContentProps {
  children: ReactNode;
}

const BlogContent = ({ children }: BlogContentProps) => {
  return (
    <div className="prose max-w-none
                prose-headings:font-normal
                prose-p:leading-relaxed prose-p:text-justify
                prose-img:rounded-xl prose-img:shadow-lg
                prose-blockquote:border-l-4 prose-blockquote:border-primary
                prose-blockquote:bg-gray-50
                prose-ul:list-disc prose-ol:list-decimal prose-li:ml-6
                prose-a:text-blue-600 hover:prose-a:text-blue-800
                prose-pre:bg-gray-100
                prose-code:before:content-none prose-code:after:content-none">
      {children}
    </div>
  );
};

const options: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (
      domNode.type === 'tag' &&
      domNode.name === 'span' &&
      domNode.attribs?.class?.includes('ql-ui')
    ) {
      // Bỏ span.ql-ui không render gì cả
      return null;
    }
  },
};

const processContent = (content: string): ReactNode => {
  return parse(content, options);
};

export { BlogContent, processContent };