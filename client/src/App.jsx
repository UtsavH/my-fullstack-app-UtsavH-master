import { BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Main from './components/Main';
import SignIn from './components/SignIn';
import Register from './components/Register';
import Footer from './components/Footer';

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div id="main-content">
        <Routes>
          <Route path='/' element={<Main  />} />
          <Route path="/register" element={<Register />} />
          <Route path='/signin' element={<SignIn />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App
