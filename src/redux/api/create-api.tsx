import { api } from "./index";

export const fileApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFile: build.mutation({
      query: (body) => ({
        url: "/api/upload/files",
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
      invalidatesTags: [],
    }),
    getUserName: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
      providesTags: [{ type: "User" }],
    }),
    getPosts: build.query({
      query: (params) => ({
        url: "/api/user/feed?limit=3000",
        params,
      }),
      providesTags: [],
    }),
    getAllUserPosts: build.query({
      query: (username) => ({
        url: `/api/post/${username}`,
      }),
      providesTags: [{ type: "User" }],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useCreatePostMutation,
  useGetPostsQuery,
  useGetUserNameQuery,
  useGetAllUserPostsQuery,
} = fileApi;
