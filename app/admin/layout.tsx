import { Metadata } from 'next';
import './admin.css';
import ProtectedLayout from './ProtectedLayout';

export const metadata: Metadata = {
  title: 'Admin Dashboard - Prestige Somerville',
  description: 'Admin dashboard for managing Prestige Somerville property inquiries',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-100 !text-gray-900">
      <ProtectedLayout>
        {children}
      </ProtectedLayout>
    </div>
  )
}
