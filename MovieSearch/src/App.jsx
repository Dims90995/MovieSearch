import './css/App.scss';
import MovieCard from './components/MovieCard';
import Home from './Pages/Home';
import { Routes, Route } from 'react-router-dom';
import Favorites from './Pages/Favorites';
import NavBar from './components/NavBar';
import { MovieProvider } from './contexts/MovieContext';
import LoginRegisterPage from './Pages/LoginRegisterPage';
import UserHome from "./Pages/UserHome";

function App() {
  
  return (
    <MovieProvider>
      <NavBar />
<main className='main-content'>
<Routes>
  <Route path='/' element={<Home />} />
  <Route path='/favorites' element={<Favorites/>} />
  <Route path="/auth" element={<LoginRegisterPage />} />
  <Route path="/userhome" element={<UserHome />} />
</Routes>
</main>
</MovieProvider>
  );
}



export default App


