import { useState } from 'react'; // Delete if unused
import './components/Header';
import './components/Navbar';
import './components/Footer';
import Home from './sections/Home';
import TravelSearch from './sections/TravelSearch';
import BlogPage from './sections/BlogPage';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const playRandomSound = () => {
    const sounds = ['/sounds/click1.mp3', '/sounds/click2.mp3', '/sounds/click3.mp3'];
    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    const audio = new Audio(randomSound);
    audio.play();
  };

  const handleTabClick = (section) => {
    setActiveSection(section);

    switch (section) {
      case 'Home':
        playSound('/sounds/click1.mp3');
        break;
      case 'Travel Search':
        playRandomSound();
        break;
      case 'Blog Page':
        playRandomSound();
        break;
      default:
        break;
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'Home':
        return <Home />;
      case 'Travel Search':
        return <TravelSearch />;
      case 'Blog Page':
        return <BlogPage />;
      default:
        return null;
    }
  };

  return (
    <div className="folder-container">
      {}
      <header />

      <div className="folder-tabs">
        {['Home', 'Travel Search', 'Blog Page'].map((section) => (
          <div key={`tab ${section}`}
          className={`tab ${activeSection === section ? 'active' : ''}`}
          onClick={() => handleTabClick(section)}
          >
            {section}
          </div>
        ))}
      </div>
    {renderSection()}
  </div>
  );
};

export default App;