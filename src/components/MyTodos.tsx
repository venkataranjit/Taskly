import axios from "axios";
import React, { FC, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import API_KEY from "./api/api_key";

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

  const getTodoData = async () => {
    try {
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
      console.log("Todos Not Fetched :", error);
    }
  };

  React.useEffect(() => {
    getTodoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log(todos);
  }, []);
  return (
    <>
      <h5>MyTodos</h5>
      {todos.length > 0 ? (
        <Row>
          {todos.map((eachTodo) => {
            return (
              <Col xs={12} md={4} lg={3} key={eachTodo.id}>
                <Card
                  bg={
                    eachTodo.priority === "low"
                      ? "success"
                      : eachTodo.priority === "medium"
                        ? "warning"
                        : "danger"
                  }
                  text={
                    eachTodo.priority === "low"
                      ? "light"
                      : eachTodo.priority === "medium"
                        ? "dark"
                        : "light"
                  }
                  className="mb-2"
                >
                  <Card.Header>{eachTodo.todoTitle}</Card.Header>
                  <Card.Body>
                    <Card.Text>{eachTodo.todoDescription}</Card.Text>
                    <Button variant="light" size="sm" className="">
                      Edit
                    </Button>
                    <Button variant="light" size="sm" className="pull-right">
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      ) : (
        <p>Please Add a Todo to View Here</p>
      )}
    </>
  );
};

export default MyTodos;
