import React from 'react';

interface SEOContentProps {
  content?: string;
  title?: string;
}

const bold = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
const isBullet = (line: string) => /^[-•]\s+/.test(line);
const isNumbered = (line: string) => /^\d+\.\s+/.test(line);

export default function SEOContent({ content, title }: SEOContentProps) {
  if (!content) return null;

  // Parses basic markdown-like structures into semantic SEO-friendly HTML.
  // Blocks are separated by a blank line. Inside a block, «- » lines are a bullet list and a block
  // made only of «1. » lines is a numbered list; before 2026-11-19 both ran together as one line.
  const formatContent = (text: string) => {
    return text.split('\n\n').map((paragraph, index) => {
      const lines = paragraph.split('\n').map((line) => line.trim()).filter(Boolean);

      // H2 Headers: Wrapped in ** but on a single line
      if (paragraph.startsWith('**') && paragraph.endsWith('**') && !paragraph.slice(2, -2).includes('**')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4">
            {paragraph.replace(/\*\*/g, '')}
          </h2>
        );
      }

      // Bullet list, optionally led by lines of text: every line from the first «- » on is an item.
      const firstBullet = lines.findIndex(isBullet);
      if (firstBullet >= 0 && lines.slice(firstBullet).every(isBullet)) {
        const lead = lines.slice(0, firstBullet);
        return (
          <div key={index} className="mb-6">
            {lead.length > 0 && (
              <p
                className="mb-2 text-lg font-semibold text-gray-900"
                dangerouslySetInnerHTML={{ __html: bold(lead.join(' ')) }}
              />
            )}
            <ul className="list-disc space-y-2 pr-6 text-lg text-gray-700 leading-relaxed">
              {lines.slice(firstBullet).map((line, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: bold(line.replace(/^[-•]\s+/, '')) }} />
              ))}
            </ul>
          </div>
        );
      }

      // Numbered list: two or more lines, each «1. …» (steps).
      if (lines.length >= 2 && lines.every(isNumbered)) {
        return (
          <ol key={index} className="mb-6 list-decimal space-y-2 pr-6 text-lg text-gray-700 leading-relaxed">
            {lines.map((line, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: bold(line.replace(/^\d+\.\s+/, '')) }} />
            ))}
          </ol>
        );
      }

      // H3 Headers: Numbered lists like "1. Title\nDescription"
      if (paragraph.match(/^\d+\./)) {
        const heading = lines[0];
        const bodyParts = lines.slice(1);

        return (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-primary mb-2">
              {heading.replace(/\*\*/g, '')}
            </h3>
            {bodyParts.length > 0 && (
              <p
                className="text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: bold(bodyParts.join('<br />')) }}
              />
            )}
          </div>
        );
      }

      // A short line on its own with no closing punctuation is a section title («أخطاء شائعة»).
      if (lines.length === 1 && lines[0].length <= 40 && !/[.،؛:!؟?]$/.test(lines[0])) {
        return (
          <h3 key={index} className="mt-6 mb-3 text-xl font-semibold text-primary">
            {lines[0].replace(/\*\*/g, '')}
          </h3>
        );
      }

      // Normal paragraph
      return (
        <p
          key={index}
          className="mb-5 text-lg text-gray-700 leading-relaxed"
          dangerouslySetInnerHTML={{ __html: bold(paragraph) }}
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
