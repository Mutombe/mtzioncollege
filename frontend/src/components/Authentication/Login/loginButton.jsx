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
import { login } from "../../../redux/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginButton = () => {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { token, loading, error, success } = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(login({ username, password })).then((result) => {
      if (result.meta.requestStatus === "fulfilled") {
        navigate("/");
        console.log("Login Result", result);
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
        onClose={setOpenModal(false)}
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
          ></TextField>
          <TextField
            label="Price Per Month"
            name="price"
            value={""}
            onChange={""}
            fullWidth
            margin="normal"
            type="number"
            placeholder={property.price_per_month}
          />
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
