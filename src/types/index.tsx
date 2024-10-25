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
export interface CreatePostContent {
  content: [
    {
      url: string;
      type: "AUDIO" | "VIDEO" | "IMAGE";
    },
    {
      url: string;
      type: "AUDIO" | "VIDEO" | "IMAGE";
    }
  ];
}

export interface Post {
  _id: number;
  owner: PostOwner;
  createdAt: string;
  content_alt: string;
  content: PostContent[];
  caption: string;
  location?: string;
  likes?: number[];
  comments?: Comment[];
  shares_count?: number;
}

export interface Follower {
  username: string;
}
export const imageFileTypes = [
  ".png",
  ".jpeg",
  ".jpg",
  ".gif",
  ".bmp",
  ".webp",
  ".tiff",
  ".svg",
];