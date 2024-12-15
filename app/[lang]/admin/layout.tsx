import DashboardLayout from "@/components/Admin/LayoutDashboard/DashboardLayout";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rehabco Admin",
  description: "Generated by create next app",
  icons: {
    icon: "/public/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
