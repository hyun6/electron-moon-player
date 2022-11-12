import React from 'react';
import PlaybackPage from './pages/playback.page';
import { PlaylistPage } from './pages/playlist.page';
import './App.css';

function App() {
  return (
    <div className="App">
      <PlaybackPage></PlaybackPage>
      <PlaylistPage></PlaylistPage>
    </div>
  );
}

export default App;
