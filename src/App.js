import AdditionPractice from "./components/AdditionPractice";
import './styles/App.css'

const App = () => {
  return (
    <div>
      <h1>兒童學院</h1>
      <div className="content">
        <AdditionPractice></AdditionPractice>
      </div>
    </div>
  );
}

export default App;