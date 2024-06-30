import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { fetchRateCalendar } from "../api/fetchRateCalendar";
import { IRoomCategory } from "../types/interfaces";
import DateRangePicker from "./DateRangePicker";
import RoomCategorySection from "./RoomCategorySection";
import AppTitle from "./common/header/AppTitle";
import "../styles/TableDesign.css";
const RateCalendarLayout: React.FC = () => {
  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(2, "month"));


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
      
    }
  );



  if (isLoading)
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <CircularProgress />
      </Box>
    );
  if (error) return <Typography color="error">Error loading data</Typography>;

  return (
    <>
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
                <RoomCategorySection key={category.id} category={category} />
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
