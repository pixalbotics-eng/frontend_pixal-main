'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks';

const menuItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
  { href: '/admin/users', label: 'Users', icon: '👥' },
  { href: '/admin/contact', label: 'Contact', icon: '✉️' },
  { href: '/admin/blogs', label: 'Blogs', icon: '📝' },
  { href: '/admin/projects', label: 'Projects', icon: '💼' },
  { href: '/admin/team', label: 'Team', icon: '👤' },
  { href: '/admin/testimonials', label: 'Testimonials', icon: '⭐' },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const sidebar = (
    <div className="w-64 bg-gray-900 text-white min-h-screen flex flex-col shrink-0">
      <div className="p-4 lg:p-6 border-b border-gray-800 flex items-center justify-between">
        <div>
          <h1 className="text-lg lg:text-xl font-bold">Admin Panel</h1>
          <p className="text-xs lg:text-sm text-gray-400 mt-1 truncate">Welcome, {user?.name}</p>
        </div>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
      <nav className="flex-1 p-3 lg:p-4 overflow-y-auto">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <span className="text-lg lg:text-xl">{item.icon}</span>
                  <span className="text-sm lg:text-base">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-3 lg:p-4 border-t border-gray-800">
        <button
          type="button"
          onClick={() => {
            logout();
            onClose?.();
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 lg:px-4 lg:py-3 rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors text-left"
        >
          <span>🚪</span>
          <span className="text-sm lg:text-base">Logout</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop: always visible */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-20">
        {sidebar}
      </aside>
      {/* Mobile: drawer */}
      <aside
        className={`fixed left-0 top-0 bottom-0 z-50 transform transition-transform duration-200 ease-out lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebar}
      </aside>
      {/* Desktop spacer so main content is not under sidebar */}
      <div className="hidden lg:block w-64 shrink-0" />
    </>
  );
}
