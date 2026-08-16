import { DocumentItem } from '../types';
import { TEMPLATES } from '../data/templates';

const STORAGE_KEY = 'rich_text_editor_docs_v1';
const ACTIVE_DOC_KEY = 'rich_text_editor_active_id_v1';

const INITIAL_DOCS: DocumentItem[] = [
  {
    id: 'doc-welcome',
    title: '✨ Welcome & Editor Guide',
    content: `
      <h1>✨ Welcome to the Modern Rich Text Editor</h1>
      <p>A fast, extensible, and typography-rich web document editor built for focused writing, structured notes, team minutes, and publication-ready documents.</p>

      <div class="callout callout-info">
        <p><strong>💡 Quick Tip:</strong> Type <code>/</code> anywhere on a new line to open the <strong>Slash Command Menu</strong>, or select any text to activate the <strong>Floating Bubble Toolbar</strong>.</p>
      </div>

      <h2>🚀 Core Capabilities at a Glance</h2>
      <ul data-type="taskList">
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div><strong>Document Formatting:</strong> H1-H4 headings, bold, italic, underline, strikethrough, highlights, code blocks, and subscripts.</div></li>
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div><strong>Interactive Tables:</strong> Insert custom grids, add/remove rows and columns, and customize table headers.</div></li>
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div><strong>Task Checklists:</strong> Interactive to-do items with click-to-toggle completion.</div></li>
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div><strong>Document Outline:</strong> Automatic hierarchical Table of Contents with jump-to-section navigation.</div></li>
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div><strong>Multiple View Modes:</strong> Realistic Paginated Sheet, Continuous Canvas, Split Markdown View, and Fullscreen Zen Mode.</div></li>
        <li data-checked="true" data-type="taskItem"><label><input type="checkbox" checked="checked"></label><div><strong>Export Options:</strong> Instant export to PDF/Print, Markdown (<code>.md</code>), Clean HTML (<code>.html</code>), and Plain Text (<code>.txt</code>).</div></li>
      </ul>

      <h2>📊 Sample Formatted Table</h2>
      <table style="width: 100%;">
        <thead>
          <tr>
            <th><strong>Shortcut</strong></th>
            <th><strong>Action</strong></th>
            <th><strong>Context</strong></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>Ctrl / ⌘ + B</code></td>
            <td>Bold selection</td>
            <td>Inline Text</td>
          </tr>
          <tr>
            <td><code>Ctrl / ⌘ + I</code></td>
            <td>Italicize selection</td>
            <td>Inline Text</td>
          </tr>
          <tr>
            <td><code>Ctrl / ⌘ + K</code></td>
            <td>Insert / Edit Link</td>
            <td>Inline Selection</td>
          </tr>
          <tr>
            <td><code>Ctrl / ⌘ + F</code></td>
            <td>Find & Replace</td>
            <td>Global Editor</td>
          </tr>
          <tr>
            <td><code>/</code></td>
            <td>Slash Command palette</td>
            <td>New Line</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <p>"Good typography is invisible. Great writing emerges when the tool fades away and thoughts flow seamlessly onto the page."</p>
      </blockquote>

      <h2>📝 Code Block Sample</h2>
      <pre><code>// Example TypeScript document hook
export function useAutoSave(content: string, delay = 1000) {
  useEffect(() => {
    const timer = setTimeout(() => saveToLocal(content), delay);
    return () => clearTimeout(timer);
  }, [content, delay]);
}</code></pre>
    `,
    createdAt: Date.now() - 3600000 * 24,
    updatedAt: Date.now() - 1000 * 60 * 15,
    isPinned: true,
    tags: ['Guide', 'Getting Started'],
    icon: 'Sparkles',
    wordCount: 320
  },
  {
    id: 'doc-roadmap',
    title: '🚀 Aurora Product Roadmap Spec',
    content: TEMPLATES.find(t => t.id === 'project-spec')?.content || '',
    createdAt: Date.now() - 3600000 * 48,
    updatedAt: Date.now() - 3600000 * 2,
    isPinned: true,
    tags: ['Work', 'Specification'],
    icon: 'Rocket',
    wordCount: 245
  },
  {
    id: 'doc-meeting',
    title: '👥 Weekly Engineering Sync Minutes',
    content: TEMPLATES.find(t => t.id === 'meeting-notes')?.content || '',
    createdAt: Date.now() - 3600000 * 72,
    updatedAt: Date.now() - 3600000 * 12,
    isPinned: false,
    tags: ['Meetings'],
    icon: 'Users',
    wordCount: 180
  }
];

export function loadDocuments(): DocumentItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Failed to load documents from localStorage', e);
  }
  saveDocuments(INITIAL_DOCS);
  return INITIAL_DOCS;
}

export function saveDocuments(docs: DocumentItem[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch (e) {
    console.error('Failed to save documents to localStorage', e);
  }
}

export function getActiveDocumentId(): string {
  try {
    const id = localStorage.getItem(ACTIVE_DOC_KEY);
    if (id) return id;
  } catch (e) {
    // Ignore
  }
  return 'doc-welcome';
}

export function setActiveDocumentId(id: string) {
  try {
    localStorage.setItem(ACTIVE_DOC_KEY, id);
  } catch (e) {
    // Ignore
  }
}
