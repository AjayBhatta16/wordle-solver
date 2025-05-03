import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import HomeScreen from './components/home/HomeScreen'
import AboutScreen from './components/about/AboutScreen'
import SessionScreen from './components/session/SessionScreen'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <><Outlet/></>}>
          <Route index element={ <HomeScreen/> } />
          <Route path="about" element={ <AboutScreen/> } />
          <Route path="sessions/:sessionID" element={ <SessionScreen /> } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
