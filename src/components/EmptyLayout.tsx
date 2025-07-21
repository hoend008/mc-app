import { Outlet } from "react-router";
import useAuth from "../hooks/useAuth";

const EmptyLayout = () => {
  const { auth } = useAuth();

  // show navbar when user is logged in (don't show on login page when user not yet logged in)
  return (
    <main className="App">
      <Outlet />
    </main>
  );
};

export default EmptyLayout;
