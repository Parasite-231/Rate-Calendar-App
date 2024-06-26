import { Box } from "@mui/material";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

export default function SingleInputDateRangePicker() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["SingleInputDateRangeField"]}>
        <Box sx={{ width: "600px", borderRadius: "8px" }}>
          <DateRangePicker
            slots={{ field: SingleInputDateRangeField }}
            slotProps={{
              field: {
                sx: {
                  width: "100%",
                  height: "100%",
                  "& .MuiInputBase-root": {
                    height: "100%",
                    borderRadius: "8px",
                  },
                },
              },
            }}
          />
        </Box>
      </DemoContainer>
    </LocalizationProvider>
  );
}
