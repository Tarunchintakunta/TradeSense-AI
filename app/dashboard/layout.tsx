import Header from "@/components/dashboard/header";
import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-64">
        <Sidebar />
      </div>
      <div className="flex-grow flex flex-col md:overflow-y-auto">
        <Header /> 
        <main className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
        </main>
      </div>
    </div>
  );
}
