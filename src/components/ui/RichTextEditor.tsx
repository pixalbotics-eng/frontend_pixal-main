'use client';

import { useEffect, useRef } from 'react';

import 'react-quill/dist/quill.snow.css';

type QuillInstance = {
  root: HTMLElement;
  on: (event: string, handler: () => void) => void;
  clipboard: { dangerouslyPasteHTML: (html: string, source?: string) => void };
};

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content...',
  className = '',
  minHeight = '200px',
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillInstance | null>(null);
  const isInternalChange = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;
    let mounted = true;
    let cleanup: (() => void) | null = null;

    import('quill').then((QuillModule) => {
      if (!mounted || !containerRef.current) return;
      const Quill = QuillModule.default;
      const wrapper = containerRef.current;
      const editorRoot = document.createElement('div');
      editorRoot.style.minHeight = minHeight;
      wrapper.appendChild(editorRoot);

      const quill = new Quill(editorRoot, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link'],
            ['clean'],
          ],
        },
      }) as unknown as QuillInstance;

      if (value) {
        quill.clipboard.dangerouslyPasteHTML(value);
      }

      quill.on('text-change', () => {
        if (isInternalChange.current) return;
        const html = quill.root.innerHTML;
        onChangeRef.current(html === '<p><br></p>' ? '' : html);
      });

      quillRef.current = quill;

      cleanup = () => {
        quillRef.current = null;
        if (wrapper.contains(editorRoot)) wrapper.removeChild(editorRoot);
      };
    });

    return () => {
      mounted = false;
      if (cleanup) cleanup();
      else quillRef.current = null;
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;
    const current = quill.root.innerHTML;
    if (value === current) return;
    isInternalChange.current = true;
    quill.clipboard.dangerouslyPasteHTML(value || '');
    setTimeout(() => {
      isInternalChange.current = false;
    }, 0);
  }, [value]);

  return (
    <div
      className={`rich-text-editor-wrapper ${className}`}
      style={{ minHeight }}
      ref={containerRef}
    />
  );
}
