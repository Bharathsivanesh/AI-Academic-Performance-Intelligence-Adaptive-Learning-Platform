"use client";
import { Avatar, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import StatCard from "./components/Overviewcards";
import AddIcon from "@mui/icons-material/Add";
import GroupsIcon from "@mui/icons-material/Groups";
import PersonIcon from "@mui/icons-material/Person";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import DynamicFormCard from "../../components/DynamicFormCard";
import UploadCard from "../../components/UploadFile";
import CommonTable from "../../components/Table";
import InputField from "../../components/Inputfields";
import { useState } from "react";
import { Modal, Box, Button } from "@mui/material";
export default function AdminPage() {


const[AssignedBatch,setAssignedBatch]=useState(false)
const handleOpen = (row) => {
  setSelectedStaff(row);
  setAssignedBatch(true);
};


const handleClose = () => {
  setAssignedBatch(false);
};
const [filters, setFilters] = useState({
  passoutYear: "",
});

const handlefilterChange = (e) => {
  setFilters({
    ...filters,
    [e.target.name]: e.target.value,
  });
};

  const rows = [
    {
      id:1,
      name: "Alan Turing",
      email: "aturing@uni.edu",
      employeeId: "CS-2024-001",
      department: "Computer Science",
      role: "Senior Professor",
      status: "Active",
    batches: [
      { id: 1, batch_name: "2024-2028" }
    ]
    },
    {
       id:2,
      name: "Ada King",
      email: "ada.k@uni.edu",
      employeeId: "CS-2024-002",
      department: "Applied Mathematics",
      role: "Head of Department",
      status: "Active",
      batches: [
      { id: 1, batch_name: "2024-2028" }
    ]
    },
    {
       id:3,
      name: "Alan Turing",
      email: "aturing@uni.edu",
      employeeId: "CS-2024-001",
      department: "Computer Science",
      role: "Senior Professor",
      status: "Active",
      batches: [
      
    ]
    },
    {
       id:4,
      name: "Bharath",
      email: "ada.k@uni.edu",
      employeeId: "CS-2024-002",
      department: "Applied Mathematics",
      role: "Head of Department",
      status: "Active",
     batches: [
      { id: 1, batch_name: "2024-2028" }
    ]
    },
  ];

  const [TableRow,setTableRows]=useState(rows||[])
  // 🔵 Columns Config
  const columns = [
    {
      label: "NAME",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar
            sx={{
              width: 36,
              height: 36,
              backgroundColor: "#1e3a8a",
              fontSize: 14,
            }}
          >
            {row.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>

          <div>
            <div className="font-medium text-white">{row.name}</div>
            <div className="text-sm text-gray-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    {
      field: "employeeId",
      label: "EMPLOYEE ID",
    },
    {
      field: "department",
      label: "DEPARTMENT",
    },
    {
      field: "role",
      label: "ROLE",
    },
 
{
  label: "BATCH",
  render: (row) => (
    <div className="flex items-center gap-2 flex-wrap">
      
      {row.batches && row.batches.length > 0 &&
        row.batches.map((batch) => (
          <Chip
            key={batch.id}
            label={batch.batch_name}
            size="small"
            sx={{
              backgroundColor: "#16a34a",
              color: "#fff",
              fontWeight: 500,
            }}
          />
        ))}

      <button
        onClick={() => handleOpen(row)}
        className="flex items-center gap-1 px-2 py-1 cursor-pointer text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        <AddIcon sx={{ fontSize: 16 }} />
        Add
      </button>

    </div>
  ),
},
    {
      label: "ACTIONS",
      render: () => (
        <div className="flex gap-2">
          <IconButton size="small">
            <EditIcon sx={{ color: "#3b82f6" }} />
          </IconButton>
          <IconButton size="small">
            <DeleteIcon sx={{ color: "#ef4444" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  const statsData = [
    {
      title: "Total Staff",
      value: "48",
      icon: GroupsIcon,
      growth: "+2%",
      growthText: "this month",
    },
    {
      title: "Total Students",
      value: "1,240",
      icon: PersonIcon,
      growth: "+5.4%",
      growthText: "this month",
    },
    {
      title: "Total Subjects",
      value: "32",
      icon: MenuBookIcon,
    },
  ];
    const [formData, setFormData] = useState({
    staffName: "",
    registerNumber: "",
    department: "",
    role: "Staff", // default value
  });
  
  
  const handleChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
const staffFields = [
  {
    name: "staffName",
    label: "Staff Name",
    placeholder: "Enter full name",
    mandatory: true,
  },
  {
    name: "registerNumber",
    label: "Register Number",
    placeholder: "Enter unique register number",
    mandatory: true,
  },
  {
    name: "department",
    label: "Department",
    placeholder: "Enter department name",
    mandatory: true,
  },
    {
    name: "Password",
    label: "Password",
    placeholder: "Enter password",
    mandatory: true,
  },

];
  const [searchText, setSearchText] = useState("");
    const handleSubmit = () => {
    console.log(formData);
  };
  const [selectedStaff, setSelectedStaff] = useState(null);
  const handleAssignBatch = () => {
  const updatedRows = TableRow.map((row) =>
    row.employeeId === selectedStaff.employeeId
      ? { ...row, batch: filters.passoutYear }
      : row
  );

  setTableRows(updatedRows);

  setOpenModal(false);
};
  return (
    <div className="p-8  bg-[#0b1220] min-h-screen text-white">
      {/* <h2 className="text-xl font-semibold mb-6">
        Existing Staff Directory
      </h2>

      <CommonTable
        columns={columns}
        rows={rows}
        limit={2}
      /> */}
                    <div className="flex justify-end mb-3">

       
        <Button
  startIcon={<AddIcon />}
  sx={{
    backgroundColor: "#2563eb",
    color: "#fff",
    "&:hover": { backgroundColor: "#1d4ed8" },
  }}
  onClick={() => setOpenModal(true)}
>
  Schedule Exam
</Button>
 </div>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((card, index) => (
            <StatCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              growth={card.growth}
              growthText={card.growthText}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 md:gap-0 md:flex-row justify-between items-center ">
          <h2 className="text-xl md:w-2/3 font-semibold">
            Existing Staff Directory
          </h2>

          <InputField
            placeholder="Search by name, ID or department.."
             startIcon={<SearchIcon sx={{ color: "#9ca3af" }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
             className="max-w-md rounded-lg"
          />
        </div>

        <CommonTable
          columns={columns}
          rows={TableRow}
          limit={2}
          searchText={searchText} // ✅ PASS HERE
        />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UploadCard
            title="Bulk Upload Staffs"
            description="Drop your CSV file here"
            buttonText="Browse Files"
            onFileSelect={(file) => console.log(file)}
          />

          <div className="lg:col-span-2">
            <DynamicFormCard
              title="Manual Entry"
              fields={staffFields}
              buttonText="Add Staff"
                   onSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}

            />
          </div>
        </div>
      </div>
      <Modal open={AssignedBatch} onClose={handleClose}>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "#0f1c2e",
      borderRadius: 3,
      p: 4,
    }}
  >
    <h2 className="text-white text-lg mb-4">Assign Batch</h2>

    <InputField
      type="select"
      name="passoutYear"
      value={filters.passoutYear}
      onChange={handlefilterChange}
      placeholder="Passout Year"
      options={[
        { label: "2024", value: "2024" },
        { label: "2025", value: "2025" },
        { label: "2026", value: "2026" },
      ]}
    />

    <div className="flex justify-end gap-3 mt-6">
      <Button variant="outlined" onClick={handleClose}>
        Cancel
      </Button>

      <Button

       sx={{
    backgroundColor: "#0a4fe4",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1d4ed8",
    },
  }}
        onClick={() => {
          console.log("Assign", selectedStaff, filters.passoutYear);
          handleAssignBatch()
          handleClose();
        }}
      >
        Assign
      </Button>
    </div>
  </Box>
</Modal>

    </div>
  );
}
