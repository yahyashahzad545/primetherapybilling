import type { Metadata } from "next";

// The admin area (blog editor, sign-in) is private: never shown in search results
export const metadata: Metadata = {
  title: { absolute: "Admin | Prime Therapy Billing" },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
