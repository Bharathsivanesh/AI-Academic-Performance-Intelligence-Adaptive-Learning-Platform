import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0F172A]">
      {/* 🔹 LEFT SIDEBAR */}
      <Sidebar role="admin" />

      {/* 🔹 RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        
        {/* 🔹 TOP NAVBAR */}
        <Navbar userName="Bharath" role="SUPER ADMIN" />

        {/* 🔹 PAGE CONTENT */}
        <main className="flex-1  overflow-auto">
          {children}
        </main>

      </div>
    </div>
  );
}