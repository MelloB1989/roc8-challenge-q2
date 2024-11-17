export interface Users {
  email: string;
  password: string;
  name: string;
}

export interface Filters {
  age: number;
  gender: number;
  date_start: string;
  date_end: string;
}

export interface Data {
  rid: string;
  timestamp: string;
  age: number;
  gender: number;
  feature_a: number;
  feature_b: number;
  feature_c: number;
  feature_d: number;
  feature_e: number;
  feature_f: number;
}

export interface Views {
  vid: string;
  filters: {
    ageFilter: null | number;
    dateFilter: null | string;
    genderFilter: null | number;
  };
  created_by: string;
  created_at: string;
}
