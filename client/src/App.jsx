import './App.css'
import Navbar from './components/Navbar.jsx';
import LinkCreationComponent from './components/LinkCreationComponent.jsx';

function App() {

  return (
    <div>

      {/* TOP LOGO AND NAV */}
      <Navbar />

      {/* MAIN CONTENT. */}
      <LinkCreationComponent />

    </div>
  )
}

export default App
