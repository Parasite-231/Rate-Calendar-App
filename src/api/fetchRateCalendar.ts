// import axios from "axios";
// import { useQuery } from "react-query";
// import { Dayjs } from "dayjs";
// import { IRoomCategory } from "../types/interfaces";

// // Function to fetch the rate calendar data
// export const fetchRateCalendar = async (
//   startDate: string,
//   endDate: string
// ): Promise<IRoomCategory[]> => {
//   const { data } = await axios.get(
//     `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment`,
//     {
//       params: { start_date: startDate, end_date: endDate },
//     }
//   );
//   return data.data;
// };

// export const useFetchRateCalendar = ({
//   startDate,
//   endDate,
//   onSuccess,
//   onError,
// }: {
//   startDate: Dayjs;
//   endDate: Dayjs;
//   onSuccess?: () => void;
//   onError?: (error: unknown) => void;
// }) => {
//   return useQuery<IRoomCategory[]>(
//     ["rateCalendar", startDate, endDate],
//     () =>
//       fetchRateCalendar(
//         startDate.format("YYYY-MM-DD"),
//         endDate.format("YYYY-MM-DD")
//       ),
//     {
//       keepPreviousData: true,
//       refetchOnWindowFocus: false,
//       enabled: !startDate.isAfter(endDate),
//       onSuccess,
//       onError,
//     }
//   );
// };

import axios from "axios";
import { Dayjs } from "dayjs";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { IRoomCategory } from "../types/interfaces";

const fetchRateCalendar = async (
  startDate: string,
  endDate: string
): Promise<IRoomCategory[]> => {
  try {
    const { data } = await axios.get(
      `https://api.bytebeds.com/api/v1/property/1/room/rate-calendar/assessment`,
      {
        params: { start_date: startDate, end_date: endDate },
      }
    );

    if (data.code === "Succeed") {
      return data.data;
    } else {
      throw new Error("Unexpected response");
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw { status: error.response.status, message: error.message };
    } else {
      throw { status: 500, message: "Unknown error" };
    }
  }
};


export const bulkUpdateCategories = async (categories: IRoomCategory[]) => {
  const response = await axios.post(``, categories);
  return response.data;
};


export const useFetchRateCalendar = ({
  startDate,
  endDate,
  onSuccess,
  onError,
}: {
  startDate: Dayjs;
  endDate: Dayjs;
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useQuery<IRoomCategory[]>(
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
      onSuccess,
      onError,
    }
  );
};


export const useBulkUpdateCategories = () => {
  const queryClient = useQueryClient();

  return useMutation(bulkUpdateCategories, {
    onSuccess: () => {
    
      queryClient.invalidateQueries("categories");
    },
    onError: (error) => {
      console.error("Bulk update failed:", error);
    },
  });
};