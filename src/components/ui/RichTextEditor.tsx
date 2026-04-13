'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import 'quill/dist/quill.snow.css';
import ImageCropModal from './ImageCropModal';

type QuillType = import('quill').default;

type QuillInstance = {
  root: HTMLElement;
  on: (event: string, handler: () => void) => void;
  clipboard: { dangerouslyPasteHTML: (html: string, source?: string) => void };
  getModule: (name: string) => { container: HTMLElement };
  getSelection: (focus?: boolean) => { index: number } | null;
  insertEmbed: (index: number, type: string, value: string) => void;
};

type ImageResizorCtor = {
  Quill: QuillType | null;
  new (q: QuillType, opts?: object): unknown;
};

function registerImageResizor(Quill: QuillType, ImageResizor: ImageResizorCtor) {
  ImageResizor.Quill = Quill;
  try {
    Quill.register('modules/imageResizor', ImageResizor);
  } catch {
    /* already registered (e.g. strict mode re-run) */
  }
}

function applyDefaultInsertedImageSize(quill: QuillInstance, onHtml: (html: string) => void) {
  requestAnimationFrame(() => {
    const imgs = quill.root.querySelectorAll('img');
    const el = imgs[imgs.length - 1] as HTMLImageElement | undefined;
    if (!el) return;
    el.style.maxWidth = '100%';
    el.style.width = '460px';
    el.style.height = 'auto';
    const html = quill.root.innerHTML;
    onHtml(html === '<p><br></p>' ? '' : html);
  });
}

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
  /** When true, toolbar image inserts full-size; use "Crop & insert image" below for zoom/crop before insert. */
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
  const cropFileInputRef = useRef<HTMLInputElement>(null);
  const imageTriggerRef = useRef<() => void>(() => {});
  const isInternalChange = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const [cropOpen, setCropOpen] = useState(false);
  const [cropSrc, setCropSrc] = useState<string | null>(null);

  useEffect(() => {
    imageTriggerRef.current = () => fileInputRef.current?.click();
  }, []);

  const insertImageFromFile = useCallback((file: File) => {
    const quill = quillRef.current;
    if (!quill) return;
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
      if (enableImageWithCrop) {
        applyDefaultInsertedImageSize(quill, (html) => {
          isInternalChange.current = true;
          onChangeRef.current(html);
          setTimeout(() => {
            isInternalChange.current = false;
          }, 0);
        });
      }
    };
    reader.readAsDataURL(file);
  }, [enableImageWithCrop]);

  const onCropComplete = useCallback(
    (file: File) => {
      insertImageFromFile(file);
      setCropOpen(false);
      setCropSrc((url) => {
        if (url) URL.revokeObjectURL(url);
        return null;
      });
    },
    [insertImageFromFile]
  );

  useEffect(() => {
    if (!containerRef.current) return;
    let mounted = true;
    let cleanup: (() => void) | null = null;

    const loadPromise = enableImageWithCrop
      ? Promise.all([import('quill'), import('quill-image-resizor')]).then(([q, r]) => ({
          Quill: q.default,
          ImageResizor: r.default as ImageResizorCtor,
        }))
      : import('quill').then((q) => ({
          Quill: q.default,
          ImageResizor: null as ImageResizorCtor | null,
        }));

    loadPromise.then(({ Quill, ImageResizor }) => {
      if (!mounted || !containerRef.current) return;

      if (enableImageWithCrop && ImageResizor) {
        registerImageResizor(Quill, ImageResizor);
      }

      const wrapper = containerRef.current!;
      const editorRoot = document.createElement('div');
      editorRoot.style.minHeight = minHeight;
      wrapper.appendChild(editorRoot);

      const toolbarConfig: unknown[] = [
        [{ header: [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['link'],
        ['clean'],
      ];
      if (enableImageWithCrop) {
        toolbarConfig.push(['image']);
      }

      const modules: Record<string, unknown> = {
        toolbar: toolbarConfig,
      };
      if (enableImageWithCrop && ImageResizor) {
        modules.imageResizor = {
          modules: ['DisplaySize', 'Toolbar', 'Resize'],
        };
      }

      const quill = new Quill(editorRoot, {
        theme: 'snow',
        placeholder,
        modules,
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
    insertImageFromFile(file);
  };

  const onCropFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <input
            ref={cropFileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onCropFileChange}
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
      {enableImageWithCrop && (
        <p className="mt-2 text-xs text-gray-500">
          <button
            type="button"
            onClick={() => cropFileInputRef.current?.click()}
            className="font-medium text-blue-600 hover:underline"
          >
            Crop &amp; insert image
          </button>
          <span className="text-gray-500"> — zoom/crop, then insert. </span>
          <span className="text-gray-600">Click any image for corner handles to resize.</span>
        </p>
      )}
    </div>
  );
}
