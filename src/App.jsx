import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import PokemonList from "./routes/PokemonList";
import PokemonDetail from "./routes/PokemonDetail";
import About from "./routes/About";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Pokédex</h1>
          <nav>
            <ul className="nav-links">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<PokemonList />} />
            <Route path="/pokemon/:id" element={<PokemonDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>

        <footer>
          <p>Created with PokéAPI</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
