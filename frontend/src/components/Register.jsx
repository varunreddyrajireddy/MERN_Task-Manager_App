import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import axios from "axios";
import CheckIcon from "@mui/icons-material/Check";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/register",
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.status === 201) {
        setOpen(true);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.log(error);
    }

    setLoading(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel htmlFor="username">Username</InputLabel>
          <Input
            id="username"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value.trim())}
          />
        </FormControl>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </FormControl>
        <FormControl sx={{ width: "200px" }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
      <Typography variant="body2">
        Already have an account?{" "}
        <Link component="button" variant="body2" to={"/"}>
          Login
        </Link>
      </Typography>
      <Snackbar
        open={open}
        autoHideDuration={5000} // Hide after 5 seconds
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }} // Adjust position as needed
      >
        <div
          style={{
            backgroundColor: "lightgreen",
            padding: "10px",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
          }}
        >
          <CheckIcon style={{ color: "green", marginRight: "5px" }} />
          Registration successful!
        </div>
      </Snackbar>
    </Box>
  );
};

export default Register;
