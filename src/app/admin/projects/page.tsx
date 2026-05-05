'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useAuth, useToast, useRefetchOnWindowFocus } from '@/hooks';
import { ConfirmModal, RichTextEditor, ImageCropModal } from '@/components/ui';
import { projectsApi, Project, getProjectDisplayImage } from '@/api';
import { getErrorMessage } from '@/api/client';
import { getAssetUrl, getDisplayImageUrl } from '@/api/config';

const MAX_GALLERY = 10;

function newId() {
  return typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `g-${Date.now()}-${Math.random()}`;
}

type GalleryEntry = {
  id: string;
  file?: File;
  /** Raw path from API (for retainedGallery on update) */
  existingPath?: string;
  previewUrl: string;
};

export default function ProjectsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Project | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverRemoved, setCoverRemoved] = useState(false);
  const [galleryItems, setGalleryItems] = useState<GalleryEntry[]>([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ total: number; page: number; limit: number; totalPages: number } | null>(null);
  const limit = 9;

  const revokeGalleryBlob = useCallback((items: GalleryEntry[]) => {
    items.forEach((e) => {
      if (e.file && e.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(e.previewUrl);
      }
    });
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    revokeGalleryBlob(galleryItems);
    setGalleryItems([]);
    setFormData({ name: '', description: '' });
    setCoverFile(null);
    setCoverRemoved(false);
    setEditingProject(null);
  }, [galleryItems, revokeGalleryBlob]);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await projectsApi.getAll({ page, limit, sortBy: '-createdAt' });
      if (response.success && response.data?.projects) {
        setProjects(response.data.projects);
      }
      setPagination(response.pagination ?? null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [toast, page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useRefetchOnWindowFocus(fetchProjects);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitLoading(true);
    try {
      const newGalleryFiles = galleryItems.filter((g) => g.file).map((g) => g.file!);
      const retainedPaths = galleryItems.filter((g) => g.existingPath).map((g) => g.existingPath!);

      if (editingProject) {
        const res = await projectsApi.update(
          editingProject._id,
          {
            name: formData.name.trim(),
            description: formData.description,
            coverImage: coverFile ?? undefined,
            removeCover: coverRemoved && !coverFile,
            images: newGalleryFiles.length ? newGalleryFiles : undefined,
            retainedGallery: retainedPaths,
          },
          token
        );
        toast.success(res.message || 'Project updated successfully.');
      } else {
        const res = await projectsApi.create(
          {
            name: formData.name.trim(),
            description: formData.description || undefined,
            coverImage: coverFile ?? undefined,
            images: newGalleryFiles.length ? newGalleryFiles : undefined,
          },
          token
        );
        toast.success(res.message || 'Project created successfully.');
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      name: project.name,
      description: project.description || '',
    });
    setCoverFile(null);
    setCoverRemoved(false);
    revokeGalleryBlob(galleryItems);
    const imgs = project.images ?? [];
    setGalleryItems(
      imgs.map((path, i) => ({
        id: `ex-${i}-${path}`,
        existingPath: path,
        previewUrl: getAssetUrl(path),
      }))
    );
    setShowModal(true);
  };

  const handleDeleteClick = (project: Project) => {
    setDeleteTarget(project);
  };

  const handleDeleteConfirm = async () => {
    if (!token || !deleteTarget) return;
    setDeletingId(deleteTarget._id);
    try {
      const res = await projectsApi.delete(deleteTarget._id, token);
      toast.success(res.message || 'Project deleted successfully.');
      setDeleteTarget(null);
      fetchProjects();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const openNewModal = useCallback(() => {
    revokeGalleryBlob(galleryItems);
    setGalleryItems([]);
    setFormData({ name: '', description: '' });
    setCoverFile(null);
    setCoverRemoved(false);
    setEditingProject(null);
    setShowModal(true);
  }, [galleryItems, revokeGalleryBlob]);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);

  const onCoverSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverRemoved(false);
  };

  const openCoverCropModal = () => {
    if (!coverFile) return;
    setCropImageSrc(URL.createObjectURL(coverFile));
    setCropModalOpen(true);
  };

  const onImageCropComplete = useCallback((file: File) => {
    setCoverFile(file);
    setCropImageSrc((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
    setCropModalOpen(false);
  }, []);

  const closeCropModal = () => {
    setCropModalOpen(false);
    setCropImageSrc((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
  };

  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (coverFile) {
      const url = URL.createObjectURL(coverFile);
      setCoverPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setCoverPreviewUrl(null);
    return () => {};
  }, [coverFile]);

  const existingCoverUrl = editingProject && !coverRemoved ? getDisplayImageUrl(editingProject) : '';
  const displayCoverUrl = coverPreviewUrl || existingCoverUrl || null;

  const addGalleryFiles = (files: FileList | null) => {
    if (!files?.length) return;
    const slots = MAX_GALLERY - galleryItems.length;
    if (slots <= 0) {
      toast.error(`Maximum ${MAX_GALLERY} gallery images. Remove some to add more.`);
      return;
    }
    const images = Array.from(files).filter((f) => f.type.startsWith('image/'));
    if (images.length === 0) {
      toast.error('Choose image files only.');
      return;
    }
    const toAdd = images.slice(0, slots);
    const next: GalleryEntry[] = toAdd.map((file) => ({
      id: newId(),
      file,
      previewUrl: URL.createObjectURL(file),
    }));
    setGalleryItems((prev) => [...prev, ...next].slice(0, MAX_GALLERY));
    if (images.length > toAdd.length) {
      toast.error(`Only ${toAdd.length} image(s) added (max ${MAX_GALLERY} total).`);
    }
  };

  const removeGalleryEntry = (id: string) => {
    setGalleryItems((prev) => {
      const entry = prev.find((x) => x.id === id);
      if (entry?.file && entry.previewUrl.startsWith('blob:')) {
        URL.revokeObjectURL(entry.previewUrl);
      }
      return prev.filter((x) => x.id !== id);
    });
  };

  return (
    <AdminPageLayout>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Portfolio projects</h1>
          <p className="mt-2 text-gray-600">Create and manage projects — cover image plus up to {MAX_GALLERY} gallery images</p>
        </div>
        <button
          type="button"
          onClick={openNewModal}
          className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
        >
          + Add project
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600" />
        </div>
      ) : (
        <>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => {
            const imgUrl = getProjectDisplayImage(project);
            const galleryCount = project.images?.length ?? 0;
            return (
              <div key={project._id} className="overflow-hidden rounded-lg bg-white shadow-md">
                {imgUrl ? (
                  <img src={imgUrl} alt={project.name} className="h-48 w-full bg-gray-100 object-cover" />
                ) : (
                  <div className="flex h-48 items-center justify-center bg-gray-100 text-sm text-gray-400">No cover</div>
                )}
                <div className="p-6">
                  <h3 className="mb-2 text-lg font-bold text-gray-900">{project.name}</h3>
                  {galleryCount > 0 && (
                    <p className="mb-2 text-xs font-medium text-blue-600">{galleryCount} gallery image{galleryCount !== 1 ? 's' : ''}</p>
                  )}
                  <p className="mb-4 line-clamp-3 text-sm text-gray-600">
                    {project.description
                      ? (() => {
                          const p = project.description.replace(/<[^>]*>/g, '').trim();
                          return p ? `${p.slice(0, 150)}${p.length > 150 ? '…' : ''}` : '—';
                        })()
                      : '—'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(project)}
                      className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClick(project)}
                      disabled={deletingId === project._id}
                      className="inline-flex flex-1 items-center justify-center gap-1 rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {deletingId === project._id ? (
                        <>
                          <span className="h-3 w-3 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Deleting…
                        </>
                      ) : (
                        'Delete'
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {pagination && pagination.totalPages > 1 && (
          <div className="mt-6 px-4 py-3 border border-gray-200 rounded-lg flex items-center justify-between text-sm text-gray-600 bg-white">
            <span>
              Page {pagination.page} of {pagination.totalPages} ({pagination.total} total)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page <= 1}
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= pagination.totalPages}
                className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-xl bg-white p-6 shadow-xl">
            <h2 className="mb-4 text-xl font-bold">{editingProject ? 'Edit project' : 'New project'}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Description</label>
                <RichTextEditor
                  value={formData.description}
                  onChange={(description) => setFormData((prev) => ({ ...prev, description }))}
                  placeholder="Project description…"
                  minHeight="200px"
                  enableImageWithCrop
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Cover image (thumbnail)</label>
                <p className="mb-2 text-xs text-gray-500">Sent as <code className="rounded bg-gray-100 px-1">coverImage</code>. Optional.</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={onCoverSelect}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 file:mr-3"
                />
                {displayCoverUrl && (
                  <div className="mt-2 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
                    <div className="flex max-h-64 min-h-[10rem] items-center justify-center p-2">
                      <img src={displayCoverUrl} alt="" className="max-h-60 w-full object-contain" />
                    </div>
                    <div className="flex flex-wrap items-center gap-2 border-t border-gray-200 bg-white px-2 py-2">
                      <p className="min-w-0 flex-1 truncate text-xs text-gray-500">
                        {coverFile?.name ?? (existingCoverUrl ? 'Current cover' : '')}
                      </p>
                      {coverFile && (
                        <button
                          type="button"
                          onClick={openCoverCropModal}
                          className="shrink-0 rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          Crop
                        </button>
                      )}
                      {(coverFile || (editingProject && existingCoverUrl && !coverRemoved)) && (
                        <button
                          type="button"
                          onClick={() => {
                            setCoverFile(null);
                            if (editingProject) setCoverRemoved(true);
                          }}
                          className="shrink-0 rounded-lg border border-red-200 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50"
                        >
                          Remove cover
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">Gallery images</label>
                <p className="mb-2 text-xs text-gray-500">
                  Up to {MAX_GALLERY} files, sent as repeated <code className="rounded bg-gray-100 px-1">images</code> fields. Remove any row before save to drop it.
                  {editingProject ? ' On save we send which existing paths to keep (retainedGallery) plus any new files.' : ''}
                </p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  disabled={galleryItems.length >= MAX_GALLERY}
                  onChange={(e) => {
                    addGalleryFiles(e.target.files);
                    e.target.value = '';
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 file:mr-3 disabled:opacity-50"
                />
                {galleryItems.length > 0 && (
                  <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                    {galleryItems.map((g) => (
                      <li key={g.id} className="group relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                        <img src={g.previewUrl} alt="" className="aspect-square w-full object-cover" />
                        <button
                          type="button"
                          onClick={() => removeGalleryEntry(g.id)}
                          className="absolute right-1 top-1 rounded-full bg-red-600 px-2 py-0.5 text-xs font-medium text-white shadow hover:bg-red-700"
                        >
                          Remove
                        </button>
                        {g.file && <p className="truncate px-1 py-1 text-[10px] text-gray-500">{g.file.name}</p>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitLoading ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      {editingProject ? 'Updating…' : 'Creating…'}
                    </>
                  ) : editingProject ? (
                    'Save changes'
                  ) : (
                    'Create project'
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-lg bg-gray-200 px-4 py-2 text-gray-800 hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ImageCropModal
        open={cropModalOpen}
        imageSrc={cropImageSrc}
        onClose={closeCropModal}
        onCropComplete={onImageCropComplete}
        aspect={16 / 9}
        fileName="project-cover.jpg"
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete project"
        message={deleteTarget ? `Delete “${deleteTarget.name}”? This cannot be undone.` : ''}
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        loading={deletingId === deleteTarget?._id}
        onConfirm={handleDeleteConfirm}
        onCancel={() => !deletingId && setDeleteTarget(null)}
      />
    </AdminPageLayout>
  );
}
