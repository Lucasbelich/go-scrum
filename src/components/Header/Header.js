import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import "./HeaderStyles.css";

const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <span>Go Scrum</span>
      <div className="wrapper_right_header">
      <div><button onClick={() => navigate("/donate", { replace: true })}>Donar</button></div>
        <div className="black">Tareas Creadas: {tasks?.length}</div>
        <div className="black">{localStorage.getItem("userName")}</div>
        <div onClick={handleLogOut}>x</div>
      </div>
    </header>
  );
};

export default Header;
