'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { useAuth, useToast, useRefetchOnWindowFocus } from '@/hooks';
import { ConfirmModal } from '@/components/ui';
import { teamApi, TeamMember } from '@/api';
import { getErrorMessage } from '@/api/client';
import { getDisplayImageUrl } from '@/api/config';

export default function TeamPage() {
  const { token } = useAuth();
  const toast = useToast();
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<TeamMember | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    photo: null as File | null,
  });

  const fetchTeam = useCallback(async () => {
    setLoading(true);
    try {
      const response = await teamApi.getAll();
      if (response.success && response.data?.team) {
        setTeam(response.data.team);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchTeam();
  }, [fetchTeam]);

  useRefetchOnWindowFocus(fetchTeam);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitLoading(true);
    try {
      if (editingMember) {
        const res = await teamApi.update(editingMember._id, { name: formData.name, role: formData.role || undefined, bio: formData.bio || undefined, photo: formData.photo || undefined }, token);
        toast.success(res.message || 'Team member updated successfully.');
      } else {
        const res = await teamApi.create({ name: formData.name, role: formData.role || undefined, bio: formData.bio || undefined, photo: formData.photo || undefined }, token);
        toast.success(res.message || 'Team member created successfully.');
      }
      setShowModal(false);
      setEditingMember(null);
      setFormData({ name: '', role: '', bio: '', photo: null });
      fetchTeam();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      role: member.role || member.position || '',
      bio: member.bio || '',
      photo: null,
    });
    setShowModal(true);
  };

  const handleDeleteClick = (member: TeamMember) => {
    setDeleteTarget(member);
  };

  const handleDeleteConfirm = async () => {
    if (!token || !deleteTarget) return;
    setDeletingId(deleteTarget._id);
    try {
      const res = await teamApi.delete(deleteTarget._id, token);
      toast.success(res.message || 'Team member deleted successfully.');
      setDeleteTarget(null);
      fetchTeam();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setDeletingId(null);
    }
  };

  const openNewModal = () => {
    setEditingMember(null);
    setFormData({ name: '', role: '', bio: '', photo: null });
    setShowModal(true);
  };

  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (formData.photo && formData.photo instanceof File) {
      const url = URL.createObjectURL(formData.photo);
      setFilePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setFilePreviewUrl(null);
    return () => {};
  }, [formData.photo]);
  const existingPhotoUrl = editingMember ? getDisplayImageUrl(editingMember) : '';
  const displayPhotoUrl = filePreviewUrl ?? (existingPhotoUrl || null);

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <div className="flex-1 p-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Team Management</h1>
            <p className="text-gray-600 mt-2">Manage team members</p>
          </div>
          <button
            onClick={openNewModal}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            + Add Member
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div key={member._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {getDisplayImageUrl(member) && (
                  <img
                    src={getDisplayImageUrl(member)}
                    alt={member.name}
                    className="w-full h-48 object-cover bg-gray-100"
                  />
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{member.name}</h3>
                  {(member.role || member.position) && (
                    <p className="text-sm text-gray-500 mb-2">{member.role || member.position}</p>
                  )}
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{member.bio ?? '—'}</p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(member)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(member)}
                      disabled={deletingId === member._id}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1"
                    >
                      {deletingId === member._id ? (
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
            ))}
          </div>
        )}

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{editingMember ? 'Edit Team Member' : 'Add Team Member'}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                    placeholder="e.g. Developer, Designer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <textarea
                    rows={6}
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFormData({ ...formData, photo: e.target.files?.[0] || null })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                  {displayPhotoUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 w-full max-h-48">
                      <img src={displayPhotoUrl} alt="Preview" className="w-full h-40 object-cover" />
                      <p className="text-xs text-gray-500 px-2 py-1">{formData.photo?.name ?? 'Current photo'}</p>
                    </div>
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
                        {editingMember ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingMember ? 'Update' : 'Create'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingMember(null);
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
          title="Delete team member"
          message={deleteTarget ? `Are you sure you want to delete "${deleteTarget.name}"? This action cannot be undone.` : ''}
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="danger"
          loading={deletingId === deleteTarget?._id}
          onConfirm={handleDeleteConfirm}
          onCancel={() => !deletingId && setDeleteTarget(null)}
        />
      </div>
    </div>
  );
}

