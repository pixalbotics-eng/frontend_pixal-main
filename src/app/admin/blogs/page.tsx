'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useAuth, useToast, useRefetchOnWindowFocus } from '@/hooks';
import { ConfirmModal, RichTextEditor, ImageCropModal } from '@/components/ui';
import { blogsApi, Blog } from '@/api';
import { getErrorMessage } from '@/api/client';
import { getDisplayImageUrl, getPdfUrl } from '@/api/config';

export default function BlogsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    content: '',
    image: null as File | null,
    pdf: null as File | null,
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [pendingCropFileName, setPendingCropFileName] = useState<string>('cropped.jpg');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ total: number; page: number; limit: number; totalPages: number } | null>(null);
  const limit = 9;

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    try {
      const response = await blogsApi.getAll({ page, limit, sortBy: '-createdAt' });
      if (response.success && response.data?.blogs) {
        setBlogs(response.data.blogs);
      }
      setPagination(response.pagination ?? null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [toast, page]);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useRefetchOnWindowFocus(fetchBlogs);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitLoading(true);
    try {
      if (editingBlog) {
        await blogsApi.update(editingBlog._id, { name: formData.name, content: formData.content, image: formData.image ?? undefined, pdf: formData.pdf ?? undefined }, token);
        toast.success('Blog updated successfully.');
      } else {
        await blogsApi.create({ name: formData.name, content: formData.content, image: formData.image ?? undefined, pdf: formData.pdf ?? undefined }, token);
        toast.success('Blog created successfully.');
      }
      setShowModal(false);
      setEditingBlog(null);
      setFormData({ name: '', content: '', image: null, pdf: null });
      setImagePreviewUrl(null);
      setCropModalOpen(false);
      setCropImageSrc(null);
      fetchBlogs();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog);
    setFormData({
      name: blog.name,
      content: blog.content || '',
      image: null,
      pdf: null,
    });
    setImagePreviewUrl(null);
    setShowModal(true);
  };

  const handleDeleteClick = (blog: Blog) => {
    setDeleteTarget(blog);
  };

  const handleDeleteConfirm = async () => {
    if (!token || !deleteTarget) return;
    setDeletingId(deleteTarget._id);
    try {
      const res = await blogsApi.delete(deleteTarget._id, token);
      toast.success(res.message || 'Blog deleted successfully.');
      setDeleteTarget(null);
      fetchBlogs();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const openNewModal = () => {
    setEditingBlog(null);
    setFormData({ name: '', content: '', image: null, pdf: null });
    setImagePreviewUrl(null);
    setCropModalOpen(false);
    setCropImageSrc(null);
    setShowModal(true);
  };

  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPendingCropFileName(file.name.replace(/\.[^.]+$/, '-cropped.jpg') || 'cropped.jpg');
    setFormData((prev) => ({ ...prev, image: file }));
  };

  const openCoverCropModal = () => {
    const file = formData.image;
    if (!file) return;
    setCropImageSrc(URL.createObjectURL(file));
    setCropModalOpen(true);
  };

  const onImageCropComplete = useCallback((file: File) => {
    setFormData((prev) => ({ ...prev, image: file }));
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

  useEffect(() => {
    if (formData.image && formData.image instanceof File) {
      const url = URL.createObjectURL(formData.image);
      setImagePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setImagePreviewUrl(null);
    return () => {};
  }, [formData.image]);

  const existingImageUrl = editingBlog ? getDisplayImageUrl(editingBlog) : '';
  const displayImageUrl = imagePreviewUrl ?? (existingImageUrl || null);

  return (
    <AdminPageLayout>
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Blogs Management</h1>
            <p className="text-gray-600 mt-2">Manage blog posts</p>
          </div>
          <button
            onClick={openNewModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Blog
          </button>
      </div>

      {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((blog) => {
                return (
                <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {getDisplayImageUrl(blog) && (
                  <img src={getDisplayImageUrl(blog)} alt={blog.name} className="w-full h-40 object-cover bg-gray-100" />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{blog.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{blog.content ? blog.content.replace(/<[^>]*>/g, '').slice(0, 120) + (blog.content.length > 120 ? '...' : '') : '—'}</p>
                  {getPdfUrl(blog) && (
                  <a
                    href={getPdfUrl(blog)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm hover:underline"
                  >
                    View PDF
                  </a>
                )}
                  <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(blog)}
                    disabled={deletingId === blog._id}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1"
                  >
                    {deletingId === blog._id ? (
                      <>
                        <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Deleting...
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{editingBlog ? 'Edit Blog' : 'Add Blog'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <RichTextEditor
                    value={formData.content}
                    onChange={(content) => setFormData((prev) => ({ ...prev, content }))}
                    placeholder="Write blog content…"
                    minHeight="240px"
                    enableImageWithCrop
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover image</label>
                  <p className="text-xs text-gray-500 mb-1">Image shows in full after you choose a file. Use Crop only if you want to zoom or reframe before upload.</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                  {displayImageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 bg-gray-100 w-full">
                      <div className="flex items-center justify-center min-h-[10rem] max-h-64 p-2">
                        <img src={displayImageUrl} alt="Preview" className="max-h-60 w-full object-contain" />
                      </div>
                      <div className="flex flex-wrap items-center gap-2 px-2 py-2 border-t border-gray-200 bg-white">
                        <p className="text-xs text-gray-500 flex-1 min-w-0 truncate">{formData.image?.name ?? 'Current image'}</p>
                        {formData.image && (
                          <button
                            type="button"
                            onClick={openCoverCropModal}
                            className="shrink-0 text-sm px-3 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                          >
                            Crop
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFormData({ ...formData, pdf: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                  {(formData.pdf?.name || getPdfUrl(editingBlog ?? null)) && (
                    <p className="mt-2 text-sm text-gray-600">
                      {formData.pdf?.name ? (
                        <span>Selected: <strong>{formData.pdf.name}</strong></span>
                      ) : editingBlog ? (
                        <a href={getPdfUrl(editingBlog)} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Current PDF</a>
                      ) : null}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2 pt-4">
                  <button
                    type="submit"
                    disabled={submitLoading}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
                  >
                    {submitLoading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        {editingBlog ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingBlog ? 'Update' : 'Create'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingBlog(null);
                    }}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
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
        fileName={pendingCropFileName}
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete blog"
        message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.` : ''}
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

