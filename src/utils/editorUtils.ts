import { DocumentStats } from '../types';

export function calculateDocumentStats(text: string, html: string): DocumentStats {
  const cleanText = text.trim();
  
  if (!cleanText) {
    return {
      words: 0,
      characters: 0,
      charactersNoSpaces: 0,
      paragraphs: 0,
      sentences: 0,
      readingTimeMinutes: 0,
      speakingTimeMinutes: 0,
      readingEaseScore: 100,
      readingEaseLevel: 'Very Easy'
    };
  }

  // Words count
  const wordsArray = cleanText.split(/\s+/).filter(w => w.length > 0);
  const words = wordsArray.length;

  // Characters
  const characters = cleanText.length;
  const charactersNoSpaces = cleanText.replace(/\s+/g, '').length;

  // Paragraphs (from HTML or cleanText double newlines)
  const paragraphMatches = html.match(/<(p|h[1-6]|li|blockquote|tr)[^>]*>/gi);
  const paragraphs = paragraphMatches ? Math.max(1, paragraphMatches.length) : Math.max(1, cleanText.split(/\n\s*\n/).length);

  // Sentences
  const sentenceMatches = cleanText.match(/[^.!?]+[.!?]+(\s|$)/g);
  const sentences = sentenceMatches ? sentenceMatches.length : (words > 0 ? 1 : 0);

  // Times
  const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));
  const speakingTimeMinutes = Math.max(1, Math.ceil(words / 130));

  // Flesch Reading Ease
  // Score = 206.835 - 1.015 * (total words / total sentences) - 84.6 * (total syllables / total words)
  let totalSyllables = 0;
  for (const word of wordsArray) {
    totalSyllables += countSyllables(word);
  }
  
  const wordsPerSentence = sentences > 0 ? words / sentences : 1;
  const syllablesPerWord = words > 0 ? totalSyllables / words : 1;
  
  let score = Math.round(206.835 - (1.015 * wordsPerSentence) - (84.6 * syllablesPerWord));
  score = Math.max(0, Math.min(100, score));

  let level = 'Standard';
  if (score >= 90) level = 'Very Easy (5th grade)';
  else if (score >= 80) level = 'Easy (6th grade)';
  else if (score >= 70) level = 'Fairly Easy (7th grade)';
  else if (score >= 60) level = 'Standard (8th–9th grade)';
  else if (score >= 50) level = 'Fairly Difficult (10th–12th grade)';
  else if (score >= 30) level = 'Difficult (College)';
  else level = 'Very Difficult (Academic/Technical)';

  return {
    words,
    characters,
    charactersNoSpaces,
    paragraphs,
    sentences,
    readingTimeMinutes,
    speakingTimeMinutes,
    readingEaseScore: score,
    readingEaseLevel: level
  };
}

function countSyllables(word: string): number {
  const clean = word.toLowerCase().replace(/[^a-z]/g, '');
  if (clean.length <= 3) return 1;
  const matches = clean.match(/[aeiouy]{1,2}/g);
  let syllables = matches ? matches.length : 1;
  if (clean.endsWith('e') && !clean.endsWith('le')) {
    syllables = Math.max(1, syllables - 1);
  }
  return syllables;
}

export function htmlToMarkdown(html: string): string {
  if (!html) return '';
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');

  function nodeToMd(node: Node): string {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent || '';
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return '';

    const el = node as HTMLElement;
    const tag = el.tagName.toLowerCase();
    const children = Array.from(el.childNodes).map(nodeToMd).join('');

    switch (tag) {
      case 'h1': return `\n# ${children}\n\n`;
      case 'h2': return `\n## ${children}\n\n`;
      case 'h3': return `\n### ${children}\n\n`;
      case 'h4': return `\n#### ${children}\n\n`;
      case 'h5': return `\n##### ${children}\n\n`;
      case 'h6': return `\n###### ${children}\n\n`;
      case 'p': return `\n${children}\n`;
      case 'strong':
      case 'b': return `**${children}**`;
      case 'em':
      case 'i': return `*${children}*`;
      case 'u': return `<u>${children}</u>`;
      case 's':
      case 'strike': return `~~${children}~~`;
      case 'code':
        if (el.parentElement?.tagName.toLowerCase() === 'pre') return children;
        return `\`${children}\``;
      case 'pre': return `\n\`\`\`\n${children.trim()}\n\`\`\`\n\n`;
      case 'blockquote': return `\n> ${children.trim().replace(/\n/g, '\n> ')}\n\n`;
      case 'ul':
        if (el.getAttribute('data-type') === 'taskList') {
          return `\n${children}\n`;
        }
        return `\n${children}\n`;
      case 'ol': return `\n${children}\n`;
      case 'li': {
        if (el.getAttribute('data-type') === 'taskItem') {
          const isChecked = el.getAttribute('data-checked') === 'true' || el.querySelector('input[type="checkbox"]:checked') !== null;
          const textContent = el.querySelector('div')?.textContent || children;
          return `- [${isChecked ? 'x' : ' '}] ${textContent.trim()}\n`;
        }
        const parent = el.parentElement;
        if (parent && parent.tagName.toLowerCase() === 'ol') {
          const index = Array.from(parent.children).indexOf(el) + 1;
          return `${index}. ${children.trim()}\n`;
        }
        return `- ${children.trim()}\n`;
      }
      case 'a': return `[${children}](${el.getAttribute('href') || ''})`;
      case 'img': return `![${el.getAttribute('alt') || 'image'}](${el.getAttribute('src') || ''})`;
      case 'hr': return `\n---\n\n`;
      case 'mark': return `<mark>${children}</mark>`;
      case 'table': {
        const rows = Array.from(el.querySelectorAll('tr'));
        if (rows.length === 0) return '';
        let mdTable = '\n';
        rows.forEach((row, rowIndex) => {
          const cells = Array.from(row.querySelectorAll('th, td'));
          mdTable += '| ' + cells.map(c => c.textContent?.trim() || '').join(' | ') + ' |\n';
          if (rowIndex === 0) {
            mdTable += '| ' + cells.map(() => '---').join(' | ') + ' |\n';
          }
        });
        return mdTable + '\n';
      }
      case 'div':
        if (el.classList.contains('callout')) {
          return `\n> **Note:** ${children.trim()}\n\n`;
        }
        return `${children}\n`;
      default:
        return children;
    }
  }

  return nodeToMd(doc.body).replace(/\n{3,}/g, '\n\n').trim();
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
