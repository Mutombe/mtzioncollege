import { useAuth0 } from "@auth0/auth0-react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import { signup } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { user, token, loading, error, success } = useSelector(
    (state) => state.auth
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
          Signup
        </button>
      )}
      <Dialog
        open={openModal}
        onClose={setOpenModal(false)}
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
            label="Username"
            name="username"
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
          <Button onClick={onClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" disabled={loading}>
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default LoginButton;
