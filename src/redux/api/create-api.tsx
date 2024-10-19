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
    getPosts: build.query({
      query: (params) => ({
        url: "/api/user/feed?limit=100",
        params,
      }),
      providesTags: [],
    }),
  }),
});

export const {
  useUploadFileMutation,
  useCreatePostMutation,
  useGetPostsQuery,
} = fileApi;
