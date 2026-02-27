import Sidebar from "../../../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-[#0F172A] min-h-screen ">{children}</main>
    </div>
  );
}
