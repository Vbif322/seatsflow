export type UserInfo = {
  id?: "string";
  sub_expiry?: "string";
  subscription?: "string";
  userType?: "string";
  username?: "string";
};

export type hall = {
  hall_id: "string";
  name: "string";
  tables: table[];
};

export type table = {
  capacity: number;
  name: "string";
  profile: profile;
  profile_index: number;
  table_id: "string";
};

export type booking = {
  booking_id: string;
  creator: string;
  hall_id: string;
  hall_name: string;
  start_time: string;
  table_id: string;
  table_name: string;
  visitor_amount: number;
  visitor_comment: string;
  visitor_name: string;
  visitor_phone: string;
};

export type profile = {
  name?: string;
  booking_time?: number | string;
  cleaning_time?: number | string;
  hold_time?: number | string;
  main?: boolean;
  waiting_time?: number | string;
  profile_index?: number;
};

export type restaurant = {
  halls?: hall[];
  name?: string;
  profiles?: profile[];
  restaurant_id?: string;
  time_table?: object | false;
};

export type order = {
  creator: string;
  order_id: string;
  start_time: string;
  user_id: string;
  visitor_amount: number | string;
  visitor_comment: number | string;
  visitor_name: number | string;
  visitor_phone: number | string;
};
