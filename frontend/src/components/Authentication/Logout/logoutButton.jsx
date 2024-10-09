import { logout } from "../../../redux/authSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const LogoutButton = () => {
  const { loading, error } = useSelector((state) => state.auth);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    });
  };

  return (
    <>
      {token && (
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          Logout
        </button>
      )}
    </>
  );
};

export default LogoutButton;
