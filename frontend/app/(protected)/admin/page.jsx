"use client";
import { Avatar, Chip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../../../components/Table";

export default function AdminPage() {

  const rows = [
    {
      name: "Alan Turing",
      email: "aturing@uni.edu",
      employeeId: "CS-2024-001",
      department: "Computer Science",
      role: "Senior Professor",
      status: "Active",
    },
    {
      name: "Ada King",
      email: "ada.k@uni.edu",
      employeeId: "CS-2024-002",
      department: "Applied Mathematics",
      role: "Head of Department",
      status: "Active",
    },
       {
      name: "Alan Turing",
      email: "aturing@uni.edu",
      employeeId: "CS-2024-001",
      department: "Computer Science",
      role: "Senior Professor",
      status: "Active",
    },
    {
      name: "Ada King",
      email: "ada.k@uni.edu",
      employeeId: "CS-2024-002",
      department: "Applied Mathematics",
      role: "Head of Department",
      status: "Active",
    },
  ];

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
            <div className="font-medium text-white">
              {row.name}
            </div>
            <div className="text-sm text-gray-400">
              {row.email}
            </div>
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
      label: "STATUS",
      render: (row) => (
        <Chip
          label={row.status}
          size="small"
          sx={{
            backgroundColor: "#1d4ed8",
            color: "#fff",
            fontWeight: 500,
          }}
        />
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

  return (
    <div className="p-8 bg-[#0b1220] min-h-screen text-white">
      <h2 className="text-xl font-semibold mb-6">
        Existing Staff Directory
      </h2>

      <CommonTable
        columns={columns}
        rows={rows}
        limit={2}
      />
    </div>
  );
}