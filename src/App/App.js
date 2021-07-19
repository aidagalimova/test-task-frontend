import 'antd/dist/antd.css';
import Routing from '../routing';
import './App.scss';
import NavBar from '../components/navbar';
function App() {
  return (
    <div className="App">
       <NavBar />
      <Routing/>
    </div>
  );
}

export default App;
