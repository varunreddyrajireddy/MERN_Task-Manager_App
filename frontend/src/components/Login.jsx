import {
  Button,
  FormControl,
  Input,
  InputLabel,
  Box,
  Typography,
  Link,
  Snackbar,
} from "@mui/material";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import CheckIcon from "@mui/icons-material/Check";
import axios from "axios";
import { AuthContext } from "../context/authProvider";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const [loginData, setLoginData] = useState({
  //   email: '',
  //   password: ''
  // })

  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      login(response.data);
      setOpen(true);
      setLoading(false);
      navigate("/dashboard");
      console.log("Login Successful");
    } catch (error) {
      setLoading(false);
      setError("Invalid username or password");
      console.error("Login error:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleChange = (e) => {
  //   setLoginData({
  //     [e.target.name]: e.target.value
  //   })
  // }

  return (
    <Box alignContent={"center"}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleLogin}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // onChange={handleChange}
          />
        </FormControl>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            id="password"
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // onChange={handleChange}
          />
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>
      {error && (
        <Typography color="error" sx={{ marginTop: 1 }}>
          {error}
        </Typography>
      )}
      <Typography variant="body2" sx={{ marginTop: 1 }}>
        Don&apos;t have an account?{" "}
        <Link component="button" variant="body2" onClick={handleRegisterClick}>
          Register
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
          <Typography variant="body1">Successfully logged in</Typography>
        </div>
      </Snackbar>
    </Box>
  );
};

export default Login;
