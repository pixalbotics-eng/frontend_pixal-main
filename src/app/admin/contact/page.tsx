'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useAuth, useToast, useRefetchOnWindowFocus } from '@/hooks';
import { ConfirmModal } from '@/components/ui';
import { contactApi, type ContactMessage } from '@/api';
import { getErrorMessage } from '@/api/client';

export default function ContactPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<ContactMessage | null>(null);
  const [detailMessage, setDetailMessage] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<{ total: number; page: number; limit: number; totalPages: number } | null>(null);

  const limit = 10;

  const fetchContacts = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await contactApi.getAll(
        { page, limit, search: search || undefined, sortBy: '-createdAt' },
        token
      );
      const raw = response.data;
      const list = raw?.contacts ?? (raw as { messages?: ContactMessage[] })?.messages ?? (Array.isArray(raw) ? raw : []);
      setContacts(Array.isArray(list) ? list : []);
      if (response.pagination) {
        setPagination(response.pagination);
      } else {
        setPagination(null);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
      setContacts([]);
    } finally {
      setLoading(false);
    }
  }, [token, page, limit, search, toast]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  useRefetchOnWindowFocus(fetchContacts);

  const handleDeleteClick = (msg: ContactMessage) => {
    setDeleteTarget(msg);
  };

  const handleDeleteConfirm = async () => {
    if (!token || !deleteTarget) return;
    setDeletingId(deleteTarget._id);
    try {
      await contactApi.delete(deleteTarget._id, token);
      toast.success('Contact message deleted.');
      setDeleteTarget(null);
      if (detailMessage?._id === deleteTarget._id) setDetailMessage(null);
      fetchContacts();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleString();
    } catch {
      return dateStr;
    }
  };

  return (
    <AdminPageLayout>
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <p className="text-gray-600 mt-2">View and manage contact form submissions</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="search"
              placeholder="Search name, email, subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && setPage(1)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white min-w-[200px]"
            />
            <button
              type="button"
              onClick={() => setPage(1)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
          </div>
        ) : contacts.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-12 text-center text-gray-500">
            No contact messages found.
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {contacts.map((msg) => (
                    <tr key={msg._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{msg.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <a href={`mailto:${msg.email}`} className="text-blue-600 hover:underline">{msg.email}</a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px] truncate">{msg.subject ?? '—'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(msg.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          msg.status === 'replied' || msg.replied ? 'bg-green-100 text-green-800' :
                          msg.status === 'archived' ? 'bg-gray-100 text-gray-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {msg.replied ? 'Replied' : msg.status ?? 'New'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button
                          type="button"
                          onClick={() => setDetailMessage(msg)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteClick(msg)}
                          disabled={deletingId === msg._id}
                          className="text-red-600 hover:text-red-900 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {deletingId === msg._id ? 'Deleting...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pagination && pagination.totalPages > 1 && (
              <div className="px-6 py-3 border-t border-gray-200 flex items-center justify-between text-sm text-gray-600">
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
          </div>
        )}

        {/* Detail modal */}
        {detailMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col">
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Contact Message</h2>
                <button
                  type="button"
                  onClick={() => setDetailMessage(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
              <div className="p-6 overflow-y-auto space-y-4">
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Name</span>
                  <p className="text-gray-900 font-medium">{detailMessage.name}</p>
                </div>
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Email</span>
                  <p>
                    <a href={`mailto:${detailMessage.email}`} className="text-blue-600 hover:underline">{detailMessage.email}</a>
                  </p>
                </div>
                {detailMessage.phone && (
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">Phone</span>
                    <p>
                      <a href={`tel:${detailMessage.phone}`} className="text-blue-600 hover:underline">{detailMessage.phone}</a>
                    </p>
                  </div>
                )}
                {detailMessage.subject && (
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase">Subject</span>
                    <p className="text-gray-900">{detailMessage.subject}</p>
                  </div>
                )}
                <div>
                  <span className="text-xs font-medium text-gray-500 uppercase">Message</span>
                  <p className="text-gray-700 whitespace-pre-wrap mt-1">{detailMessage.message}</p>
                </div>
                <div className="pt-2 text-sm text-gray-500">
                  {formatDate(detailMessage.createdAt)}
                  {detailMessage.status && ` · ${detailMessage.status}`}
                  {detailMessage.replied && ' · Replied'}
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex gap-2">
                <a
                  href={`mailto:${detailMessage.email}?subject=Re: ${encodeURIComponent(detailMessage.subject ?? 'Your message')}`}
                  className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Reply via email
                </a>
                <button
                  type="button"
                  onClick={() => setDetailMessage(null)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <ConfirmModal
          open={!!deleteTarget}
          title="Delete message"
          message={deleteTarget ? `Are you sure you want to delete this contact message from "${deleteTarget.name}"?` : ''}
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
