import { useState } from "react";
import RateCalendarLayout from "./RateCalendarLayout";

const DateRangePicker: React.FC<> = () => {

    const [startDate, setStartDate] = useState<string | null | Date>("")
    const [endDate, setEndDate] = useState<string | null | Date>("");

 const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
  if (event.target.name === "startDate") {
    setStartDate(String(startDate));
     }
     else setEndDate(String(endDate))
};

    
    
    return (
      <>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleChange}
        />
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleChange}
            />
            <RateCalendarLayout />
      </>
    );
}
 
export default DateRangePicker;