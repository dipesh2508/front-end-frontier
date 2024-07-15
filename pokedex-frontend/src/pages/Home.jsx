import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
        try{
        const response = await fetch("https://pokedex-backend-pi.vercel.app/pokemon");
        const data = await response.json();
        setPokemonList(data);
        } catch (error) {
            console.error("Error fetching data", error);
        }
        }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Pokédex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemonList.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.details.id}`}
            key={pokemon.details.id}
            className="p-4 border rounded-lg hover:bg-gray-100"
          >
            <img src={pokemon.details.image} alt={pokemon.name} />
            <h2 className="text-xl font-semibold">{pokemon.name}</h2>
            <p>Pokedex No: {pokemon.details.id}</p>
            <p>Type: {pokemon.details.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
