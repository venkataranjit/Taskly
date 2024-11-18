import React, { FC } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

interface Todo {
  id: string;
  userId: string;
  todoTitle: string;
  todoDescription: string;
  priority: "low" | "medium" | "high";
}

const Cards: FC<{
  eachTodo: Todo;
  todoDeleteHandler: (id: string) => void;
  editHandler: (id: string) => void;
  saveHandler: (updatedTodo: Todo) => void;
  isEditing: boolean;
}> = ({ eachTodo, todoDeleteHandler, editHandler, saveHandler, isEditing }) => {
  const [editTodo, setEditTodo] = React.useState(eachTodo);
  return (
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
      <Card.Header>
        {isEditing ? (
          <input
            type="text"
            className="form-control"
            value={editTodo.todoTitle}
            onChange={(e) =>
              setEditTodo({ ...editTodo, todoTitle: e.target.value })
            }
          />
        ) : (
          eachTodo.todoTitle
        )}
        <Dropdown>
          <Dropdown.Toggle
            variant="success"
            id="dropdown-basic"
          ></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => editHandler(eachTodo.id)}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={() => todoDeleteHandler(eachTodo.id)}>
              Delete
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Card.Header>
      <Card.Body>
        <Card.Text className="text-dark">
          {isEditing ? (
            <textarea
              className="form-control"
              value={editTodo.todoDescription}
              onChange={(e) =>
                setEditTodo({ ...editTodo, todoDescription: e.target.value })
              }
            ></textarea>
          ) : (
            eachTodo.todoDescription
          )}
        </Card.Text>
        {isEditing ? (
          <select
            className="form-select mb-3"
            onChange={(e) =>
              setEditTodo({
                ...editTodo,
                priority: e.target.value as "low" | "medium" | "high",
              })
            }
            value={editTodo.priority}
          >
            <option value="">Select Priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        ) : (
          ""
        )}

        {isEditing && (
          <div className="d-grid gap-2">
            <Button
              variant={
                eachTodo.priority === "low"
                  ? "success"
                  : eachTodo.priority === "medium"
                    ? "warning"
                    : "danger"
              }
              size="sm"
              onClick={() => saveHandler(editTodo)}
            >
              Update
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default Cards;
