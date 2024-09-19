import AdditionPractice from "./components/AdditionPractice";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="content">
        <AdditionPractice></AdditionPractice>
      </div>
    </div>
  );
}

export default App;