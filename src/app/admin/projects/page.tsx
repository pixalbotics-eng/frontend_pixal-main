'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useAuth, useToast, useRefetchOnWindowFocus } from '@/hooks';
import { ConfirmModal, RichTextEditor, ImageCropModal } from '@/components/ui';
import { projectsApi, Project } from '@/api';
import { getErrorMessage } from '@/api/client';
import { getDisplayImageUrl } from '@/api/config';

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
    image: null as File | null,
  });

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    try {
      const response = await projectsApi.getAll();
      if (response.success && response.data?.projects) {
        setProjects(response.data.projects);
      }
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useRefetchOnWindowFocus(fetchProjects);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitLoading(true);
    try {
      if (editingProject) {
        const res = await projectsApi.update(editingProject._id, {
          name: formData.name,
          description: formData.description,
          image: formData.image ?? undefined,
        }, token);
        toast.success(res.message || 'Project updated successfully.');
      } else {
        const res = await projectsApi.create({
          name: formData.name,
          description: formData.description,
          image: formData.image ?? undefined,
        }, token);
        toast.success(res.message || 'Project created successfully.');
      }
      setShowModal(false);
      setEditingProject(null);
      setFormData({ name: '', description: '', image: null });
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
      image: null,
    });
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

  const openNewModal = () => {
    setEditingProject(null);
    setFormData({ name: '', description: '', image: null });
    setShowModal(true);
  };

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [cropImageSrc, setCropImageSrc] = useState<string | null>(null);
  const onImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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

  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  useEffect(() => {
    if (formData.image && formData.image instanceof File) {
      const url = URL.createObjectURL(formData.image);
      setFilePreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setFilePreviewUrl(null);
    return () => {};
  }, [formData.image]);
  const existingImageUrl = editingProject ? getDisplayImageUrl(editingProject) : '';
  const displayImageUrl = filePreviewUrl ?? (existingImageUrl || null);

  return (
    <AdminPageLayout>
      <div className="mb-6 lg:mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Projects Management</h1>
          <p className="text-gray-600 mt-2">Manage projects</p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shrink-0"
        >
          + Add Project
        </button>
      </div>

      {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {(() => {
                  const imgUrl = getDisplayImageUrl(project);
                  return imgUrl ? (
                    <img src={imgUrl} alt={project.name} className="w-full h-48 object-cover bg-gray-100" />
                  ) : null;
                })()}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                  {project.description
                    ? (() => {
                        const p = project.description!.replace(/<[^>]*>/g, '').trim();
                        return p ? p.slice(0, 150) + (p.length > 150 ? '...' : '') : '—';
                      })()
                    : '—'}
                </p>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(project)}
                      disabled={deletingId === project._id}
                      className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 text-sm disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-1"
                    >
                      {deletingId === project._id ? (
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
              <h2 className="text-xl font-bold mb-4">{editingProject ? 'Edit Project' : 'Add Project'}</h2>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <RichTextEditor
                    value={formData.description}
                    onChange={(description) => setFormData((prev) => ({ ...prev, description }))}
                    placeholder="Project description (rich text, add images with crop)..."
                    minHeight="200px"
                    enableImageWithCrop
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cover image (crop before upload)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onImageSelect}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 bg-white"
                  />
                  {displayImageUrl && (
                    <div className="mt-2 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 w-full max-h-48">
                      <img src={displayImageUrl} alt="Preview" className="w-full h-40 object-cover" />
                      <p className="text-xs text-gray-500 px-2 py-1">{formData.image?.name ?? 'Current image'}</p>
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
                        {editingProject ? 'Updating...' : 'Creating...'}
                      </>
                    ) : (
                      editingProject ? 'Update' : 'Create'
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingProject(null);
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
        fileName="project-cover.jpg"
      />

      <ConfirmModal
        open={!!deleteTarget}
        title="Delete project"
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

