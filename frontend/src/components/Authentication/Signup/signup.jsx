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
import { useState } from "react";
import { signup } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const SignUpButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { loading, error} = useSelector((state) => state.auth);
  const token  = useSelector(
    (state) => state.auth.token
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(signup({ email, username, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
        console.log("Signup Result", result);
      } else if (result.meta.requestStatus === "rejected") {
        console.log("SignUp Display", error);
      }
    });
  };

  const handleSignUp = () => {
    setOpenModal(true);
  };

  return (
    <>
      {!token && (
        <button
          onClick={() => handleSignUp()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Signup
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
              {error} <Link to="/login">Log In</Link>
            </Alert>
          )}
          <TextField
            type="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            placeholder="Your Email"
          />
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
          ></TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpenModal(false)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" style={{background: ""}} disabled={loading}>
            Sign Up
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SignUpButton;
