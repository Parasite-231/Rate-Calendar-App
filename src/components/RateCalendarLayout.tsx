import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import ErrorSharpIcon from "@mui/icons-material/ErrorSharp";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { fetchRateCalendar } from "../api/fetchRateCalendar";
import { IRoomCategory } from "../types/interfaces";
import DateRangePicker from "./DateRangePicker";
import RoomCategorySection from "./RoomCategorySection";
import AppTitle from "./common/header/AppTitle";
import "../styles/TableDesign.css";
import { message } from "antd";
import ScreenLoaderLayout from "./common/loader/ScreenLoaderLayout";
import DataFetchingErrorLayout from "./common/error/DataFetchingErrorLayout";

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
          `Data shown from ${startDate.format(
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

  if (isLoading)
    return (
      
      <ScreenLoaderLayout loaderMessage="Loading data..." />
    );

  if (error) return <DataFetchingErrorLayout />;

  return (
    <>
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle>
          {"Invalid Date Range"}
          <ErrorSharpIcon color="warning" />
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
                {data &&
                  data.map((category) => (
                    <RoomCategorySection
                      key={category.id}
                      category={category}
                    />
                  ))}
              </table>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default RateCalendarLayout;
