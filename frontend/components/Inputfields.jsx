"use client";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { MenuItem } from "@mui/material";
export default function InputField({
  type = "text",
  placeholder = "",
  label = "",
  mandatory = false,
  onChange,
  className = "",
   value,
  disabled = false,
  name,
  startIcon,   
  options = [],
}) {
  const [showPassword, setShowPassword] = useState(false);

const baseStyles = {
  "& .MuiOutlinedInput-root": {
    color: "#fff",
    backgroundColor: "#0f1c2e",
    borderRadius: "12px",

    "& fieldset": {
      borderColor: "rgba(255,255,255,0.1)",
    },

    "&:hover fieldset": {
      borderColor: "#0459f6",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#0459f6",
    },

    // 👇 ADD THIS
    "&.Mui-disabled": {
      color: "#fff",
      WebkitTextFillColor: "#fff", // VERY IMPORTANT for disabled text
      backgroundColor: "#0f1c2e",
    },
  },

  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "#fff",
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#9ca3af",
    opacity: 1,
  },
};

  const renderField = () => {
    switch (type) {
      case "password":
        return (
          <TextField
            fullWidth
            required={mandatory}
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            variant="outlined"
            size="medium"
            onChange={onChange}
            value={value}
             name={name}
  disabled={disabled}
            sx={baseStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="  end"
                  >
                    {showPassword ? (
                      <VisibilityOff sx={{ color: "#6b7280" }} />
                    ) : (
                      <Visibility sx={{ color: "#6b7280" }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        );
  
case "select":
  return (
    <TextField
      select
      fullWidth
      name={name}
      required={mandatory}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      variant="outlined"
      size="medium"
      sx={{
        ...baseStyles,

        // Blue border
        "& .MuiOutlinedInput-root": {
          ...baseStyles["& .MuiOutlinedInput-root"],
          "& fieldset": {
            borderColor: "#0459f6",
          },
        },

        // Dropdown icon white
        "& .MuiSvgIcon-root": {
          color: "#fff",
        },
      }}
      SelectProps={{
        displayEmpty: true,
        renderValue: (selected) => {
          if (!selected) {
            return (
              <span style={{ color: "#fff" }}>
                {placeholder || "Select option"}
              </span>
            );
          }

          const selectedOption = options.find(
            (opt) => opt.value === selected
          );
          return selectedOption?.label;
        },
        MenuProps: {
          PaperProps: {
            sx: {
              backgroundColor: "#0f1c2e",
              color: "#fff",
            },
          },
        },
      }}
    >
      <MenuItem value="" disabled>
        {placeholder || "Select option"}
      </MenuItem>

      {options?.map((option, index) => (
        <MenuItem  sx={{
      color: "#fff",
      "&:hover": {
        backgroundColor: "#3b76e2", // blue hover
      },
      "&.Mui-selected": {
        backgroundColor: "#0459f6",
      },
      "&.Mui-selected:hover": {
        backgroundColor: "#0459f6",
      },
    }} key={index} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
    
  case "date":
  const today = new Date().toISOString().split("T")[0];

  return (
    <TextField
      fullWidth
      required={mandatory}
      type="date"
      name={name}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
      variant="outlined"
      size="medium"
      inputProps={{
        min: today, // ❗ prevents past dates
      }}
      sx={{
        ...baseStyles,
        "& input::-webkit-calendar-picker-indicator": {
          filter: "invert(1)",
          cursor: "pointer",
        },
      }}
    />
  );
  
  
  case "number":
        return (
          <TextField
            fullWidth
             name={name}
            required={mandatory}
            type="number"
            placeholder={placeholder}
            variant="outlined"
            size="medium"
            onChange={onChange}
            sx={baseStyles}
            value={value}
  disabled={disabled}
          />
        );

      case "email":
        return (
          <TextField
            fullWidth
             name={name}
            required={mandatory}
            type="email"
            placeholder={placeholder}
            variant="outlined"
            size="medium"
            onChange={onChange}
            sx={baseStyles}
            value={value}
  disabled={disabled}
          />
        );

      default:
        return (
          
          <TextField
           name={name}
            fullWidth
            required={mandatory}
            type="text"
            placeholder={placeholder}
            variant="outlined"
            size="medium"
            onChange={onChange}
            value={value}
  disabled={disabled}
            sx={baseStyles}
             InputProps={{
    startAdornment: startIcon ? (
      <InputAdornment position="start">
        {startIcon}
      </InputAdornment>
    ) : null,
  }}
          />
        );
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm text-white/80 mb-2">
          {label} {mandatory && <span className="text-red-500 text-base">*</span>}
        </label>
      )}
      {renderField()}
    </div>
  );
}