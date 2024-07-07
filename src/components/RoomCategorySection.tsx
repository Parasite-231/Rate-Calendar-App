// src/components/RoomCategorySection.tsx
import { Box, Button } from "@mui/material";
import React from "react";

import { IRoomCategory } from "../types/interfaces";
import occupancyIcon from "/icons/occupancyIcon.svg";
import { useBulkUpdateCategories } from "../api/fetchRateCalendar";

interface RoomCategorySectionProps {
  categories: IRoomCategory[];
}

const formatDate = (
  dateString: string,
  formatOptions: Intl.DateTimeFormatOptions
) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", formatOptions).format(date);
};

const RoomCategorySection: React.FC<RoomCategorySectionProps> = ({
  categories,
}) => {
  const mutation = useBulkUpdateCategories();

  const handleBulkEdit = () => {
    mutation.mutate(categories);
  };

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

  const renderHeader = (category: IRoomCategory, isFirst: boolean) => {
    const groupedDates = groupDatesByMonthYear(
      category.inventory_calendar.map((inv) => inv.date)
    );

    return (
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
        <tr>
          <th className="sticky-cell" style={{ fontSize: "large" }}>
            {isFirst && <h4>{category.name}</h4>}
          </th>
          <td
            colSpan={category.inventory_calendar.length}
            style={{ textAlign: "center" }}
          >
            <Box color="white" textAlign="center">
              <Button
                className="bulk-edit-button"
                variant="contained"
                style={{ position: "sticky", background: "#F68656 " }}
                onClick={handleBulkEdit}
              >
                + BULK EDIT
              </Button>
            </Box>
          </td>
        </tr>
      </thead>
    );
  };

  return (
    <>
      {categories.map((category, index) => (
        <React.Fragment key={category.name}>
          {index > 0 && (
            <thead>
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
                      style={{ position: "sticky", background: "#F68656 " }}
                      onClick={handleBulkEdit}
                    >
                      + BULK EDIT
                    </Button>
                  </Box>
                </td>
              </tr>
            </thead>
          )}
          {index === 0 && renderHeader(category, true)}
          <tbody>
            {index > 0 && (
              <tr>
                <td className="sticky-cell">Room status</td>
                {category.inventory_calendar.map((inventory) => (
                  <td
                    key={inventory.date}
                    style={{
                      textAlign: "right",
                      backgroundColor: inventory.status ? "#2F7D32" : "#D3302F",
                      color: "white",
                    }}
                  >
                    {inventory.status ? "Open" : "Close"}
                  </td>
                ))}
              </tr>
            )}
            {index === 0 && (
              <tr>
                <td className="sticky-cell">Room status</td>
                {category.inventory_calendar.map((inventory) => (
                  <td
                    key={inventory.date}
                    style={{
                      textAlign: "right",
                      backgroundColor: inventory.status ? "#2F7D32" : "#D3302F",
                      color: "white",
                    }}
                  >
                    {inventory.status ? "Open" : "Close"}
                  </td>
                ))}
              </tr>
            )}
            <tr>
              <td className="sticky-cell">Rooms to sell</td>
              {category.inventory_calendar.map((inventory) => (
                <td
                  key={inventory.date}
                  style={{
                    backgroundColor: inventory.status ? "white" : "#EF5350",
                    color: inventory.status ? "black" : "white",
                    textAlign: "right",
                  }}
                >
                  {inventory.available !== undefined &&
                  inventory.available !== null
                    ? inventory.available
                    : "-"}
                </td>
              ))}
            </tr>
            <tr>
              <td className="sticky-cell">Net booked</td>
              {category.inventory_calendar.map((inventory) => (
                <td
                  key={inventory.date}
                  style={{
                    backgroundColor: inventory.status ? "white" : "#EF5350",
                    color: inventory.status ? "black" : "white",
                    textAlign: "right",
                  }}
                >
                  {inventory.booked !== undefined && inventory.booked !== null
                    ? inventory.booked
                    : "-"}
                </td>
              ))}
            </tr>
            {category.rate_plans.map((plan) => (
              <React.Fragment key={plan.id}>
                <tr>
                  <td className="sticky-cell">
                    {plan.name}
                    <div
                      style={{
                        display: "flex",
                        gap: "7px",
                        marginLeft: "12px",
                      }}
                    >
                      <img
                        src={occupancyIcon}
                        width="20px"
                        height="20px"
                        alt="Icon for standard rate plan"
                        loading="lazy"
                      />
                      <span
                        style={{
                          fontSize: "small",
                          color: "#5caef2",
                          padding: "2px",
                          fontWeight: "bolder",
                        }}
                      >
                        ×{" "}
                        {category.occupancy !== undefined &&
                        category.occupancy !== null
                          ? category.occupancy
                          : "-"}
                      </span>
                    </div>
                  </td>
                  {category.inventory_calendar.map((inventory) => {
                    const rateInfo = plan.calendar.find(
                      (c) => c.date === inventory.date
                    );
                    const rateDisplay =
                      rateInfo && rateInfo.rate != null ? rateInfo.rate : "-";
                    return (
                      <td
                        key={inventory.date}
                        style={{
                          backgroundColor: inventory.status
                            ? "white"
                            : "#EF5350",
                          color: inventory.status ? "black" : "white",
                          textAlign: "right",
                        }}
                      >
                        {rateDisplay}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky-cell">Min. length of stay</td>
                  {category.inventory_calendar.map((inventory) => {
                    const rateInfo = plan.calendar.find(
                      (c) => c.date === inventory.date
                    );
                    const minLengthDisplay =
                      rateInfo && rateInfo.min_length_of_stay != null
                        ? rateInfo.min_length_of_stay
                        : "-";
                    return (
                      <td
                        key={inventory.date}
                        style={{
                          backgroundColor: inventory.status
                            ? "white"
                            : "#EF5350",
                          color: inventory.status ? "black" : "white",
                          textAlign: "right",
                        }}
                      >
                        {minLengthDisplay}
                      </td>
                    );
                  })}
                </tr>
                <tr>
                  <td className="sticky-cell">Min. advance reservation</td>
                  {category.inventory_calendar.map((inventory) => {
                    const rateInfo = plan.calendar.find(
                      (c) => c.date === inventory.date
                    );
                    const reservationDeadlineDisplay =
                      rateInfo && rateInfo.reservation_deadline != null
                        ? rateInfo.reservation_deadline
                        : "-";
                    return (
                      <td
                        key={inventory.date}
                        style={{
                          backgroundColor: inventory.status
                            ? "white"
                            : "#EF5350",
                          color: inventory.status ? "black" : "white",
                          textAlign: "right",
                        }}
                      >
                        {reservationDeadlineDisplay}
                      </td>
                    );
                  })}
                </tr>
              </React.Fragment>
            ))}
          </tbody>
        </React.Fragment>
      ))}
    </>
  );
};

export default RoomCategorySection;
