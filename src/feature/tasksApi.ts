import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/" }),
  tagTypes: ["Task"],

  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ page = 1, status, priority, sortBy }) => {
        let query = `tasks?_page=${page}&_limit=13`;

        if (status) query += `&status=${status}`;
        if (priority) query += `&priority=${priority}`;
        if (sortBy) query += `&_sort=${sortBy}&_order=desc`;

        return query;
      },
    }),
    addTask: builder.mutation({
      query: (task) => ({
        url: "tasks",
        method: "POST",
        body: task,
      }),
    }),
    updateTask: builder.mutation({
      query: (task) => ({
        url: `tasks/${task.id}`,
        method: "PUT",
        body: task,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = tasksApi;
