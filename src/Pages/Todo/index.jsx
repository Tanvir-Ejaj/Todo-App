import React, { useEffect, useState } from "react";
import { FaRegCopy, FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BsSearch } from "react-icons/bs";
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
import { CopyToClipboard } from "react-copy-to-clipboard";
import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";
import "./responsive.css";

const Todo = () => {
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
  const validate = () => {
    if (!info.task) {
      setError("Refresh again and Please Add A Task");
    }
  };

  // Write Data

  const db = getDatabase();

  const handleSubmit = () => {
    validate();
    if (!error && info.task.trim() !== "") {
      set(
        push(ref(db, "TodoList/"), {
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
        })
      );
    }
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
      setShow(false);
    });
  };

  // Search User

  const [filterUser, setFilterUser] = useState([]);

  const handleSearch = (e) => {
    let array = [];
    if (e.target.value.length === 0) {
      setFilterUser([]);
    }
    todo.filter((item) => {
      if (item.task.toLowerCase().includes(e.target.value.toLowerCase())) {
        array.push(item);
        setFilterUser(array);
      }
    });
  };
  return (
    <>
      <div className="todo-main">
        <div className="container">
          <ToastContainer />
          <div className="row justify-content-center">
            <div className="col-lg-4 text-center">
              <div className="todo-heading">
                <h1>Todo App</h1>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="todo-search">
                <input
                  type="text"
                  className="input"
                  name="task"
                  onChange={handleChange}
                  value={info.task}
                />
                {error ? <p className="error-message">{error}</p> : ""}
                {show ? (
                  <button type="submit" onClick={handleUpdate}>
                    Update
                  </button>
                ) : (
                  <button type="submit" onClick={handleSubmit}>
                    Add
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="row justify-content-end">
            <div className="col-md-8 col-lg-6">
              <div className="search_box">
                <div className="search-wrapper">
                  <div className="search-icon">
                    <BsSearch />
                  </div>
                  <div className="search-input">
                    <input
                      type="text"
                      placeholder="Search"
                      onChange={handleSearch}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="todo-box">
                {filterUser.length > 0
                  ? filterUser.map((item, i) => (
                      <div key={i} className="todo-inner">
                        <div className="todo-text">
                          <h6>{item.task}</h6>
                        </div>
                        <div className="todo-extra">
                          <CopyToClipboard text={item.task}>
                            <FaRegCopy />
                          </CopyToClipboard>
                          <FaEdit onClick={() => handleEdit(item)} />
                          <RiDeleteBin6Line
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </div>
                    ))
                  : todo.map((item, i) => (
                      <div key={i} className="todo-inner">
                        <div className="todo-text">
                          <h6>{item.task}</h6>
                        </div>
                        <div className="todo-extra">
                          <CopyToClipboard text={item.task}>
                            <FaRegCopy />
                          </CopyToClipboard>
                          <FaEdit onClick={() => handleEdit(item)} />
                          <RiDeleteBin6Line
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
