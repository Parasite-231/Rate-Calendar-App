import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
import {
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { message } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchRateCalendar } from "../api/fetchRateCalendar";
import "../styles/TableDesign.css";
import { IRoomCategory } from "../types/interfaces";
import DateRangePicker from "./DateRangePicker";
import RoomCategorySection from "./RoomCategorySection";
import DataFetchingErrorLayout from "./common/error/DataFetchingErrorLayout";
import AppTitle from "./common/header/AppTitle";
import ScreenLoaderLayout from "./common/loader/ScreenLoaderLayout";

const RateCalendarLayout: React.FC = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(2, "month"));
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (startDate.isAfter(endDate)) {
      setOpenDialog(true);
    }
  }, [startDate, endDate]);

  const handleClose = () => {
    setOpenDialog(false);
  };

  const { data, isLoading, error } = useQuery<IRoomCategory[]>(
    ["rateCalendar", startDate, endDate],
    () =>
      fetchRateCalendar(
        startDate.format("YYYY-MM-DD"),
        endDate.format("YYYY-MM-DD")
      ),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: !startDate.isAfter(endDate),

      onSuccess: () => {
        message.success(
          `Room Calendar Fetched Successfully for ${startDate.format(
            "YYYY-MM-DD"
          )} to ${endDate.format("YYYY-MM-DD")}`
        );
      },

      onError: (error: unknown) => {
        let errorMessage = "An unexpected error occurred";
        if (error instanceof Error) {
          errorMessage = `Error: ${error.message}`;
        } else if (typeof error === "string") {
          errorMessage = `Error: ${error}`;
        }
        message.error(errorMessage);
      },
    }
  );

  if (isLoading) return <ScreenLoaderLayout loaderMessage="Loading data..." />;

  if (error) return <DataFetchingErrorLayout />;

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          <span>{"Invalid Date Range"}</span>
          <ErrorSharpIcon color="warning" style={{ marginLeft: "7px" }} />
        </DialogTitle>
        <DialogContent>
          <Typography>Start date cannot be greater than end date.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>
      <Container maxWidth={false} sx={{ minHeight: "100vh" }}>
        <Card
          sx={{ maxWidth: "100%", margin: "30px", borderRadius: "14px" }}
          variant="outlined"
        >
          <CardContent>
            <AppTitle />
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
            />
          </CardContent>
        </Card>
        <Card
          sx={{ maxWidth: "100%", margin: "30px", borderRadius: "14px" }}
          variant="outlined"
        >
          <CardContent>
            <div className="table-container" style={{ overflowX: "auto" }}>
              <table
                className="custom-table"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                {data && <RoomCategorySection categories={data} />}
              </table>
            </div>
          </CardContent>
        </Card>
        <br />
      </Container>
      
    </>
  );
};

export default RateCalendarLayout;
