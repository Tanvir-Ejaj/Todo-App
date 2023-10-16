import React, { useEffect, useState } from "react";
import "./style.css";
import { Button, Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FaRegCopy, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { ToastContainer, toast } from "react-toastify";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
  update,
} from "firebase/database";

const Final = () => {
  let [info, setInfo] = useState({
    task: "",
  });

  let handleChange = (e) => {
    const { name, value } = e.target;
    setInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const [error, setError] = useState("");
  const validation = () => {
    if (!info.task) {
      setError("Please Add A Task");
    }
  };

  // Write Data

  const db = getDatabase();
  const handleSubmit = () => {
    set(push(ref(db, "TodoList/")), {
      task: info.task,
    }).then(() => {
      setInfo({
        task: "",
      });
      toast.success("Successful!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
      });
    });
  };

  // Read All Data

  const [todo, setTodo] = useState([]);

  useEffect(() => {
    const starCountRef = ref(db, "TodoList/");
    onValue(starCountRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((data) => {
        arr.push({ ...data.val(), id: data.key });
      });
      setTodo(arr);
    });
  }, []);

  // For delete data

  const handleDelete = (id) => {
    remove(ref(db, "TodoList/" + id));
  };

  // For Edit

  const [show, setShow] = useState(false);

  const handleEdit = (value) => {
    setInfo({
      task: value.task,
    });
    setShow(true);
    setIds(value.id);
  };

  // For Update

  const [ids, setIds] = useState("");
  const handleUpdate = () => {
    update(ref(db, "TodoList/" + ids), {
      task: info.task,
    }).then(() => {
      setInfo({
        task: "",
      });
      toast.success("Successful!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: "dark",
      });
    });
  };

  return (
    <>
      <div className="todo-main">
        <Container fixed>
          <ToastContainer />
          <Grid container justifyContent="center">
            <Grid item xs={4} textAlign="center">
              <div className="todo-heading">
                <h1>Todo App</h1>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={6}>
              <div className="todo-search">
                <TextField
                  className="input"
                  id="outlined-basic"
                  label="Add Your Task"
                  variant="outlined"
                  name="task"
                  onChange={handleChange}
                  value={info.task}
                />
                {error ? <p className="error-message">{error}</p> : ""}
              </div>
            </Grid>
            <Grid item xs={2}>
              <div className="todo-search">
                {show ? (
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleUpdate}
                  >
                    Update
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Add
                  </Button>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div className="todo-box">
                {todo.map((item) => (
                  <>
                    <div className="todo-inner">
                      <div className="todo-text">
                        <h6>{item.task}</h6>
                      </div>
                      <div className="todo-extra">
                        <FaRegCopy />
                        <FaEdit onClick={() => handleEdit(item)} />
                        <RiDeleteBin6Line
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    </div>
                  </>
                ))}
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Final;
