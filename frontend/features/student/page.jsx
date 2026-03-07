"use client";

import AllOverview from "./AllOverview";
import PerformanceTabs from "./components/PerformanceTabs";
import SubjectCard from "./components/SubjectCard";
import FunctionsIcon from "@mui/icons-material/Functions";
import StorageIcon from "@mui/icons-material/Storage";
import { Box } from "@mui/material";

const Studentpage = () => {
  const subjects = [
    {
      code: "CS-304",
      title: "Data Structures",
      subtitle: "Algorithms & Complexity",
      score: 84,
      icon: <StorageIcon />,
    },
    {
      code: "CS-302",
      title: "Advanced Mathematics",
      subtitle: "Calculus & Linear Algebra",
      score: 92,
      icon: <FunctionsIcon />,
    },
    {
      code: "CS-305",
      title: "Operating Systems",
      subtitle: "Processes & Memory",
      score: 78,
      icon: <StorageIcon />,
    },
  ];

  return (
    <div className="px-4 md:px-8 py-2">
      <AllOverview />

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
            code={subject.code}
            title={subject.title}
            subtitle={subject.subtitle}
            score={subject.score}
            icon={subject.icon}
            onClick={() => console.log(`${subject.title} Clicked`)}
          />
        ))}
      </Box>
    </div>
  );
};

export default Studentpage;