"use client";

import { TextField, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";

export default function InputField({
  type = "text",
  placeholder = "",
  label = "",
  mandatory = false,
  onChange,
  className = "",
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
        borderColor: "#10b981",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#10b981",
      },
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
            sx={baseStyles}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
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

      case "number":
        return (
          <TextField
            fullWidth
            required={mandatory}
            type="number"
            placeholder={placeholder}
            variant="outlined"
            size="medium"
            onChange={onChange}
            sx={baseStyles}
          />
        );

      case "email":
        return (
          <TextField
            fullWidth
            required={mandatory}
            type="email"
            placeholder={placeholder}
            variant="outlined"
            size="medium"
            onChange={onChange}
            sx={baseStyles}
          />
        );

      default:
        return (
          <TextField
            fullWidth
            required={mandatory}
            type="text"
            placeholder={placeholder}
            variant="outlined"
            size="medium"
            onChange={onChange}
            sx={baseStyles}
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