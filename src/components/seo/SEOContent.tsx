import React from 'react';

interface SEOContentProps {
  content?: string;
  title?: string;
}

export default function SEOContent({ content, title }: SEOContentProps) {
  if (!content) return null;

  // Parses basic markdown-like structures into semantic SEO-friendly HTML
  const formatContent = (text: string) => {
    // Split by double newlines to separate paragraphs and blocks
    return text.split('\\n\\n').map((paragraph, index) => {
      
      // H2 Headers: Wrapped in ** but on a single line
      if (paragraph.startsWith('**') && paragraph.endsWith('**') && !paragraph.slice(2, -2).includes('**')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace(/\\*\\*/g, '')}
          </h2>
        );
      }
      
      // H3 Headers: Numbered lists like "1. Title\\nDescription"
      if (paragraph.match(/^\\d+\\./)) {
        const lines = paragraph.split('\\n');
        const heading = lines[0];
        const bodyParts = lines.slice(1);
        
        return (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-2">
              {heading.replace(/\\*\\*/g, '')}
            </h3>
            {bodyParts.length > 0 && (
              <p 
                className="text-gray-700 leading-relaxed" 
                dangerouslySetInnerHTML={{ 
                  __html: bodyParts.join('<br />').replace(/\\*\\*([^\\*]+)\\*\\*/g, '<strong>$1</strong>') 
                }} 
              />
            )}
          </div>
        );
      }

      // Normal paragraph
      return (
        <p key={index} className="mb-5 text-lg text-gray-700 leading-relaxed" 
           dangerouslySetInnerHTML={{ 
             __html: paragraph.replace(/\\*\\*([^\\*]+)\\*\\*/g, '<strong>$1</strong>') 
           }} 
        />
      );
    });
  };

  return (
    <article className="mt-12 bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 animate-fade-in-delay-6">
      {title && (
        <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
          {title}
        </h2>
      )}
      <div className="seo-content-wrapper">
        {formatContent(content)}
      </div>
    </article>
  );
}
