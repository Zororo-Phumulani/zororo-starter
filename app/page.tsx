"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Calendar, CheckCircle2, Clock, Mail } from "lucide-react";

export default function Dashboard() {
  const [announcements, setAnnouncements] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/announcements")
      .then(res => res.json())
      .then(data => setAnnouncements(data.announcements || []))
      .catch(console.error);
  }, []);

  const getStatusIcon = (status: string) => {
    switch(status) {
      case "PUBLISHED": return <CheckCircle2 className="text-green-500" size={16} />;
      case "SCHEDULED": return <Clock className="text-blue-500" size={16} />;
      default: return <Mail className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <header className="bg-white border-b px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Announcements</h1>
          <p className="text-sm text-gray-500 mt-1">Manage and schedule internal communications</p>
        </div>
        <Link 
          href="/editor" 
          className="bg-[#123c5a] hover:bg-[#1a537a] text-white px-5 py-2.5 rounded-md font-medium flex items-center gap-2 transition-colors"
        >
          <Plus size={18} /> New Announcement
        </Link>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Calendar size={20} className="text-gray-400" />
            Communication Timeline
          </h2>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b text-xs uppercase tracking-wider text-gray-500 font-semibold">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Target Segment</th>
                <th className="px-6 py-4">Scheduled For</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {announcements.map((ann, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    <Link href={`/editor?id=${ann.id}`} className="hover:underline">
                      {ann.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {ann.segment}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {ann.scheduledAt ? new Date(ann.scheduledAt).toLocaleString() : "Immediate"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      {getStatusIcon(ann.status)}
                      <span className={
                        ann.status === "PUBLISHED" ? "text-green-700" :
                        ann.status === "SCHEDULED" ? "text-blue-700" : "text-gray-600"
                      }>
                        {ann.status}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {announcements.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                    <Mail size={32} className="mx-auto mb-3 text-gray-300" />
                    <p>No announcements yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
