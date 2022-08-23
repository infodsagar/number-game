import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './component/navbar';
import { LoginForm } from './pages/loginForm';
import { SignupForm } from './pages/signupForm';
import { Home } from './pages/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/signup' element={<SignupForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
