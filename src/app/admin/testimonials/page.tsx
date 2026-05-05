'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useAuth, useToast, useRefetchOnWindowFocus } from '@/hooks';
import { ConfirmModal } from '@/components/ui';
import { testimonialsApi, Testimonial } from '@/api';
import { getErrorMessage } from '@/api/client';

export default function TestimonialsPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [formData, setFormData] = useState({
    clientName: '',
    reviewText: '',
    stars: 5,
  });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ total: number; page: number; limit: number; totalPages: number } | null>(null);
  const limit = 9;

  const fetchTestimonials = useCallback(async () => {
    setLoading(true);
    try {
      const response = await testimonialsApi.getAll({ page, limit, sortBy: '-createdAt' });
      if (response.success && response.data?.testimonials) {
        setTestimonials(response.data.testimonials);
      }
      setPagination(response.pagination ?? null);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [toast, page]);

  useEffect(() => {
    fetchTestimonials();
  }, [fetchTestimonials]);

  useRefetchOnWindowFocus(fetchTestimonials);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitLoading(true);
    try {
      if (editingTestimonial) {
        await testimonialsApi.update(editingTestimonial._id, formData, token);
        toast.success('Testimonial updated successfully.');
      } else {
        await testimonialsApi.create(formData, token);
        toast.success('Testimonial created successfully.');
      }
      setShowModal(false);
      setEditingTestimonial(null);
      setFormData({ clientName: '', reviewText: '', stars: 5 });
      fetchTestimonials();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      clientName: testimonial.clientName ?? testimonial.name ?? '',
      reviewText: testimonial.reviewText ?? testimonial.content ?? '',
      stars: testimonial.stars ?? testimonial.rating ?? 5,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (testimonial: Testimonial) => {
    setDeleteTarget(testimonial);
  };

  const handleDeleteConfirm = async () => {
    if (!token || !deleteTarget) return;
    setDeletingId(deleteTarget._id);
    try {
      await testimonialsApi.delete(deleteTarget._id, token);
      toast.success('Testimonial deleted successfully.');
      setDeleteTarget(null);
      fetchTestimonials();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const openNewModal = () => {
    setEditingTestimonial(null);
    setFormData({ clientName: '', reviewText: '', stars: 5 });
    setShowModal(true);
  };

  const displayName = (t: Testimonial) => t.clientName || t.name || 'Testimonial';

  return (
    <AdminPageLayout>
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Testimonials Management</h1>
            <p className="text-gray-600 mt-2">Manage client testimonials (clientName, reviewText, stars)</p>
          </div>
          <button
            onClick={openNewModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Testimonial
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : (
          <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-white rounded-lg shadow-md p-6">
                <div className="flex-1 mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{displayName(testimonial)}</h3>
                  <div className="mt-1 text-yellow-500">
                    {'⭐'.repeat(testimonial.stars ?? testimonial.rating ?? 5)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-4">
                  {testimonial.reviewText ?? testimonial.content ?? '—'}
                </p>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(testimonial)}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(testimonial)}
                    disabled={deletingId === testimonial._id}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1"
                  >
                    {deletingId === testimonial._id ? (
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
            ))}
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
              <h2 className="text-xl font-bold mb-4 text-gray-900">{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Client name</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Jane Smith"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Review text</label>
                  <textarea
                    rows={6}
                    required
                    value={formData.reviewText}
                    onChange={(e) => setFormData({ ...formData, reviewText: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="Excellent service and support!"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stars (1–5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={formData.stars}
                    onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value, 10) || 5 })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
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
                        {editingTestimonial ? 'Updating...' : 'Creating...'}
                      </>
                    ) : editingTestimonial ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingTestimonial(null);
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

        <ConfirmModal
          open={!!deleteTarget}
          title="Delete testimonial"
          message={deleteTarget ? `Are you sure you want to delete "${displayName(deleteTarget)}"? This action cannot be undone.` : ''}
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
