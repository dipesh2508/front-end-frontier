import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Card from "../components/ui/Card";
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
    <div className="py-2 flex flex-col gap-2">
      <h1 className="text-3xl font-bold mb-4 text-center">Pokédex</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center gap-4">
        {pokemonList.map((pokemon) => (
          <Link
            to={`/pokemon/${pokemon.details.id}`}
            key={pokemon.details.id}
          >
            <Card pokemon={pokemon} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
