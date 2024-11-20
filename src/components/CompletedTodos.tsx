import axios from "axios";
import React, { FC, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

import API_KEY from "./api/api_key";
import Loader from "./Loader";

interface MyTodosProps {
  userId: string;
}

interface Todo {
  id: string;
  userId: string;
  todoTitle: string;
  todoDescription: string;
  priority: "low" | "medium" | "high";
  isCompleted: string | undefined; // Allowing isCompleted to be undefined or a string
}

const CompletedTodos: FC<MyTodosProps> = ({ userId }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("");
  const [filteredTodoList, setFilteredTodoList] = useState<Todo[]>([]);

  const getTodoData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_KEY}/todos`);
      if (response.status === 200) {
        const filteredTodos = response.data.filter(
          (eachTodo: Todo) =>
            eachTodo.userId === userId &&
            (eachTodo.isCompleted === "completed" ||
              eachTodo.hasOwnProperty("isCompleted"))
        );
        setTodos(filteredTodos);
      } else {
        throw new Error("Tasks Not Fetched");
      }
    } catch (error) {
      setErrorMsg("Failed to fetch Tasks. Please try again.");
    } finally {
      setLoading(false);
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
          todo.todoTitle.toLowerCase().includes(search.toLowerCase()) ||
          todo.todoDescription.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredTodoList(filtered);
  }, [todos, priorityFilter, search]);

  return (
    <>
      <div className="row mb-3">
        <div className="col-sm-7">
          <h5>
            Completed Tasks
            <span className="badge text-bg-dark">{todos.length}</span>
          </h5>
        </div>

        <div className="col-sm-2">
          <select
            className="form-select"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setPriorityFilter(e.target.value)
            }
            value={priorityFilter} // Ensuring value reflects state
          >
            <option value="">Select Priority</option>
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
          {filteredTodoList.map((eachTodo) => (
            <Col xs={12} md={4} lg={3} key={eachTodo.id}>
              <Card bg="secondary" text="light" className="mb-2">
                <Card.Header>
                  {eachTodo.todoTitle}
                  <span
                    className={`bagde ${
                      eachTodo.priority === "low"
                        ? "bg-success"
                        : eachTodo.priority === "medium"
                          ? "bg-warning"
                          : "bg-danger"
                    } color-span`}
                  ></span>
                </Card.Header>
                <Card.Body>
                  <Card.Text className="text-dark">
                    {eachTodo.todoDescription}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p>No Tasks to Display</p>
      )}
      {successMsg && <p className="success text-center">{successMsg}</p>}
      {errorMsg && <p className="error text-center">{errorMsg}</p>}
    </>
  );
};

export default CompletedTodos;
