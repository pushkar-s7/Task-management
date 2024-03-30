import './Header.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem("auth");

  const logout = () => {
    localStorage.clear();
    navigate('/signup');
  }
  const home=()=>{
    navigate('/');
  }
  return (
    <div>
      <nav className='header'>
        <div >
          <button onClick={home} className='header_logo'>Task Manager</button>
        </div>
        <div>
          {auth ? (
            <div >
              <button onClick={logout} className='button_3'>Sign Out</button>
            </div>
          ) : (
            <>
              <div className='button_1'>
                <Link to='/signin' className='sign'> Sign In </Link>
              </div>
              <div className='button_2'>
                <Link to='/signup' className='sign'> Sign Up </Link>
              </div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Header;