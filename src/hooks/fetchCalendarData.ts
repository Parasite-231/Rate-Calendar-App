// hooks/fetchCalendarData.ts
import axios from "axios";
import { useQuery, } from "react-query";
import { IDates } from "../types/interfaces"; // Adjust the path as per your project structure

const fetchDataByDate = async ({ queryKey }): Promise<IDates> => {
    const startDate = queryKey[1];
     const endDate = queryKey[2];
  const response = await axios.get(
    `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment?start_date=${startDate}&end_date=${endDate}`
  );
  return response.data;
};

export const useFetchCalendarData = (
  { startDate, endDate }: IDates,
  onSuccess?: (data: any) => void,
  onError?: (error: any) => void
) => {
  return useQuery(["fetchByID", startDate, endDate], fetchDataByDate, {
    onSuccess,
    onError,
    cacheTime: 5000,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    
  });
};
