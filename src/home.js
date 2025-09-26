import { useNavigate } from "react-router-dom";
import "./home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      <button onClick={() => navigate("/medical")}>Medical</button>
      <button onClick={() => navigate("/sound")}>Sound</button>
    </div>
  );
}

export default Home;
