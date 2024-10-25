import { api } from "./index";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    login: build.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getAllUsers: build.query({
      query: () => ({
        url: "/api/user/all?limit=300",
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getUser: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
      providesTags: ["User"],
    }),
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/follow/${username}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    unfollow: build.mutation({
      query: (username) => ({
        url: `/api/user/unfollow/${username}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getFollowUsers: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
      providesTags: [{ type: "User" }],
    }),
    likePost: build.mutation({
      query: (postID) => ({
        url: `/api/post/${postID}/like`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    postComment: build.mutation({
      query: (data) => ({
        url: `/api/comment/${data.postId}`,
        method: "POST",
        body: data.body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getUserDatas: build.query({
      query:() => ({
        url: '/api/user/profile',
      })
    }),
    updateUserData: build.mutation({
      query:(body) => ({
        url:'/api/user/profile',
        method: "PUT",
        body
      }),
    }),
    getAllCommentByPostId: build.query({
      query: (postID) => ({
        url:`/api/comment/post/${postID}`
      }),
      providesTags: [{type: 'User'}],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetAllUsersQuery,
  useGetUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetFollowUsersQuery,
  useLikePostMutation,
  usePostCommentMutation,
  useUpdateUserDataMutation,
  useGetAllCommentByPostIdQuery,
  useGetUserDatasQuery

} = userApi;
