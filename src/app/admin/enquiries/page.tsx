'use client';

import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Download,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  MessageSquare,
  Building2,
  Phone,
  Mail,
  X,
  Save,
} from 'lucide-react';
import { AdminHeader } from '@/components/layout/AdminHeader';
import { Enquiry } from '@/types';
import { useToast } from '@/components/ui/toast';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';

export default function AdminEnquiriesPage() {
  const { success, error: toastError } = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notes, setNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);

  const loadEnquiries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (statusFilter !== 'all') params.set('status', statusFilter);
      if (search.trim()) params.set('search', search.trim());
      params.set('limit', '50');

      const res = await fetch(`/api/enquiries?${params.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setEnquiries(data.enquiries || []);
      }
    } catch (err: any) {
      toastError(err.message || 'Error loading enquiries');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEnquiries();
  }, [statusFilter, search]);

  const handleStatusChange = async (
    id: number,
    newStatus: 'pending' | 'contacted' | 'completed'
  ) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok) throw new Error('Failed to update status');

      success(`Status changed to ${newStatus}`);
      setEnquiries((prev) =>
        prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
      );
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (err: any) {
      toastError(err.message || 'Error updating status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    setSavingNotes(true);
    try {
      const res = await fetch(`/api/enquiries/${selectedEnquiry.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes }),
      });
      if (!res.ok) throw new Error('Failed to save notes');

      success('Notes saved successfully');
      setEnquiries((prev) =>
        prev.map((e) => (e.id === selectedEnquiry.id ? { ...e, notes } : e))
      );
      setSelectedEnquiry({ ...selectedEnquiry, notes });
    } catch (err: any) {
      toastError(err.message || 'Error saving notes');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: number, name: string) => {
    if (!window.confirm(`Permanently delete enquiry from ${name}?`)) return;

    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete enquiry');

      success('Enquiry deleted');
      setEnquiries((prev) => prev.filter((e) => e.id !== id));
      if (selectedEnquiry?.id === id) setSelectedEnquiry(null);
    } catch (err: any) {
      toastError(err.message || 'Error deleting enquiry');
    }
  };

  const openDetail = (enq: Enquiry) => {
    setSelectedEnquiry(enq);
    setNotes(enq.notes || '');
  };

  return (
    <div>
      <AdminHeader
        title="Customer Leads & Enquiries"
        subtitle="Manage Commercial Inquiries, Dealership Requests & Contacts"
      />

      <div className="p-6 sm:p-8 space-y-6 max-w-7xl">
        {/* Controls Bar */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200/80 shadow-industrial flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-brand-teal"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full sm:w-44 py-2 px-3 text-xs rounded-xl border border-slate-300 bg-white text-slate-700 focus:outline-none focus:border-brand-teal"
            >
              <option value="all">All Enquiries</option>
              <option value="pending">Pending Follow-Up</option>
              <option value="contacted">Contacted</option>
              <option value="completed">Completed / Closed</option>
            </select>
          </div>

          <a
            href="/api/enquiries/export"
            download
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-brand-navy hover:bg-brand-darkNavy text-white text-xs font-bold transition-colors shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>Export CSV</span>
          </a>
        </div>

        {/* Enquiries Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-industrial overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                  <th className="py-3.5 px-4">Contact</th>
                  <th className="py-3.5 px-4">Product / Subject</th>
                  <th className="py-3.5 px-4">Message Snippet</th>
                  <th className="py-3.5 px-4">Date</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      Loading enquiries from MySQL...
                    </td>
                  </tr>
                ) : enquiries.length > 0 ? (
                  enquiries.map((enq) => (
                    <tr
                      key={enq.id}
                      className="hover:bg-slate-50/60 transition-colors cursor-pointer"
                      onClick={() => openDetail(enq)}
                    >
                      <td className="py-3 px-4">
                        <div className="font-bold text-brand-darkNavy">
                          {enq.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {enq.phone} • {enq.email}
                        </div>
                        {enq.company && (
                          <div className="text-[10px] text-brand-teal font-semibold">
                            {enq.company}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-800">
                          {enq.product_name || enq.subject || 'General Enquiry'}
                        </div>
                      </td>

                      <td className="py-3 px-4 max-w-xs">
                        <p className="text-slate-500 line-clamp-2">
                          {enq.message}
                        </p>
                      </td>

                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                        {formatDate(enq.created_at)}
                      </td>

                      <td className="py-3 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={enq.status}
                          onChange={(e) =>
                            handleStatusChange(enq.id, e.target.value as any)
                          }
                          className={`text-xs font-semibold py-1 px-2.5 rounded-lg border focus:outline-none cursor-pointer ${
                            enq.status === 'completed'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : enq.status === 'contacted'
                              ? 'bg-cyan-50 text-brand-teal border-cyan-300'
                              : 'bg-amber-50 text-amber-800 border-amber-300'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="contacted">Contacted</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>

                      <td
                        className="py-3 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openDetail(enq)}
                            title="View Details"
                            className="p-1.5 rounded-lg text-slate-600 hover:text-brand-teal hover:bg-slate-100"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(enq.id, enq.name)}
                            title="Delete Enquiry"
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-slate-400">
                      No enquiries match your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Enquiry Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 max-w-lg w-full overflow-hidden">
            <div className="bg-brand-navy p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-teal block">
                  Enquiry Details
                </span>
                <h3 className="text-xl font-bold font-display">
                  {selectedEnquiry.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              {/* Contact Snapshot */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Phone:</span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="font-bold text-brand-navy hover:underline"
                  >
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Email:</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="font-bold text-brand-navy hover:underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                {selectedEnquiry.company && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Company:</span>
                    <span className="font-semibold text-slate-800">
                      {selectedEnquiry.company}
                    </span>
                  </div>
                )}
                {selectedEnquiry.product_name && (
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Product:</span>
                    <span className="font-bold text-brand-teal">
                      {selectedEnquiry.product_name}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Submitted:</span>
                  <span className="text-slate-700">
                    {formatDate(selectedEnquiry.created_at)}
                  </span>
                </div>
              </div>

              {/* Message Content */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Enquiry Message
                </label>
                <div className="p-3.5 rounded-xl bg-slate-100 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Internal Notes */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Internal Follow-Up Notes
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record quote amounts, follow-up dates, call summaries..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:border-brand-teal focus:outline-none"
                />
                <div className="flex justify-end pt-1">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={handleSaveNotes}
                    isLoading={savingNotes}
                  >
                    <Save className="w-3.5 h-3.5 mr-1" />
                    Save Notes
                  </Button>
                </div>
              </div>

              {/* Status Switcher & WhatsApp Shortcut */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-500">Status:</span>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) =>
                      handleStatusChange(selectedEnquiry.id, e.target.value as any)
                    }
                    className="text-xs font-bold py-1 px-2.5 rounded-lg border"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <a
                  href={`https://wa.me/91${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(
                    selectedEnquiry.name
                  )}%2C%20thank%20you%20for%20enquiring%20with%20RockHold.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
