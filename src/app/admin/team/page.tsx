'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useAuth, useToast, useRefetchOnWindowFocus } from '@/hooks';
import { ConfirmModal, RichTextEditor, ImageCropModal } from '@/components/ui';
import { teamApi, TeamMember } from '@/api';
import { getErrorMessage } from '@/api/client';
import { getDisplayImageUrl } from '@/api/config';

const ROLE_OPTIONS = ['Developer', 'Designer', 'Manager', 'Lead', 'Engineer', 'Consultant', 'Analyst', 'Other'];

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
    roles: [] as string[],
    bio: '',
    photo: null as File | null,
  });
  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const [pendingCropFile, setPendingCropFile] = useState<File | null>(null);
  const [customRoleInput, setCustomRoleInput] = useState('');

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
      const roleStr = formData.roles.length ? formData.roles.join(', ') : undefined;
      if (editingMember) {
        const res = await teamApi.update(editingMember._id, { name: formData.name, role: roleStr, bio: formData.bio || undefined, photo: formData.photo || undefined }, token);
        toast.success(res.message || 'Team member updated successfully.');
      } else {
        const res = await teamApi.create({ name: formData.name, role: roleStr, bio: formData.bio || undefined, photo: formData.photo || undefined }, token);
        toast.success(res.message || 'Team member created successfully.');
      }
      setShowModal(false);
      setEditingMember(null);
      setFormData({ name: '', roles: [], bio: '', photo: null });
      fetchTeam();
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (member: TeamMember) => {
    const roleStr = member.role || member.position || '';
    const roles = roleStr ? roleStr.split(',').map((r) => r.trim()).filter(Boolean) : [];
    setEditingMember(member);
    setFormData({
      name: member.name,
      roles,
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
    setFormData({ name: '', roles: [], bio: '', photo: null });
    setShowModal(true);
  };

  const toggleRole = (role: string) => {
    setFormData((prev) => ({
      ...prev,
      roles: prev.roles.includes(role) ? prev.roles.filter((r) => r !== role) : [...prev.roles, role],
    }));
  };

  const addCustomRole = () => {
    const trimmed = customRoleInput.trim();
    if (!trimmed) return;
    if (formData.roles.includes(trimmed)) {
      setCustomRoleInput('');
      return;
    }
    setFormData((prev) => ({ ...prev, roles: [...prev.roles, trimmed] }));
    setCustomRoleInput('');
  };

  const removeRole = (role: string) => {
    setFormData((prev) => ({ ...prev, roles: prev.roles.filter((r) => r !== role) }));
  };

  const onPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCropImageSrc(url);
    setPendingCropFile(file);
    setCropModalOpen(true);
  };

  const onCropComplete = useCallback((file: File) => {
    setFormData((prev) => ({ ...prev, photo: file }));
    setCropImageSrc(null);
    setPendingCropFile(null);
    setCropModalOpen(false);
  }, []);

  const closeCropModal = () => {
    setCropModalOpen(false);
    setCropImageSrc((url) => {
      if (url) URL.revokeObjectURL(url);
      return null;
    });
    setPendingCropFile(null);
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
    <AdminPageLayout>
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Roles (select multiple or type custom)</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {ROLE_OPTIONS.map((role) => (
                      <button
                        key={role}
                        type="button"
                        onClick={() => toggleRole(role)}
                        className={`px-3 py-1.5 rounded-lg text-sm border transition-colors ${
                          formData.roles.includes(role)
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {role}
                      </button>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2 items-center">
                    <input
                      type="text"
                      value={customRoleInput}
                      onChange={(e) => setCustomRoleInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomRole())}
                      placeholder="Type custom role and press Enter or Add"
                      className="flex-1 min-w-[180px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white text-sm"
                    />
                    <button
                      type="button"
                      onClick={addCustomRole}
                      className="px-3 py-2 rounded-lg text-sm border border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100"
                    >
                      Add
                    </button>
                  </div>
                  {formData.roles.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {formData.roles.map((role) => (
                        <span
                          key={role}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm bg-blue-100 text-blue-800"
                        >
                          {role}
                          <button
                            type="button"
                            onClick={() => removeRole(role)}
                            className="p-0.5 rounded hover:bg-blue-200"
                            aria-label={`Remove ${role}`}
                          >
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                  <RichTextEditor
                    value={formData.bio}
                    onChange={(bio) => setFormData((prev) => ({ ...prev, bio }))}
                    placeholder="Write bio (rich text, images supported)..."
                    minHeight="200px"
                    enableImageWithCrop
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo (crop before upload)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onPhotoSelect}
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

      <ImageCropModal
        open={cropModalOpen}
        imageSrc={cropImageSrc}
        onClose={closeCropModal}
        onCropComplete={onCropComplete}
        aspect={1}
        fileName={pendingCropFile?.name?.replace(/\.[^.]+$/, '-cropped.jpg') || 'cropped.jpg'}
      />

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
    </AdminPageLayout>
  );
}

