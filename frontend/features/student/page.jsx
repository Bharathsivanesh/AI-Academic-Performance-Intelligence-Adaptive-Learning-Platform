"use client";

import React, { useEffect, useState } from "react";
import AllOverview from "./AllOverview";
import SubjectCard from "./components/SubjectCard";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import CloseIcon from "@mui/icons-material/Close";
import StorageIcon from "@mui/icons-material/Storage";
import FunctionsIcon from "@mui/icons-material/Functions";
import ScienceIcon from "@mui/icons-material/Science";
import LanguageIcon from "@mui/icons-material/Language";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box } from "@mui/material";
import { apiService } from "../../service/Apicall";
import Chatbot from "../../components/Aichatbot";
import Loader from "../../components/Loader";
import { showToast } from "../../components/Notification";

// Cycle through a varied set of subject icons
const SUBJECT_ICONS = [
  <StorageIcon />,
  <FunctionsIcon />,
  <ScienceIcon />,
  <LanguageIcon />,
  <HistoryEduIcon />,
  <AccountBalanceIcon />,
  <MenuBookIcon />,
];

// Empty state component
const EmptySubjects = () => (
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 2,
      py: 8,
      px: 3,
      mt: 2,
      width: "100%",
      border: "1.5px dashed",
      borderColor: "divider",
      borderRadius: 3,
      textAlign: "center",
    }}
  >
    {/* Book icon built from MUI */}
    <MenuBookIcon sx={{ fontSize: 56, color: "#ffff" }} />

    <Box>
      <p
        style={{
          fontSize: "1.1rem",
          fontWeight: 500,
          margin: "0 0 6px",
          color: "inherit",
        }}
      >
        No subjects enrolled yet
      </p>
      <p
        style={{
          fontSize: "0.875rem",
          color: "#888",
          margin: 0,
          maxWidth: 320,
        }}
      >
        Your exam subjects and marks will appear here once they are published by
        your institution. Please check back later or contact your coordinator if
        you think this is a mistake.
      </p>
    </Box>
  </Box>
);

const Studentpage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [openChat, setOpenChat] = useState(false);
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
        // showToast("Failed to load dashboard. Please try again.", "error");
        setIsLoading(false);
      },
    });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const subjects = dashboardData?.subjects || [];
  const hasSubjects = subjects.length > 0;

  return (
    <div className="px-4 md:px-8 py-2 h-screen relative">
      <AllOverview data={dashboardData} />

      {/* Subject Cards or Empty State */}
      {isLoading ? null : hasSubjects ? (
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
              key={subject.subject_code ?? index}
              code={subject.subject_code}
              title={subject.subject_name}
              subtitle="Subject Performance"
              score={subject.percentage}
              icon={SUBJECT_ICONS[index % SUBJECT_ICONS.length]}
              onClick={() => console.log(`${subject.subject_name} clicked`)}
            />
          ))}
        </Box>
      ) : (
        // Only show empty state after data has loaded (not while loading)
        dashboardData == null && <EmptySubjects />
      )}

      {/* Floating AI Button */}
      <button
        onClick={() => setOpenChat(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg z-50"
        aria-label="Open AI Assistant"
      >
        <SmartToyIcon />
      </button>

      {/* Chat Modal */}
      {openChat && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="w-[95%] sm:w-[500px] md:w-[800px] lg:w-[900px] h-[90vh] bg-[#0B1120] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="flex justify-end items-center p-3 border-b border-gray-700">
              <button
                onClick={() => setOpenChat(false)}
                className="text-white hover:text-gray-300 transition-colors"
                aria-label="Close chat"
              >
                <CloseIcon />
              </button>
            </div>
            <div className="flex-1 min-h-0">
              <Chatbot />
            </div>
          </div>
        </div>
      )}

      {/* Global Loader */}
      <Loader isLoading={isLoading} message={loadingMessage} />
    </div>
  );
};

export default Studentpage;
