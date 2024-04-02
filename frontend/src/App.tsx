import './App.css';
import Header from './components/header/header';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signin from './components/Login/signin'
import Signup from './components/Login/signup';
import Home from './pages/home/Home';
import TaskManager from './pages/taskmanagement/taskmanagement';
import About from './pages/about/about';
import PrivateRoute from './components/PrivateComponent/privatecomponenet';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <ToastContainer />
        <Routes>
          <Route element={<PrivateRoute/>}>
            <Route path='/about' element={<About/>}/>
            <Route path='/taskmanager' element={<TaskManager />} />
          </Route>
            <Route path='/' element={<Home/>} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
      
    </div>

  );
}

export default App;


// import { QueryClient, QueryClientProvider } from 'react-query';
// const queryClient = new QueryClient();
// <QueryClientProvider client={queryClient}>
// </QueryClientProvider>