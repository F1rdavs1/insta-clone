import "./App.css";
import { Context } from "./context/Context";
import { useContext } from "react";
import DashboardRoutes from "./router/Dashboard";
import RegisterRoutes from "./router/Login";

function App() {
  const context = useContext(Context);
  return context?.token ? <DashboardRoutes /> : <RegisterRoutes />;
}

export default App;
