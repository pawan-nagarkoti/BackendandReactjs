import React, { useState } from "react";
import getRequest from "../api/apiCall";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const TodoQuery = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [i, setI] = useState(null);
  const queryClient = useQueryClient();

  // Get todo
  // const userId = false;
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["getTodo"],
    queryFn: () => axios.get("http://localhost:8080/api/v1/todos"),
    // enabled: !!userId,
  });

  // getSingleTodo

  // Delete todo
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`http://localhost:8080/api/v1/todos/${id}`),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getTodo"] });
    },
  });

  // Post todo
  const postMutation = useMutation({
    mutationFn: (data) =>
      axios.post(`http://localhost:8080/api/v1/todos`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),

    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getTodo"] });
    },
  });

  // edit todo
  const editMutation = useMutation({
    mutationFn: ({ id, data }) => axios.patch(`http://localhost:8080/api/v1/todos/${id}`, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["getTodo"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (i) {
      const data = {
        title,
        description,
      };
      editMutation.mutate({ id: i, data });
    } else {
      const data = {
        title,
        description,
      };
      postMutation.mutate(data);
    }
    setTitle("");
    setDescription("");
    setI("");
  };

  const handleEdit = (t, d, ids) => {
    setTitle(t);
    setDescription(d);
    setI(ids);
  };

  if (isLoading) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="enter title" value={title || ""} onChange={(e) => setTitle(e.target.value)} />
        <input type="text" placeholder="enter description..." value={description || ""} onChange={(e) => setDescription(e.target.value)} />
        <button type="submit">submit</button>
      </form>
      {data?.data.data.length > 0 ? (
        data.data.data.map(({ title, description, _id }, i) => (
          <div key={i}>
            <p>title: {title}</p>
            <p>description: {description}</p>
            <button onClick={() => handleEdit(title, description, _id)}>edit</button>
            <button
              onClick={() => {
                deleteMutation.mutate(_id);
              }}
            >
              delete
            </button>
          </div>
        ))
      ) : (
        <h1>Please add todo!</h1>
      )}
    </>
  );
};

export default TodoQuery;
