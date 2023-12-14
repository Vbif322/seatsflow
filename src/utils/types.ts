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

export type profile = {
  booking_time: number;
  cleaning_time: number;
  hold_time: number;
  main: boolean;
  waiting_time: number;
};

export type ChosenRest = {
  halls?: hall[];
  name?: "string";
  profiles?: profile[];
  restaurant_id?: "string";
};
