import "./sideBar.css"
import { Link } from "react-router-dom"

const Sidebar = () => {
  const userData = JSON.parse(localStorage.getItem("auth") || "{}")
  return (
    <div>
      <div className="sidebar">
        <div className="sname">
          <p>{userData.username}</p>
        </div>
        <div>
          <Link to="/" className="shome">
            Home
          </Link>
        </div>
        <div>
          <Link to="/about" className="ssetting">
            About
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
