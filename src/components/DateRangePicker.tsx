import React from "react";
import { Box } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import  { Dayjs } from "dayjs";

interface SingleInputDateRangePickerProps {
  startDate: Dayjs;
  endDate: Dayjs;
  setStartDate: (date: Dayjs) => void;
  setEndDate: (date: Dayjs) => void;
}

const SingleInputDateRangePicker: React.FC<SingleInputDateRangePickerProps> = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  const handleDateRangeChange = (newRange: [Dayjs | null, Dayjs | null]) => {
    if (newRange && newRange[0] && newRange[1]) {
      setStartDate(newRange[0]);
      setEndDate(newRange[1]);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ width: "600px" }}>
        <DateRangePicker
          value={[startDate, endDate]}
          onChange={handleDateRangeChange}
          slots={{ field: SingleInputDateRangeField }}
          slotProps={{
            field: {
              sx: {
                width: "100%",
                "& .MuiOutlinedInput-root": {
                  height: "45px",
                  borderRadius: "8px",
                  padding: 0,
                  "& input": {
                    height: "45px",
                    padding: "0 14px",
                  },
                },
              },
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
};

export default SingleInputDateRangePicker;
