import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <h2>About this Pokédex</h2>
      <div className="about-content">
        <p>
          This Pokédex was created as an assignment for a web development
          course. It uses the PokéAPI to fetch and display information about
          Pokémon.
        </p>
        <p>Features of this Pokédex:</p>
        <ul>
          <li>Browse through all Pokémon with pagination</li>
          <li>View detailed information about each Pokémon</li>
          <li>See Pokémon stats, types, abilities, and more</li>
        </ul>
        <p>This project was built using:</p>
        <ul>
          <li>React</li>
          <li>Vite</li>
          <li>React Router</li>
          <li>Axios for API calls</li>
          <li>PokéAPI for Pokémon data</li>
        </ul>
      </div>
    </div>
  );
};

export default About;
