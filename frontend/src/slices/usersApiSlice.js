import { USERS_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        register: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}`,
                method: 'POST',
                body: data
            })
        }),
        updateProfile: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getUsers: builder.query({
            query: () => ({
                url: `${USERS_URL}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Users']
        }),
        getUser: builder.query({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Users']
        }),
        logout: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/logout`,
                method: 'POST',
            })
        }),
        deleteUser: builder.mutation({
            query: (userId) => ({
                url: `${USERS_URL}/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Users'],
        }),
        editUser: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/${data.id}`,
                method: 'PUT',
                body: data
            }),
            invalidatesTags: ['Users']
        })
    })
});

export const { useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useUpdateProfileMutation,
    useGetUsersQuery,
    useDeleteUserMutation,
    useEditUserMutation,
    useGetUserQuery,
} = usersApiSlice;