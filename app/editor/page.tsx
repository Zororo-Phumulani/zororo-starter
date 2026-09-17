"use client";

import { useState } from "react";
import WysiwygEditor from "@/components/wysiwyg-editor";
import { ArrowLeft, Save, Send, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetType, setTargetType] = useState("ALL");
  const [targetIds, setTargetIds] = useState<string[]>([]);
  const [scheduledAt, setScheduledAt] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [previewHtml, setPreviewHtml] = useState<string | null>(null);

  const [departments, setDepartments] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [audiences, setAudiences] = useState<any[]>([]);

  import("react").then((React) => {
    React.useEffect(() => {
      fetch("/api/directory?type=departments").then(r => r.json()).then(d => setDepartments(d.departments || []));
      fetch("/api/directory?type=branches").then(r => r.json()).then(d => setBranches(d.branches || []));
      fetch("/api/directory?type=audiences").then(r => r.json()).then(d => setAudiences(d.audiences || []));
    }, []);
  });

  async function handleSave(status: "DRAFT" | "SCHEDULED" | "PUBLISHED") {
    setIsSaving(true);
    try {
      const res = await fetch("/api/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          content,
          targetType,
          targetIds,
          status,
          scheduledAt: scheduledAt || null,
        }),
      });
      if (res.ok) {
        router.push("/");
      } else {
        alert("Failed to save announcement");
      }
    } catch (e) {
      alert("Error saving");
    }
    setIsSaving(false);
  }

  async function updatePreview() {
    try {
      const res = await fetch("/api/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      if (res.ok) {
        const data = await res.json();
        setPreviewHtml(data.html);
      }
    } catch (e) {
      console.error("Preview generation failed", e);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b shrink-0">
        <div className="flex items-center gap-4 flex-1">
          <Link href="/" className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
            <ArrowLeft size={20} />
          </Link>
          <input
            type="text"
            placeholder="Announcement Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-2xl font-bold border-none outline-none focus:ring-0 flex-1 placeholder:text-gray-300 bg-transparent"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 bg-gray-50">
            <span className="text-xs text-gray-500 uppercase font-semibold">To:</span>
            <select
              value={targetType}
              onChange={(e) => {
                setTargetType(e.target.value);
                setTargetIds([]); // Reset specific targets when type changes
              }}
              className="bg-transparent border-none outline-none text-sm font-medium"
            >
              <option value="ALL">Everyone</option>
              <option value="DEPARTMENT">By Department</option>
              <option value="BRANCH">By Branch</option>
              <option value="AUDIENCE">Saved Audience</option>
            </select>
            
            {targetType === "DEPARTMENT" && (
              <select onChange={(e) => setTargetIds([e.target.value])} className="ml-2 bg-white border rounded text-sm p-1">
                <option value="">Select Department</option>
                {departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            )}
            {targetType === "BRANCH" && (
              <select onChange={(e) => setTargetIds([e.target.value])} className="ml-2 bg-white border rounded text-sm p-1">
                <option value="">Select Branch</option>
                {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            )}
            {targetType === "AUDIENCE" && (
              <select onChange={(e) => setTargetIds([e.target.value])} className="ml-2 bg-white border rounded text-sm p-1">
                <option value="">Select Audience</option>
                {audiences.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            )}
          </div>
          <div className="flex items-center gap-2 border rounded-md px-3 py-1.5 bg-gray-50">
            <Calendar size={14} className="text-gray-500" />
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(e) => setScheduledAt(e.target.value)}
              className="bg-transparent border-none outline-none text-sm font-medium text-gray-700"
            />
          </div>

          <div className="h-6 w-px bg-gray-300 mx-2" />

          <button
            onClick={() => handleSave("DRAFT")}
            disabled={isSaving || !title.trim()}
            className="text-gray-600 hover:text-gray-900 font-medium text-sm disabled:opacity-50"
          >
            Save Draft
          </button>
          
          {scheduledAt ? (
             <button
               onClick={() => handleSave("SCHEDULED")}
               disabled={isSaving || !title.trim()}
               className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-50"
             >
               <Calendar size={16} /> Schedule
             </button>
          ) : (
             <button
               onClick={() => handleSave("PUBLISHED")}
               disabled={isSaving || !title.trim()}
               className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium text-sm transition-colors disabled:opacity-50"
             >
               <Send size={16} /> Send Now
             </button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden flex">
        {/* Editor Pane */}
        <div className="flex-1 overflow-y-auto p-8 border-r bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">Message Content</h2>
            <WysiwygEditor
              value={content}
              onChange={(val) => {
                setContent(val);
                // Debounce preview update in a real app, here we just do it manually or simply use a button
              }}
            />
            <div className="mt-4 flex justify-end">
              <button 
                onClick={updatePreview}
                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Update Preview
              </button>
            </div>
          </div>
        </div>

        {/* Preview Pane */}
        <div className="w-[500px] bg-gray-100 overflow-y-auto p-8 flex flex-col items-center">
           <h2 className="text-xs font-bold text-gray-400 mb-6 uppercase tracking-wider w-full text-center">Email Preview</h2>
           {previewHtml ? (
             <div 
               className="w-full bg-white shadow-xl rounded-lg overflow-hidden transform scale-90 origin-top"
               style={{ minHeight: "600px" }}
             >
               <iframe 
                 srcDoc={previewHtml} 
                 className="w-full h-[800px] border-none"
                 title="Email Preview"
               />
             </div>
           ) : (
             <div className="text-gray-400 text-sm mt-20 text-center">
               <p>Click "Update Preview" to see how your email will look.</p>
               <p className="mt-2 text-xs">It will be automatically wrapped in the standard Zororo Phumulani template.</p>
             </div>
           )}
        </div>
      </main>
    </div>
  );
}
