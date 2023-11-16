import { api } from "../store/Baseurl";

let token = localStorage.getItem("token");

const registerApi = api.injectEndpoints({
  endpoints: (builder) => ({
  displayData: builder.query({
    query:() => ({url: "register/"}),    
    providesTags: ['Crud']
  }),
 
    createRegister: builder.mutation({
      query: (data) => ({
        url: '/register',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Crud'],
    }),
    updateRegister: builder.mutation({
      query: (body) => ({
        headers: {
          Authorization: `Bearer ${token}`
        },
        url: "/register/editUser",
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Crud'],
     }),
    // editRegister: builder.mutation({
    //   query: ({ id, ...body }) => ({
    //     headers: {
    //       Authorisation: `Bearer ${token}`
    //     },
    //     url: `/register/update/${id}`,
    //     method: 'POST',
    //     body,
    //   }),
    //   invalidatesTags: ['Crud'],
    // }),
    editRegister: builder.mutation({
      query: ({ id, ...body }) => ({
        headers: {
          Authorization: `Bearer ${token}`
        },
        url: `/register/update/${id}`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Crud'],
    }),

    
    deleteRegister: builder.mutation({
      query: (body) => ({
        url: '/register/delete',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['Crud'],
    }),
  }),
  getAllUsers: builder.query({
    query: () => ({
      url: "/register/getAllUsers",
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
    providesTags: ['Crud'],
  }),
});

export const {
useCreateRegisterMutation,
useDeleteRegisterMutation,
useEditRegisterMutation,
useUpdateRegisterMutation,
useDisplayDataQuery,
useGetVerifyTokenQuery,
useGetAllUsersQuery, // New endpoint for fetching all users
} = api;
