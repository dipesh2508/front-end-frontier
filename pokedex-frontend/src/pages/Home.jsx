import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://pokedex-backend-pi.vercel.app/pokemon"
        );
        const data = await response.json();
        setPokemonList(data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="py-2 flex flex-col gap-4">
      <div className="flex items-center justify-center">
        <img
          src="https://archives.bulbagarden.net/media/upload/4/4b/Pok%C3%A9dex_logo.png"
          alt="Pokedex"
          className="w-48 h-auto"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-4">
        {pokemonList.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.details.id}`} key={pokemon.details.id}>
            <Card pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
