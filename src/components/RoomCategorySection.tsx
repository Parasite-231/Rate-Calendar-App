import { Box, Button } from "@mui/material";
import React from "react";
import "../styles/TableDesign.css";
import { IRoomCategory } from "../types/interfaces";

interface RoomCategorySectionProps {
  category: IRoomCategory;
}

const formatDate = (
  dateString: string,
  formatOptions: Intl.DateTimeFormatOptions
) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
};

const RoomCategorySection: React.FC<RoomCategorySectionProps> = ({
  category,
}) => {
  const groupDatesByMonthYear = (dates: string[]) => {
    const grouped: { [key: string]: string[] } = {};
    dates.forEach((date) => {
      const monthYear = formatDate(date, { month: "short", year: "numeric" });
      if (!grouped[monthYear]) {
        grouped[monthYear] = [];
      }
      grouped[monthYear].push(date);
    });
    return grouped;
  };

  const groupedDates = groupDatesByMonthYear(
    category.inventory_calendar.map((inv) => inv.date)
  );

  return (
    <>
      <div className="table-container" style={{ overflowX: "auto" }}>
        <table
          className="custom-table"
          style={{ width: "100%", borderCollapse: "collapse" }}
        >
          <thead>
            <tr>
              <th className="sticky-cell" style={{ borderBottom: "none" }}></th>
              {Object.keys(groupedDates).map((monthYear) => (
                <th
                  key={monthYear}
                  colSpan={groupedDates[monthYear].length}
                  style={{ textAlign: "left", fontSize: "small" }}
                >
                  {monthYear}
                </th>
              ))}
            </tr>
            <tr>
              <th className="sticky-cell" style={{ borderTop: "none" }}></th>
              {category.inventory_calendar.map((inventory) => (
                <td
                  key={inventory.date}
                  align="center"
                  style={{ textAlign: "right" }}
                >
                  {formatDate(inventory.date, { weekday: "short" })}
                  <br />
                  {formatDate(inventory.date, { day: "2-digit" })}
                </td>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="sticky-cell" style={{ fontSize: "large" }}>
                <h4>{category.name}</h4>
              </th>
              <td
                colSpan={category.inventory_calendar.length}
                style={{ textAlign: "center" }}
              >
                <Box color="white" textAlign="center">
                  <Button
                    className="bulk-edit-button"
                    variant="contained"
                    style={{ position: "sticky", background: "#FF5733 " }}
                  >
                    + BULK EDIT
                  </Button>
                </Box>
              </td>
            </tr>
            <tr>
              <td className="sticky-cell">Room status</td>
              {category.inventory_calendar.map((inventory) => (
                <td
                  key={inventory.date}
                  style={{
                    textAlign: "right",
                    backgroundColor: inventory.status ? "green" : "red",
                    color: "white",
                  }}
                >
                  {inventory.status ? "Open" : "Close"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky-cell">Rooms to sell</td>
              {category.inventory_calendar.map((inventory) => (
                <td key={inventory.date} style={{ textAlign: "right" }}>
                  {inventory.available}
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky-cell">Net booked</td>
              {category.inventory_calendar.map((inventory) => (
                <td key={inventory.date} style={{ textAlign: "right" }}>
                  {inventory.booked}
                </td>
              ))}
            </tr>
            {category.rate_plans.map((plan) => (
              <React.Fragment key={plan.id}>
                <tr>
                  <td className="sticky-cell">{plan.name}</td>
                  {plan.calendar.map((cal) => (
                    <td key={cal.id} style={{ textAlign: "right" }}>
                      {cal.rate}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky-cell">Min. length of stay</td>
                  {plan.calendar.map((cal) => (
                    <td key={cal.id} style={{ textAlign: "right" }}>
                      {cal.min_length_of_stay ?? "N/A"}
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="sticky-cell">Min. advance reservation</td>
                  {plan.calendar.map((cal) => (
                    <td key={cal.id} style={{ textAlign: "right" }}>
                      {cal.reservation_deadline ?? ""}
                    </td>
                  ))}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default RoomCategorySection;