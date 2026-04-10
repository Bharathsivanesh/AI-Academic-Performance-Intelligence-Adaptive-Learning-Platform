"use client";

import React, { useEffect, useState } from "react";
import AllOverview from "./AllOverview";
import PerformanceTabs from "./components/PerformanceTabs";
import SubjectCard from "./components/SubjectCard";
import FunctionsIcon from "@mui/icons-material/Functions";
import StorageIcon from "@mui/icons-material/Storage";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";
import { apiService } from "../../service/Apicall";
import Chatbot from "../../components/Aichatbot";

// ✅ IMPORT
import Loader from "../../components/Loader";
import { showToast } from "../../components/Notification";

const Studentpage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  // ✅ NEW STATES
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  const fetchDashboard = () => {
    setIsLoading(true);
    setLoadingMessage("Loading dashboard...");

    apiService({
      endpoint: "/api/student/dashboard/",
      method: "GET",
      onSuccess: (res) => {
        setDashboardData(res);
        setIsLoading(false);
      },
      onError: (err) => {
        console.error(err);
        showToast("Failed to load dashboard!", "error"); // ✅ optional
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const subjects = dashboardData?.subjects || [];

  return (
    <div className="px-4 md:px-8 py-2 h-screen relative">
      <AllOverview data={dashboardData} />
      <PerformanceTabs />

      {/* Subject Cards */}
      <Box
        sx={{
          display: "flex",
          mt: 2,
          gap: 3,
          flexWrap: "wrap",
          justifyContent: {
            xs: "center",
            sm: "flex-start",
          },
        }}
      >
        {subjects.map((subject, index) => (
          <SubjectCard
            key={index}
            code={subject.subject_code}
            title={subject.subject_name}
            subtitle="Subject Performance"
            score={subject.percentage}
            icon={index % 2 === 0 ? <StorageIcon /> : <FunctionsIcon />}
            onClick={() => console.log(`${subject.subject_name} Clicked`)}
          />
        ))}
      </Box>

      {/* Floating AI Button */}
      <button
        onClick={() => setOpenChat(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
      >
        <SmartToyIcon />
      </button>

      {/* Chat Modal */}
      {openChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-[95%] sm:w-[500px] md:w-[800px] lg:w-[900px] h-[90vh] bg-[#0B1120] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-end items-end p-3 border-gray-700 text-white">
              <button onClick={() => setOpenChat(false)}>
                <CloseIcon />
              </button>
            </div>

            <div className="flex-1 min-h-0">
              <Chatbot />
            </div>
          </div>
        </div>
      )}

      {/* ✅ GLOBAL LOADER */}
      <Loader isLoading={isLoading} message={loadingMessage} />
    </div>
  );
};

export default Studentpage;
