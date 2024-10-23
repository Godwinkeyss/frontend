
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import Navbar from './components/Navbar';
import Update from './components/Update';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Navbar />
         <Routes>
          <Route path='/' element={<HomeScreen />}/>
           <Route path="/contact/:id" element={Update} />
         </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
