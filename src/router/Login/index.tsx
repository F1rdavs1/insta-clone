import { Routes, Route } from "react-router-dom";
import { Register, Login } from "../../pages/register";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default CustomRoutes;
