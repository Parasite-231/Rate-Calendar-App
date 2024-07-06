// components/RateCalendarLayout.tsx
import React from "react";
import { useFetchCalendarData } from "../hooks/fetchCalendarData";
import { IDates } from "../types/interfaces"; 



const RateCalendarLayout: React.FC<Props> = () => {
      const onSuccess = (data) => {
        console.log("success", data);
      };

      const onError = (error) => {
        console.log("error", error);
      };
  const dates: IDates = { startDate: "2023-04-22", endDate: "2023-08-30" };
  const { data, error, isLoading, isError, isFetching } =
    useFetchCalendarData(dates,onSuccess,
    onError,);

  if (isLoading) {
    return <h2>Loading...</h2>;
  }
  if (isError) {
    return <h2>{error?.message}</h2>; 
  }
  if (isFetching) {
    return <h2>Fetching data....</h2>;
  }

    return (
      
    <div>
      {/* {data && (
        <div>
          {Object.entries(data).map(([key, value]) => (
            <p key={key}>
              {key}:{" "}
              {Array.isArray(value) ? value.join(", ") : value.toString()}
            </p>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default RateCalendarLayout;
