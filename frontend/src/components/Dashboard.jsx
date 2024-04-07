import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [createTask, setCreateTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        if (!user || !user.token) {
          console.log("User or token is missing.");
          return;
        }
        const token = user.token;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(
          "http://localhost:5000/api/tasks",
          config
        );

        setTasks(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchTasks();
  }, [user]); // Only trigger useEffect when user changes

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleDelete = async (id) => {
    try {
      if (!user || !user.token) {
        console.log("User or token is missing.");
        return;
      }
      const token = user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, config);
      const remainingTasks = tasks.filter((task) => {
        return task._id !== id;
      });
      console.log(remainingTasks);
      setTasks(remainingTasks);
    } catch (error) {
      console.log(error.response);
    }
  };

  const addTask = async () => {
    try {
      if (!user || !user.token) {
        console.log("User or token is missing.");
        return;
      }
      const token = user.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `http://localhost:5000/api/tasks/add`,
        { title: createTask },
        config
      );
      const newTask = response.data;
      setTasks([...tasks, newTask]);
      setCreateTask("");
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) {
    <Navigate to="/" />;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Enter a Task"
        value={createTask}
        onChange={(e) => {
          setCreateTask(e.target.value);
        }}
      />
      <button onClick={addTask}>Add</button>
      {tasks.map((task) => (
        <div key={task._id}>
          {task.title}{" "}
          <button onClick={() => handleDelete(task._id)}>Del</button>
        </div>
      ))}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
