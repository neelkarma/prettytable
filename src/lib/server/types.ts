export interface APIPeriod {
  title: string;
  room?: string;
}
export interface APIDay {
  routine: string;
  periods: {
    [key: string]: APIPeriod;
  };
}
export interface APIResponse {
  days: {
    [key: string]: APIDay;
  };
}
