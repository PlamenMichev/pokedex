import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../styles/PokemonDetail.css";

const PokemonDetail = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokemon(response.data);
      } catch (err) {
        setError("Failed to fetch Pokémon details");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonDetail();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading Pokémon details...</div>;
  }

  if (error || !pokemon) {
    return <div className="error">{error || "Pokémon not found"}</div>;
  }

  return (
    <div className="pokemon-detail-container">
      <Link to="/" className="back-button">
        ← Back to List
      </Link>

      <div className="pokemon-detail-card">
        <div className="pokemon-header">
          <h2>
            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
          </h2>
          <span className="pokemon-number">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="pokemon-detail-content">
          <div className="pokemon-image-section">
            <img
              src={
                pokemon.sprites.other["official-artwork"].front_default ||
                pokemon.sprites.front_default
              }
              alt={pokemon.name}
              className="pokemon-detail-image"
            />

            <div className="pokemon-types-detail">
              {pokemon.types.map((typeInfo) => (
                <span
                  key={typeInfo.type.name}
                  className={`type-badge-detail ${typeInfo.type.name}`}
                >
                  {typeInfo.type.name}
                </span>
              ))}
            </div>
          </div>

          <div className="pokemon-info-section">
            <div className="info-group">
              <h3>About</h3>
              <div className="physical-traits">
                <div className="trait">
                  <span className="trait-label">Height:</span>
                  <span className="trait-value">{pokemon.height / 10} m</span>
                </div>
                <div className="trait">
                  <span className="trait-label">Weight:</span>
                  <span className="trait-value">{pokemon.weight / 10} kg</span>
                </div>
              </div>
            </div>

            <div className="info-group">
              <h3>Base Stats</h3>
              <div className="stats-container">
                {pokemon.stats.map((stat) => (
                  <div key={stat.stat.name} className="stat-item">
                    <span className="stat-name">
                      {formatStatName(stat.stat.name)}
                    </span>
                    <span className="stat-value">{stat.base_stat}</span>
                    <div className="stat-bar-container">
                      <div
                        className="stat-bar"
                        style={{
                          width: `${Math.min(
                            100,
                            (stat.base_stat / 255) * 100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info-group">
              <h3>Abilities</h3>
              <div className="abilities-list">
                {pokemon.abilities.map((ability) => (
                  <div key={ability.ability.name} className="ability-item">
                    {ability.ability.name.replace("-", " ")}
                    {ability.is_hidden && (
                      <span className="hidden-ability"> (Hidden)</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to format stat names
function formatStatName(statName) {
  switch (statName) {
    case "hp":
      return "HP";
    case "attack":
      return "Attack";
    case "defense":
      return "Defense";
    case "special-attack":
      return "Sp. Atk";
    case "special-defense":
      return "Sp. Def";
    case "speed":
      return "Speed";
    default:
      return statName
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
  }
}

export default PokemonDetail;
