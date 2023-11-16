import { api } from "./Baseurl"

// import { api } from "../app/service/api"

const loginApi = api.injectEndpoints({
    endpoints: builder => ({
        checkLogin: builder.mutation({
            query: (data) => ({
                url: '/login',
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Crud']
        }),
    })
})

export const {useCheckLoginMutation}=loginApi