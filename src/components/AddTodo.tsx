import axios from "axios";
import React, { FC, useContext, useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import { TodoContext } from "./context/TodoContext";
import { UserContext } from "./context/UserContext";
import API_KEY from "./api/api_key";

const initialTodo = {
  todoTitle: "",
  todoDescription: "",
  priority: "",
};
const AddTodo: FC = () => {
  const todocontext = useContext(TodoContext);
  if (!todocontext) {
    throw new Error("TodoContext must be used within a RegisterProvider");
  }

  const { state: todoState, dispatch: todoDispatch } = todocontext;

  const usercontext = useContext(UserContext);
  if (!usercontext) {
    throw new Error("UserContext must be used within a RegisterProvider");
  }

  const { state: userState } = usercontext;

  const [addTodo, setAddTodo] = useState(initialTodo);
  const [submitted, setSubmitted] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const addTodoHandler = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setAddTodo({ ...addTodo, [name]: value });
  };

  const errorHandling = (): boolean => {
    if (
      addTodo.todoTitle === "" ||
      addTodo.todoDescription === "" ||
      addTodo.priority === ""
    ) {
      setErrorMsg("Please Fill All the Feilds");
      return false;
    } else {
      setErrorMsg("");
      return true;
    }
  };

  const addTodoSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = errorHandling();
    if (isValid) {
      todoDispatch({
        type: "ADD_TODO",
        payload: addTodo,
      });
      setSubmitted(true);
      setAddTodo(initialTodo);
      setSuccessMsg("Task Created Succesfully");
      setTimeout(() => {
        setSuccessMsg("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (submitted) {
      axios
        .post(`${API_KEY}/todos`, {
          id: String(Date.now()),
          userId: userState.login.id,
          ...todoState.addTodo,
          createdAt: Date.now(),
          updatedAt: "",
        })
        .then((response) => {
          console.log("Todo Created successfully:", response.data);
        })
        .catch((error) => {
          console.error("Error submitting data:", error);
        })
        .finally(() => setSubmitted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted, todoState.addTodo]);

  return (
    <>
      
      <div className="row addtodo">
        <div className="col-sm-4 offset-sm-4">
        <h5>Add Task</h5>
          <form onSubmit={addTodoSubmitHandler}>
            <Card bg="light">
              <div className="mb-3">
                <label htmlFor="todoTitle" className="form-label">
                  Todo Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="todoTitle"
                  placeholder="Todo Title"
                  name="todoTitle"
                  value={addTodo.todoTitle}
                  onChange={addTodoHandler}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="todoDesc" className="form-label">
                  Todo Description
                </label>
                <textarea
                  className="form-control"
                  id="todoDesc"
                  rows={3}
                  name="todoDescription"
                  value={addTodo.todoDescription}
                  onChange={addTodoHandler}
                ></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="todopriority" className="form-label">
                  Priority
                </label>
                <select
                  className="form-select"
                  aria-label="todopriority"
                  name="priority"
                  onChange={addTodoHandler}
                  value={addTodo.priority}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div className="d-grid gap-2">
                <button className="btn btn-dark btn-sm" type="submit">
                  Submit
                </button>
              </div>
              {errorMsg && <p className="error text-center">{errorMsg}</p>}
              {successMsg && (
                <p className="success text-center">{successMsg}</p>
              )}
            </Card>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddTodo;
