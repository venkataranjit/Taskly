import axios from "axios";
import React, { FC, useState } from "react";
import { Col, Row } from "react-bootstrap";

import API_KEY from "./api/api_key";
import Loader from "./Loader";
import Cards from "./Cards";

interface MyTodosProps {
  userId: string;
}
interface Todo {
  id: string;
  userId: string;
  todoTitle: string;
  todoDescription: string;
  priority: "low" | "medium" | "high";
}

const MyTodos: FC<MyTodosProps> = ({ userId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [editTodoId, setEditTodoId] = useState<string | null>(null);
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);

  const getTodoData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_KEY}/todos`);
      if (response.status === 200) {
        const filteredTodos = response.data.filter(
          (eachTodo: Todo) => eachTodo.userId === userId
        );
        setTodos(filteredTodos);
      } else {
        throw new Error("Todos Not Fetched");
      }
    } catch (error) {
      setErrorMsg("Failed to fetch todos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const todoDeleteHandler = async (id: string) => {
    try {
      setLoading(true);
      const response = await axios.delete(`${API_KEY}/todos/${id}`);
      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.filter((todo: Todo) => todo.id !== id)
        );
        setSuccessMsg("Todo Deleted Succesfully");
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      } else {
        throw new Error("Todo Not Deleted");
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  const editHandler = async (id: string) => {
    setEditTodoId(id);
  };

  const saveHandler = async (updatedTodo: Todo) => {
    try {
      const response = await axios.put(
        `${API_KEY}/todos/${updatedTodo.id}`,
        updatedTodo
      );
      if (response.status === 200) {
        setTodos((prevTodos) =>
          prevTodos.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo
          )
        );
        setSuccessMsg("Todo Updated Successfully");
        setTimeout(() => setSuccessMsg(""), 3000);
        setEditTodoId(null); // Exit editing mode
      } else {
        throw new Error("Todo Not Updated");
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  React.useEffect(() => {
    getTodoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    let filtered = todos;

    if (priorityFilter) {
      filtered = filtered.filter((todo) => todo.priority === priorityFilter);
    }

    if (search) {
      filtered = filtered.filter(
        (todo) =>
          todo.todoTitle.toLowerCase().includes(search.toLocaleLowerCase()) ||
          todo.todoDescription
            .toLowerCase()
            .includes(search.toLocaleLowerCase())
      );
    }
    setFilteredTodoList(filtered);
  }, [todos, priorityFilter, search]);

  return (
    <>
      <div className="row mb-3">
        <div className="col-sm-7">
          <h5>
            MyTodos <span className="badge text-bg-dark">{todos.length}</span>
          </h5>
        </div>

        <div className="col-sm-2">
          <select
            className="form-select"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPriorityFilter(e.target.value)
            }
            defaultValue=""
          >
            <option value="" disabled>
              Select Priority
            </option>
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      {loading && <Loader />}
      {filteredTodoList.length > 0 ? (
        <Row>
          {filteredTodoList.map((eachTodo) => {
            return (
              <Col xs={12} md={4} lg={3} key={eachTodo.id}>
                <Cards
                  eachTodo={eachTodo}
                  todoDeleteHandler={todoDeleteHandler}
                  editHandler={editHandler}
                  saveHandler={saveHandler}
                  isEditing={editTodoId === eachTodo.id}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>Please Add a Todo to View Here</p>
      )}
      {successMsg && <p className="success text-center">{successMsg}</p>}
      {errorMsg && <p className="error text-center">{errorMsg}</p>}
    </>
  );
};

export default MyTodos;
