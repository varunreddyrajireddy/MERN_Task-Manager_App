import { useContext, useEffect, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../context/authProvider";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
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

  const handleDelete = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    <Navigate to="/" />;
  }

  return (
    <div>
      Dashboard
      <button onClick={handleDelete}>Logout</button>
      {tasks.map(({ title }) => (
        <div key={title}>{title}</div>
      ))}
    </div>
  );
};

export default Dashboard;
