import React from "react";
import "./style.css";
import { Button, Container, Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import { FaRegCopy, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFormik } from "formik";
import { Todo } from "../../validation/validation";


const Final = () => {
  const initialValues = {
    taskAdder: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Todo,
    onSubmit: () => {},
  });

  return (
    <>
      <div className="todo-main">
        <Container fixed>
          <Grid container justifyContent="center">
            <Grid item xs={4} textAlign="center">
              <div className="todo-heading">
                <h1>Todo App</h1>
              </div>
            </Grid>
          </Grid>
          <form onSubmit={formik.handleSubmit}>
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
                    name="taskAdder"
                    onChange={formik.handleChange}
                    value={formik.values.taskAdder}
                  />
                </div>
              </Grid>
              <Grid item xs={2}>
                <div className="todo-search">
                  <Button variant="contained" type="submit">Add</Button>
                </div>
              </Grid>
            </Grid>
          </form>
          <Grid container justifyContent="center">
            <Grid item xs={12}>
              <div className="todo-box">
                <div className="todo-inner">
                  <div className="todo-text">
                    <h6>Hello</h6>
                  </div>
                  <div className="todo-extra">
                    <FaRegCopy />
                    <FaEdit />
                    <RiDeleteBin6Line />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </>
  );
};

export default Final;
