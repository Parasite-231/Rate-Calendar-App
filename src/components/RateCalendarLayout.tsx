
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DateRangePicker from "./input/DateRangePicker";

export default function RateCalendarLayout() {
  return (
    <>
      <Container
        maxWidth="false"
        // sx={{
        //   height: "100vh",
        // //   display: "flex",
        // //   flexDirection: "column",
        //   bgcolor: "#e5ffff",
        // }}
      >
        <Card sx={{ maxWidth: "100%", margin: "30px", borderRadius:"14px" }} variant="outlined">
          <CardContent>
            {/* <Typography variant="h5" component="div">
              Rate Calendar
            </Typography> */}
                      <h4 style={{fontWeight:"bold"}}>Rate Calendar</h4>
            <DateRangePicker />
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
