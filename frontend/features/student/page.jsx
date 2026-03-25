"use client";

import React, { useEffect, useState } from "react";
import AllOverview from "./AllOverview";
import PerformanceTabs from "./components/PerformanceTabs";
import SubjectCard from "./components/SubjectCard";
import FunctionsIcon from "@mui/icons-material/Functions";
import StorageIcon from "@mui/icons-material/Storage";
import { Box } from "@mui/material";
import { apiService } from "../../service/Apicall";

const Studentpage = () => {
  const [dashboardData, setDashboardData] = useState(null);

  const fetchDashboard = () => {
    apiService({
      endpoint: "/api/student/dashboard/",
      method: "GET",
      onSuccess: (res) => {
        setDashboardData(res);
      },
      onError: (err) => console.error(err),
    });
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // fallback
  const subjects = dashboardData?.subjects || [];

  return (
    <div className="px-4 md:px-8 py-2 h-screen">
      
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
    </div>
  );
};

export default Studentpage;