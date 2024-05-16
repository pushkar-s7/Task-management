import "./Home.css"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const auth = localStorage.getItem("auth")
  const navigate = useNavigate()
  const handleClick = () => {
    {
      auth ? navigate("/taskmanager") : navigate("/signup")
    }
  }
  return (
    <div className="home">
      <div className="home__container">
        <h2>Organize it all</h2>
        <p>With TaskManager</p>

        <button className="home_btn" onClick={handleClick}>
          Get Started
        </button>
      </div>
    </div>
  )
}

export default Home
