"use client";

import { useState } from "react";
import Editor from "@/components/Editor";

export default function CreateBlog() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    metaTitle: "",
    metaDescription: "",
    featuredImg: "",
    imgAlt: "",
    author: "",
    category: "",
    content: "",
  });

  // 🔥 Auto slug generator
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  };

  // 🔧 Handle input change
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🚀 Submit blog
  const handleSubmit = async () => {
    if (!form.title || !form.content) {
      alert("Title aur content required hain ❌");
      return;
    }

    const res = await fetch("/api/blog/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // ✅ FIXED
      },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Blog Created ✅");

      // 🔄 Reset form
      setForm({
        title: "",
        slug: "",
        metaTitle: "",
        metaDescription: "",
        featuredImg: "",
        imgAlt: "",
        author: "",
        category: "",
        content: "",
      });
    } else {
      alert("Error creating blog ❌");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 space-y-4">
      <h1 className="text-3xl font-bold">Create Blog</h1>

      {/* Title */}
      <input
        name="title"
        placeholder="Blog Title"
        value={form.title}
        onChange={(e) => {
          handleChange(e);
          setForm((prev) => ({
            ...prev,
            slug: generateSlug(e.target.value), // 🔥 auto slug
          }));
        }}
        className="w-full border p-2"
      />

      {/* Slug */}
      <input
        name="slug"
        placeholder="Slug (auto SEO URL)"
        value={form.slug}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Meta Title */}
      <input
        name="metaTitle"
        placeholder="Meta Title"
        value={form.metaTitle}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Meta Description */}
      <textarea
        name="metaDescription"
        placeholder="Meta Description"
        value={form.metaDescription}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Featured Image */}
      <input
        name="featuredImg"
        placeholder="Featured Image URL"
        value={form.featuredImg}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Image Alt */}
      <input
        name="imgAlt"
        placeholder="Image Alt Text"
        value={form.imgAlt}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Author */}
      <input
        name="author"
        placeholder="Author Name"
        value={form.author}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Category */}
      <input
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
        className="w-full border p-2"
      />

      {/* Editor */}
      <div>
        <p className="font-semibold mb-2">Blog Content</p>
        <Editor
          onChange={(content: string) =>
            setForm((prev) => ({ ...prev, content }))
          }
        />
      </div>

      {/* Button */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Publish Blog 🚀
      </button>
    </div>
  );
}