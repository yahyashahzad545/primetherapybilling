"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export default function Editor({ onChange }: { onChange: any }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "<p>Start writing your blog...</p>",
    immediatelyRender: false, // ✅ IMPORTANT FIX
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div className="border p-3 rounded space-y-2">
      <EditorContent editor={editor} />
    </div>
  );
}