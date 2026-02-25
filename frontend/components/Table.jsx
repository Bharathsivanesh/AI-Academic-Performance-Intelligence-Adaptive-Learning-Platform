"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";

export default function CommonTable({
  columns = [],
  rows = [],
  limit = 5,
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(rows.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, rows.length);

  const currentRows = rows.slice(startIndex, endIndex);

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <Paper
      sx={{
        backgroundColor: "#0f1c2e",
        color: "#fff",
        borderRadius: 3,
        border: "1px solid rgba(255,255,255,0.05)",
        paddingBottom: 2,
      }}
    >
      <TableContainer>
        <Table sx={{
    "& .MuiTableCell-root": {
      borderBottom: "none",   // ❌ remove white line
    },
        // ✅ Header background darker
    "& .MuiTableHead-root": {
      backgroundColor: "#1e3a8a", // darker than body
    },

    // ✅ Border only for header row
    "& .MuiTableHead-root .MuiTableCell-root": {
      borderBottom: "1px solid rgba(255,255,255,0.08)",
    },

  }}>
          <TableHead>
            <TableRow>
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "#d0d2d5", fontWeight: 600 }}
                >
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {currentRows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((col, colIndex) => (
                  <TableCell key={colIndex} sx={{ color: "#e5e7eb" }}>
                    {col.render
                      ? col.render(row)
                      : row[col.field]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ✅ Custom Pagination */}
      <div className="flex items-center justify-between px-6 mt-4 text-sm text-gray-400">
        {/* Left Info */}
        <div>
          Showing {startIndex + 1} to {endIndex} of {rows.length} entries
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          <IconButton
            size="small"
            onClick={handlePrev}
            disabled={page === 1}
            sx={{ color: "#9ca3af" }}
          >
            <ChevronLeftIcon />
          </IconButton>

          {[...Array(totalPages)].map((_, index) => {
            const pageNumber = index + 1;
            return (
              <button
                key={pageNumber}
                onClick={() => setPage(pageNumber)}
                className={`w-8 h-8 rounded-md text-sm ${
                  page === pageNumber
                    ? "bg-blue-600 text-white"
                    : "bg-[#111827] text-gray-400 hover:bg-[#1f2937]"
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <IconButton
            size="small"
            onClick={handleNext}
            disabled={page === totalPages}
            sx={{ color: "#9ca3af" }}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>
    </Paper>
  );
}