'use client';

import React, { useState, useEffect } from 'react';
import {
  Users,
  Plus,
  KeyRound,
  Trash2,
  ShieldCheck,
  UserPlus,
  X,
  Save,
  Lock,
} from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatDate } from '@/lib/utils';

export default function AdminUsersPage() {
  const { user } = useAuth();
  const { success, error: toastError } = useToast();

  const [admins, setAdmins] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Admin Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    name: '',
    email: '',
    password: '',
    role: 'admin',
  });
  const [creatingAdmin, setCreatingAdmin] = useState(false);

  // Change Password Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [changingPassword, setChangingPassword] = useState(false);

  const loadAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admins');
      if (res.ok) {
        const data = await res.json();
        setAdmins(data.admins || []);
      }
    } catch (err: any) {
      toastError(err.message || 'Error loading admins');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdmin.name || !newAdmin.email || !newAdmin.password) {
      toastError('All fields are required');
      return;
    }

    setCreatingAdmin(true);
    try {
      const res = await fetch('/api/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAdmin),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create user');

      success('New admin user created successfully');
      setModalOpen(false);
      setNewAdmin({ name: '', email: '', password: '', role: 'admin' });
      loadAdmins();
    } catch (err: any) {
      toastError(err.message || 'Creation error');
    } finally {
      setCreatingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (id: number, name: string) => {
    if (!window.confirm(`Delete admin account "${name}"?`)) return;

    try {
      const res = await fetch(`/api/admins/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to delete');

      success('Admin account deleted');
      setAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err: any) {
      toastError(err.message || 'Delete error');
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toastError('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toastError('New password must be at least 6 characters');
      return;
    }

    setChangingPassword(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          current_password: currentPassword,
          new_password: newPassword,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to change password');

      success('Your password has been changed successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      toastError(err.message || 'Password change error');
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div>
      <AdminHeader
        title="Admin User Management & Security"
        subtitle="Manage Control Panel Access, Passwords & Credentials"
      />

      <div className="p-6 sm:p-8 space-y-8 max-w-5xl">
        {/* Admin Accounts Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-industrial overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-brand-darkNavy">
                Authorized Personnel
              </h3>
              <p className="text-xs text-slate-500">
                Staff with credentialed access to RockHold management console
              </p>
            </div>

            {user?.role === 'superadmin' && (
              <Button
                variant="secondary"
                size="md"
                className="font-bold text-xs"
                onClick={() => setModalOpen(true)}
              >
                <UserPlus className="w-4 h-4 mr-1.5" />
                Add Admin
              </Button>
            )}
          </div>

          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <th className="py-3.5 px-4">Admin Name</th>
                <th className="py-3.5 px-4">Email</th>
                <th className="py-3.5 px-4">Role</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-slate-400">
                    Loading users...
                  </td>
                </tr>
              ) : (
                admins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-slate-50/50">
                    <td className="py-3 px-4 font-bold text-brand-darkNavy">
                      {adm.name}
                    </td>
                    <td className="py-3 px-4 text-slate-600">{adm.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant={adm.role === 'superadmin' ? 'teal' : 'secondary'}>
                        {adm.role}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {formatDate(adm.created_at)}
                    </td>
                    <td className="py-3 px-4 text-right">
                      {adm.id !== 1 && adm.id !== user?.id && user?.role === 'superadmin' && (
                        <button
                          onClick={() => handleDeleteAdmin(adm.id, adm.name)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600"
                          title="Delete user"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Change Password Card */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-industrial max-w-xl">
          <div className="flex items-center gap-3 border-b border-slate-100 pb-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-navy/10 text-brand-navy flex items-center justify-center">
              <KeyRound className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-brand-darkNavy">
                Update Your Password
              </h3>
              <p className="text-xs text-slate-500">
                Logged in as <span className="font-semibold">{user?.email}</span>
              </p>
            </div>
          </div>

          <form onSubmit={handleChangePassword} className="space-y-4">
            <Input
              label="Current Password *"
              type="password"
              required
              placeholder="••••••••"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />

            <Input
              label="New Password *"
              type="password"
              required
              placeholder="Minimum 6 characters"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <Input
              label="Confirm New Password *"
              type="password"
              required
              placeholder="Re-type new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={changingPassword}
              >
                <Lock className="w-4 h-4 mr-1.5" />
                Change Password
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* New Admin Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden">
            <div className="bg-brand-navy p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-teal block">
                  Security
                </span>
                <h3 className="text-lg font-bold font-display">
                  Create New Administrator
                </h3>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAdmin} className="p-6 space-y-4">
              <Input
                label="Full Name *"
                required
                placeholder="Operations Manager"
                value={newAdmin.name}
                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
              />

              <Input
                label="Email Address *"
                type="email"
                required
                placeholder="manager@rockhold.com"
                value={newAdmin.email}
                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
              />

              <Input
                label="Initial Password *"
                type="password"
                required
                placeholder="Minimum 6 characters"
                value={newAdmin.password}
                onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
              />

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Role
                </label>
                <select
                  value={newAdmin.role}
                  onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value })}
                  className="flex h-11 w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-brand-teal focus:outline-none"
                >
                  <option value="admin">Administrator</option>
                  <option value="superadmin">Super Administrator</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-slate-100">
                <Button
                  type="button"
                  variant="ghost"
                  size="md"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="secondary"
                  size="md"
                  isLoading={creatingAdmin}
                >
                  <Save className="w-4 h-4 mr-1.5" />
                  Create Admin
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
