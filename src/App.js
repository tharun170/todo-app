import logo from './logo.svg';
import './App.css';
import Login from './Components/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}></Route>
        {/* <Route path='/home' element={<Home/>}></Route> */}
      </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
