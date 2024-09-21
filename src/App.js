import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Introduction from './components/Introduction';
import Practice from './components/Practice';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import './styles/App.css'

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar></Navbar>
        <div className="content">
          <Routes>
            <Route path="/" element={<Introduction/>} />
            <Route path="/addition" element={<Practice operation="addition" symbol="+" />} />
            <Route path="/subtraction" element={<Practice operation="subtraction" symbol="-" />} />
            <Route path="/multiplication" element={<Practice operation="multiplication" symbol="*" />} />
            <Route path="/division" element={<Practice operation="division" symbol="/" />} />
          </Routes>
        </div>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;