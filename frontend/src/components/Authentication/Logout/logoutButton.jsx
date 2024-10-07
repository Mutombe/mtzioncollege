import { logout } from "../../../redux/authSlice";
const LogoutButton = () => {
  const { token, loading, error, success } = useSelector((state) => state.auth);

  return (
    <>
      {token && (
        <button
          onClick={() => logout()}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
        >
          {loading ? "Loading..." : "Logout"}
        </button>
      )}
    </>
  );
};

export default LogoutButton;
