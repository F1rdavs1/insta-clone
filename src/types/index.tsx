export interface CounterState {
  value: number;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
}

export interface Register {
  full_name: string;
  username: string;
  email: string;
  password: string;
  photo: string | null;
}
