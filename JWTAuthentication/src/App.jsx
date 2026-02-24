
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import ProtectedRoute from './components/ProtectedRoutes.jsx';
import Home from './pages/Home.jsx';

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      {/* <Signup/>
      <Login/> */}
      <Routes>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/home' element={
          <ProtectedRoute>
          <Home/>
          </ProtectedRoute>
          } />
      </Routes>
    </>
  )
}

export default App
