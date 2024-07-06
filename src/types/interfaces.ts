
export interface IRoomInventoryCalendar {
  id: string;
  date: string;
  available: number;
  status: boolean;
  booked: number;
}

export interface IRatePlan {
  id: number;
  name: string;
  calendar: IRateCalendar[];
}

export interface IRateCalendar {
  id: string;
  date: string;
  rate: number;
  min_length_of_stay: number;
  reservation_deadline: number;
}

export interface IRoomCategory {
  id: string;
  name: string;
  occupancy: number;
  inventory_calendar: IRoomInventoryCalendar[];
  rate_plans: IRatePlan[];
}


export interface IDates { 
  startDate?: string;
    endDate ? : string
}