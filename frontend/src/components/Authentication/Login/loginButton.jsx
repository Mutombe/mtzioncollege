import { useAuth0 } from "@auth0/auth0-react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
  Alert
} from "@mui/material";
import { Link } from "react-router-dom";
import { login } from "../../../redux/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error} = useSelector((state) => state.auth);
  const token = useSelector(
    (state) => state.auth.token
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(login({ username, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
        console.log("Login Result", result);
        setOpenModal(false);
      }
    });
  };

  const handleLogin = () => {
    setOpenModal(true);
  };

  return (
    <>
      {!token && (
        <button
          onClick={() => handleLogin()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Login
        </button>
      )}
      <Dialog
        open={openModal}
        fullWidth
        className=""
      >
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="warning">
              {error} <Link to="/signup">Sign Up</Link>
            </Alert>
          )}
          <TextField
            type="text"
            label="Username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Your Username"
          />
          <TextField
            type="password"
            label="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Password"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" className="bg-blue-800">
            Log In
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginButton;
