import { useRef, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router";
import {
  Avatar,
  Box,
  Button,
  FormGroup,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlineIcon from "@mui/icons-material/LockOutline";
import axios from "../services/axios";
import { LOGIN_URL } from "../services/endpoint";

const Login = () => {
  const formGroupStyle = { justifyContent: "center", alignItems: "center" };
  const formH2Style = { fontSize: 20, fontWeight: 700 };
  const avatarStyle = { marginTop: "20px", backgroundColor: "#1bbd7e" };
  const btnstyle = { margin: "20px 0" };

  const { setAuth } = useAuth();

  const navigate = useNavigate();

  const userRef = useRef<HTMLInputElement>(null);
  const errRef = useRef<HTMLInputElement>(null);

  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    if (userRef.current) userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const controller = new AbortController();
    const params = new URLSearchParams();
    params.append("username", user);
    params.append("password", pwd);

    axios({
      method: "post",
      url: LOGIN_URL,
      signal: controller.signal,
      data: params,
    })
      .then((res) => {
        const accessToken: string = res.data.access_token;
        const loggedIn = true;
        setAuth({ user, accessToken, loggedIn });
        setUser("");
        setPwd("");
        navigate("/home", { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("No Server Response");
        } else if (err.response?.status === 400) {
          setErrMsg("Missing Username or Password");
        } else if (err.response?.status === 401) {
          setErrMsg("Wrong username/password");
        } else {
          setErrMsg("Login Failed");
        }
        errRef.current?.focus();
      });

    return () => controller.abort();
  };

  return (
    <Box sx={{ minHeight: "100dvh" }}>
      <form onSubmit={handleSubmit} style={{ paddingTop: "2rem" }}>
        <Paper
          elevation={10}
          style={{
            padding: 20,
            height: "70vh",
            width: 280,
            margin: "0 auto",
          }}
        >
          <FormGroup sx={formGroupStyle}>
            <Avatar style={avatarStyle}>
              <LockOutlineIcon />
            </Avatar>
            <FormLabel component="h2" sx={formH2Style}>
              Sign In
            </FormLabel>
            <TextField
              label="Username"
              name="username"
              placeholder="Enter username"
              fullWidth
              required
              margin="normal"
              inputRef={userRef}
              onChange={(e) => setUser(e.target.value)}
            />
            <TextField
              label="Password"
              name="password"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              onChange={(e) => setPwd(e.target.value)}
            />
            {errMsg && <Typography color="warning">{errMsg}</Typography>}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              style={btnstyle}
              fullWidth
            >
              Login
            </Button>
          </FormGroup>
        </Paper>
      </form>
    </Box>
  );
};

export default Login;
