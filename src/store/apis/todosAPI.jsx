import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const todosApi = createApi({

    reducerPath: 'todos',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: () => '/todos',
        }),
        getTodo: builder.query({
            query: (todoId) => `/todos/${todoId}`,
        }),
    }),
})

// Export hooks for usage in functional components, which are
export const { useGetTodosQuery, useGetTodoQuery } = todosApi;