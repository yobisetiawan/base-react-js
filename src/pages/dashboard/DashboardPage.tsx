import { Pane } from "evergreen-ui";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../redux/slices/userSlice";
import { RootState } from "../../redux/store";

const DashboardPage = () => {
  const user = useSelector((state: RootState) => state.user) as any;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSignOut = () => {
    dispatch(signOut());
    navigate("/auth/login", { replace: true });
  };

  return (
    <Pane>
      Dashboard
      <p>Name : {user?.name}</p>
      <button onClick={onSignOut}>Logout</button>
    </Pane>
  );
};

export default DashboardPage;
