import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/PokemonList.css";

const PokemonList = () => {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 20;

  useEffect(() => {
    const fetchPokemon = async () => {
      setLoading(true);
      try {
        const offset = (currentPage - 1) * limit;
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
        );

        // Get detailed information for each Pokemon
        const results = response.data.results;
        const pokemonData = await Promise.all(
          results.map(async (pokemon) => {
            const pokemonResponse = await axios.get(pokemon.url);
            return {
              id: pokemonResponse.data.id,
              name: pokemonResponse.data.name,
              image:
                pokemonResponse.data.sprites.other["official-artwork"]
                  .front_default || pokemonResponse.data.sprites.front_default,
              types: pokemonResponse.data.types.map((type) => type.type.name),
            };
          })
        );

        setPokemon(pokemonData);
        setTotalPages(Math.ceil(response.data.count / limit));
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [currentPage]);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return <div className="loading">Loading Pokémon...</div>;
  }

  return (
    <div className="pokemon-list-container">
      <h2>Pokémon List</h2>

      <div className="pokemon-grid">
        {pokemon.map((poke) => (
          <Link
            to={`/pokemon/${poke.id}`}
            key={poke.id}
            className="pokemon-card"
          >
            <div className="pokemon-image-container">
              <img src={poke.image} alt={poke.name} className="pokemon-image" />
            </div>
            <div className="pokemon-info">
              <span className="pokemon-id">
                #{poke.id.toString().padStart(3, "0")}
              </span>
              <h3 className="pokemon-name">
                {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
              </h3>
              <div className="pokemon-types">
                {poke.types.map((type) => (
                  <span key={type} className={`type-badge ${type}`}>
                    {type}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
