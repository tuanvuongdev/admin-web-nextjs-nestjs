import AdminCard from "@/components/admin/admin.card";
import NextAuthWrapper from "@/library/next.auth.wrapper";
import { SessionProvider } from "next-auth/react";

const DashboardPage = () => {
  return (
    <div>
      <AdminCard />
    </div>
  );
};

export default DashboardPage;
