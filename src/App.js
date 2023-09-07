import { useState } from 'react';
import Navbar from './Navbar.js';
import Game from './Game.js';

function App() {
  const [isPlaying, setIsPlaying] = useState(false)
  const letsPlay = () => { setIsPlaying(true) }
  const goBackHome = () => { setIsPlaying(false) }

  return (
    <main>
      <Navbar
        isPlaying={isPlaying}
        letsPlay={letsPlay}
        goBackHome={goBackHome}
      />
      <Game
        isPlaying={isPlaying}
      />
    </main>
  );
}

export default App;
