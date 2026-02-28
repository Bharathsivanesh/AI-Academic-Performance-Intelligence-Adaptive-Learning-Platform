"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthWrapper({ children }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/login"); // ❌ redirect if not logged in
    } else {
      setIsChecking(false); // ✅ allow access
    }
  }, [router]);

  if (isChecking) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0b1220] text-white">
        Checking Authentication...
      </div>
    );
  }

  return <>{children}</>;
}