"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

export default function Editor({
  onChange,
}: {
  onChange: (data: string) => void;
}) {
  // ✅ CKEditor ko sirf client side pe load karo
  const CKEditor = useMemo(
    () =>
      dynamic(
        async () => {
          const mod = await import("@ckeditor/ckeditor5-react");
          return mod.CKEditor;
        },
        { ssr: false }
      ),
    []
  );

  const ClassicEditor = useMemo(
    () => require("@ckeditor/ckeditor5-build-classic"),
    []
  );

  return (
    <div className="bg-white border rounded p-2">
      <CKEditor
        editor={ClassicEditor}
        data=""
        config={{
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "link",
            "bulletedList",
            "numberedList",
            "|",
            "blockQuote",
            "undo",
            "redo",
          ],
        }}
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          onChange(data);
        }}
      />
    </div>
  );
}