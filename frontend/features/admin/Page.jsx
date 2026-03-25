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
import { useState, useEffect } from "react";
import { Modal, Box, Button } from "@mui/material";
import { apiService } from "../../service/Apicall";

export default function AdminPage() {

  const [AssignedBatch, setAssignedBatch] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const [filters, setFilters] = useState({
    passoutYear: "",
  });

  const handleOpen = (row) => {
    setSelectedStaff(row);
    setAssignedBatch(true);
  };

  const handleClose = () => setAssignedBatch(false);

  const handlefilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  // ===================== TABLE =====================
  const [TableRow, setTableRows] = useState([]);

  const fetchStaffList = () => {
    apiService({
      endpoint: "/api/admin/staff/",
      method: "GET",
      onSuccess: (res) => {
        const formatted = res.map((item) => ({
          id: item.id,
          name: item.staff_name,
          email: item.email,
          employeeId: item.username,
          department: item.department,
          batches: item.batches || [],
        }));
        setTableRows(formatted);
      },
      onError: (err) => console.error(err),
    });
  };

  // ===================== DELETE =====================
  const handleDelete = (id) => {
    apiService({
      endpoint: `/api/admin/staff/${id}/delete/`,
      method: "DELETE",
      onSuccess: () => fetchStaffList(),
      onError: (err) => console.error(err),
    });
  };

  // ===================== ASSIGN BATCH API =====================
  const handleAssignBatch = () => {
    if (!selectedStaff || !filters.passoutYear) return;

    apiService({
      endpoint: "/api/admin/staff/assign-batch/",
      method: "POST",
      payload: {
        staff: selectedStaff.id,
        department: selectedStaff.department,
        batch: Number(filters.passoutYear),
      },
      onSuccess: () => {
        fetchStaffList(); // refresh
        setAssignedBatch(false);
      },
      onError: (err) => console.error(err),
    });
  };

  // ===================== TABLE COLUMNS =====================
  const columns = [
    {
      label: "NAME",
      render: (row) => (
        <div className="flex items-center gap-3">
          <Avatar sx={{ width: 36, height: 36, backgroundColor: "#1e3a8a" }}>
            {row.name?.charAt(0).toUpperCase()}
          </Avatar>
          <div>
            <div className="font-medium text-white">{row.name}</div>
            <div className="text-sm text-gray-400">{row.email}</div>
          </div>
        </div>
      ),
    },
    { field: "employeeId", label: "EMPLOYEE ID" },
    { field: "department", label: "DEPARTMENT" },

    {
      label: "BATCH",
      render: (row) => (
        <div className="flex items-center gap-2 flex-wrap">
          {row.batches?.map((batch) => (
            <Chip
              key={batch.id}
              label={batch.batch_name}
              size="small"
              sx={{ backgroundColor: "#16a34a", color: "#fff" }}
            />
          ))}

          <button
            onClick={() => handleOpen(row)}
            className="flex items-center gap-1 px-2 py-1 text-xs bg-blue-600 text-white rounded-md"
          >
            <AddIcon sx={{ fontSize: 16 }} />
            Add
          </button>
        </div>
      ),
    },

    {
      label: "ACTIONS",
      render: (row) => (
        <div className="flex gap-2">
          <IconButton size="small">
            <EditIcon sx={{ color: "#3b82f6" }} />
          </IconButton>
          <IconButton size="small" onClick={() => handleDelete(row.id)}>
            <DeleteIcon sx={{ color: "#ef4444" }} />
          </IconButton>
        </div>
      ),
    },
  ];

  // ===================== STATS =====================
  const [statsData, setStatsData] = useState([
    { title: "Total Staff", value: "0", icon: GroupsIcon },
    { title: "Total Students", value: "0", icon: PersonIcon },
    { title: "Total Subjects", value: "0", icon: MenuBookIcon },
  ]);

  // ===================== FORM =====================
  const [formData, setFormData] = useState({
    staffName: "",
    registerNumber: "",
    email: "",
    department: "",
    password: "",
  });

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    apiService({
      endpoint: "/api/admin/staff/create/",
      method: "POST",
      payload: {
        username: formData.registerNumber,
        email: formData.email,
        password: formData.password,
        staff_name: formData.staffName,
        department: formData.department,
      },
      onSuccess: () => {
        fetchStaffList();
      },
      onError: (err) => console.error(err),
    });
  };

  // ===================== LOAD =====================
  useEffect(() => {
    apiService({
      endpoint: "/api/admin/dashboard-stats/",
      method: "GET",
      onSuccess: (res) => {
        setStatsData([
          { title: "Total Staff", value: res.total_staff, icon: GroupsIcon },
          { title: "Total Students", value: res.total_students, icon: PersonIcon },
          { title: "Total Subjects", value: res.total_subjects, icon: MenuBookIcon },
        ]);
      },
    });

    fetchStaffList();
  }, []);

  // ===================== UI =====================
  const staffFields = [
    { name: "staffName", label: "Staff Name", mandatory: true },
    { name: "registerNumber", label: "Register Number", mandatory: true },
    { name: "email", label: "Email", mandatory: true },
    { name: "department", label: "Department", mandatory: true },
    { name: "password", label: "Password", mandatory: true },
  ];

  const [searchText, setSearchText] = useState("");

  return (
    <div className="p-8 bg-[#0b1220] min-h-screen text-white">

      <div className="flex flex-col gap-4">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((card, index) => (
            <StatCard key={index} {...card} />
          ))}
        </div>

        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold whitespace-nowrap">Existing Staff Directory</h2>
          <div>

          
          <InputField
            placeholder="Search by name, email ...`"
            startIcon={<SearchIcon sx={{ color: "#9ca3af" }} />}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          </div>
        </div>

        <CommonTable columns={columns} rows={TableRow} searchText={searchText} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <UploadCard title="Bulk Upload Staffs" />

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

      {/* ================= MODAL ================= */}
      <Modal open={AssignedBatch} onClose={handleClose}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "#0f1c2e",
          borderRadius: 3,
          p: 4,
        }}>
          <h2 className="text-white text-lg mb-4">Assign Batch</h2>

          <InputField
            type="select"
            name="passoutYear"
            value={filters.passoutYear}
            onChange={handlefilterChange}
            options={[
              { label: "2024-2028", value: 1 },
              { label: "2025-2029", value: 2 },
              { label: "2026-2030", value: 3 },
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
                "&:hover": { backgroundColor: "#1d4ed8" },
              }}
              onClick={handleAssignBatch}
            >
              Assign
            </Button>
          </div>
        </Box>
      </Modal>

    </div>
  );
}