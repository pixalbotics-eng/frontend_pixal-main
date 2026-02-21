'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import 'react-quill/dist/quill.snow.css';
import ImageCropModal from './ImageCropModal';

type QuillInstance = {
  root: HTMLElement;
  on: (event: string, handler: () => void) => void;
  clipboard: { dangerouslyPasteHTML: (html: string, source?: string) => void };
  getModule: (name: string) => { container: HTMLElement };
  getSelection: (focus?: boolean) => { index: number } | null;
  insertEmbed: (index: number, type: string, value: string) => void;
};

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  /** When true, toolbar shows image button that opens file picker and crop modal before inserting. */
  enableImageWithCrop?: boolean;
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder = 'Write content...',
  className = '',
  minHeight = '200px',
  enableImageWithCrop = false,
}: RichTextEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const quillRef = useRef<QuillInstance | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageTriggerRef = useRef<() => void>(() => {});
  const isInternalChange = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [cropOpen, setCropOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  useEffect(() => {
    imageTriggerRef.current = () => fileInputRef.current?.click();
  }, []);

  const onCropComplete = useCallback((file: File) => {
    const quill = quillRef.current;
    if (!quill) {
      setCropOpen(false);
      setCropSrc(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      const sel = quill.getSelection(true);
      const index = sel ? sel.index : quill.root.innerHTML.length;
      quill.insertEmbed(index, 'image', dataUrl);
      isInternalChange.current = true;
      onChangeRef.current(quill.root.innerHTML === '<p><br></p>' ? '' : quill.root.innerHTML);
      setTimeout(() => {
        isInternalChange.current = false;
      }, 0);
    };
    reader.readAsDataURL(file);
    setCropOpen(false);
    setCropSrc(null);
  }, []);

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

      const toolbarConfig: any[] = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ];
      if (enableImageWithCrop) {
        toolbarConfig.push(['image']);
      }

      const quill = new Quill(editorRoot, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: toolbarConfig,
        },
      }) as unknown as QuillInstance;

      if (enableImageWithCrop) {
        const toolbar = quill.getModule('toolbar');
        if (toolbar?.container) {
          const imageBtn = toolbar.container.querySelector('.ql-image');
          if (imageBtn) {
            imageBtn.removeAttribute('type');
            (imageBtn as HTMLElement).onclick = (e) => {
              e.preventDefault();
              imageTriggerRef.current?.();
            };
          }
        }
      }

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
  }, [enableImageWithCrop, minHeight, placeholder]);

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

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCropSrc(url);
    setCropOpen(true);
  };

  const closeCrop = useCallback(() => {
    setCropOpen(false);
    setCropSrc((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
  }, []);

  return (
    <div className={`rich-text-editor-wrapper ${className}`} style={{ minHeight }}>
      {enableImageWithCrop && (
        <>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onFileChange}
            aria-hidden
          />
          <ImageCropModal
            open={cropOpen}
            imageSrc={cropSrc}
            onClose={closeCrop}
            onCropComplete={onCropComplete}
            aspect={16 / 9}
            fileName="editor-image.jpg"
          />
        </>
      )}
      <div ref={containerRef} />
    </div>
  );
}
