"use client"
import AllOverview from "./AllOverview";
import PerformanceTabs from "./components/PerformanceTabs";
import SubjectCard from "./components/SubjectCard";
import FunctionsIcon from "@mui/icons-material/Functions";
import StorageIcon from "@mui/icons-material/Storage";
import { Box } from "@mui/material";

const Studentpage = () => {

  return (
   <div className="px-8 py-2">
      <AllOverview />
       <PerformanceTabs />
    <Box sx={{ display: "flex", mt:2, gap: 3 }}>
 
      <SubjectCard
        code="CS-304"
        title="Data Structures"
        subtitle="Algorithms & Complexity"
        score={84}
        icon={<StorageIcon />}
        onClick={() => console.log("DS Clicked")}
      />
       <SubjectCard
        code="CS-302"
        title="Advanced Mathematics"
        subtitle="Calculus & Linear Algebra"
        score={92}
        icon={<FunctionsIcon />}
        onClick={() => console.log("Math Clicked")}
      />
       <SubjectCard
        code="CS-304"
        title="Data Structures"
        subtitle="Algorithms & Complexity"
        score={84}
        icon={<StorageIcon />}
        onClick={() => console.log("DS Clicked")}
      />
    </Box>
    </div>
  );
};

export default Studentpage;
