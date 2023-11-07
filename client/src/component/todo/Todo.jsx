import React, { useMemo, useState } from "react";
import "../../index.css";
import getRequest, { postRequest, deleteRequest, patchRequest } from "../../api/apiCall";

const Todo = () => {
  const [getTodo, setGetTodo] = useState(null);
  const [getTitle, setGetTitle] = useState(null);
  const [getDescription, setDescription] = useState(null);
  const [check, setCheck] = useState(false);
  const [checkedValue, setCheckedValue] = useState(false);
  const [id, setId] = useState(null);

  useMemo(() => {
    (async () => {
      const response = await getRequest("todos");
      setGetTodo(response.data.data);
    })();
    setCheck(false);
  }, [check]);

  const handleSubmitFormData = async (e) => {
    e.preventDefault();
    if (id) {
      await patchRequest(`todos/${id}`, {
        title: getTitle,
        description: getDescription,
      });
      setId("");
    } else {
      const data = {
        title: getTitle,
        description: getDescription,
      };
      await postRequest("todos", data);
    }
    setGetTitle("");
    setDescription("");
    setCheck(true);
  };

  const handleRemoveItem = async (value) => {
    await deleteRequest("todos", value);
    setCheck(true);
  };

  const handleCheckboxStatus = async (value) => {
    const response = await patchRequest("todos/toggle/status", value);
    response.status === 200 ? setCheckedValue(true) : setCheckedValue(false);
    setCheck(true);
  };

  const handleSaveItem = async (value, title, description) => {
    setId(value);
    setGetTitle(title);
    setDescription(description);
  };

  return (
    <>
      <div>
        <label htmlFor="searchbox">
          search
          <input type="search" name="" id="" placeholder="enter your search" />
        </label>
        <form onSubmit={handleSubmitFormData} className="form-box mt-2">
          <input type="text" value={getTitle || ""} placeholder="enter your text" onChange={(e) => setGetTitle(e.target.value)} />
          <br />
          <textarea value={getDescription || ""} className="textare-box mt-2" placeholder="enter your description" onChange={(e) => setDescription(e.target.value)}></textarea>
          <br />
          <button type="submit">click</button>
        </form>
      </div>
      <ul>
        {getTodo?.map(({ title, description, isComplete, _id }, i) => (
          <li key={i}>
            <input type="checkbox" checked={checkedValue} onChange={() => handleCheckboxStatus(_id)} />
            <span>
              <b>Title:</b> {title}
            </span>
            <span>
              <b>Description:</b> {description}
            </span>
            <span>
              <b>status</b> {isComplete ? "success" : "pending"}
            </span>
            <button onClick={() => handleSaveItem(_id, title, description)}>save</button>
            <button onClick={() => handleRemoveItem(_id)}>remove</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
