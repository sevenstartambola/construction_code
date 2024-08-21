import logo from './logo.svg';
import './App.css';
import GameInfo from './pages/GameInfo/GameInfo';
import Banner from './pages/Banner/Banner';
import GameStart from './pages/GameStart/GameStart';
import Chat from './pages/Chat/Chat';

function App() {
  return (
    <div className="App">
      <GameStart />
      <Chat />
    </div>
  );
}

export default App;
