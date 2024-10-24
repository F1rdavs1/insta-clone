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

export interface PostOwner {
  username: string;
  photo?: string;
}

export interface PostContent {
  type: string;
  url: string;
}

export interface Post {
  owner: PostOwner;
  createdAt: string;
  content_alt: string;
  content: PostContent[];
  caption: string;
  location?: string;
}

export interface Follower {
  username: string;
}