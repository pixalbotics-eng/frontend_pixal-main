'use client';

import { useEffect, useState } from 'react';
import AdminPageLayout from '@/components/admin/AdminPageLayout';
import { useAuth, useToast } from '@/hooks';
import { blogsApi, projectsApi, teamApi, testimonialsApi, usersApi } from '@/api';
import { getErrorMessage } from '@/api/client';

export default function AdminDashboard() {
  const { token } = useAuth();
  const toast = useToast();
  const [stats, setStats] = useState({
    users: 0,
    blogs: 0,
    projects: 0,
    team: 0,
    testimonials: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const [usersRes, blogsRes, projectsRes, teamRes, testimonialsRes] = await Promise.all([
          usersApi.getAll(token).catch(() => ({ data: { users: [] } })),
          blogsApi.getAll().catch(() => ({ data: { blogs: [] } })),
          projectsApi.getAll().catch(() => ({ data: { projects: [] } })),
          teamApi.getAll().catch(() => ({ data: { team: [] } })),
          testimonialsApi.getAll().catch(() => ({ data: { testimonials: [] } })),
        ]);

        setStats({
          users: usersRes.data?.users?.length || 0,
          blogs: blogsRes.data?.blogs?.length || 0,
          projects: projectsRes.data?.projects?.length || 0,
          team: teamRes.data?.team?.length || 0,
          testimonials: testimonialsRes.data?.testimonials?.length || 0,
        });
      } catch (error) {
        toast.error(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token, toast]);

  const statCards = [
    { label: 'Users', value: stats.users, icon: '👥', borderClass: 'border-l-blue-500' },
    { label: 'Blogs', value: stats.blogs, icon: '📝', borderClass: 'border-l-green-500' },
    { label: 'Projects', value: stats.projects, icon: '💼', borderClass: 'border-l-purple-500' },
    { label: 'Team Members', value: stats.team, icon: '👤', borderClass: 'border-l-yellow-500' },
    { label: 'Testimonials', value: stats.testimonials, icon: '⭐', borderClass: 'border-l-pink-500' },
  ];

  return (
    <AdminPageLayout>
      <div className="mb-6 lg:mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your content management system</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat) => (
              <div
                key={stat.label}
                className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${stat.borderClass}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className="text-4xl">{stat.icon}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <a
              href="/admin/users"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">Manage Users</h3>
              <p className="text-sm text-gray-600 mt-1">Add, edit, or remove users</p>
            </a>
            <a
              href="/admin/blogs"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">Manage Blogs</h3>
              <p className="text-sm text-gray-600 mt-1">Create or edit blog posts</p>
            </a>
            <a
              href="/admin/projects"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-semibold text-gray-900">Manage Projects</h3>
              <p className="text-sm text-gray-600 mt-1">Add or update projects</p>
            </a>
          </div>
        </div>
    </AdminPageLayout>
  );
}

