"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function Editor({
  onChange,
}: {
  onChange: (data: string) => void;
}) {
  const CKEditorComponent = useMemo(
    () =>
      dynamic<any>(
        async () => {
          const mod = await import("@ckeditor/ckeditor5-react");
          return mod.CKEditor;
        },
        { ssr: false }
      ),
    []
  );

  return (
    <div className="bg-white border rounded p-2">
      <CKEditorComponent
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