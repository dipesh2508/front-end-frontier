import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function PokemonDetail() {
  const { id } = useParams()
  const [pokemon, setPokemon] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch(`https://pokedex-backend-pi.vercel.app/pokemon/${id}`)
        const data = await response.json()
        setPokemon(data)
    }

    fetchData()
  }, [id])

  if (!pokemon) {
    return <div>Loading...</div>
  }

  return (
    <div className="max-w-2xl mx-auto p-4 border rounded-lg">
      <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
      <img src={pokemon.details.image} alt={pokemon.name} className="mb-4" />
      <p><strong>ID:</strong> {pokemon.id}</p>
      <p><strong>Type:</strong> {pokemon.details.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      <p><strong>Height:</strong> {pokemon.height}</p>
      <p><strong>Weight:</strong> {pokemon.weight}</p>
      <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
      <div>
        <h2 className="text-2xl font-semibold mt-4">Abilities</h2>
        <ul>
          {pokemon.details.abilities.map(abilityInfo => (
            <li key={abilityInfo.ability.name}>
              {abilityInfo.ability.name} {abilityInfo.is_hidden && "(Hidden Ability)"}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mt-4">Stats</h2>
        <ul>
          {pokemon.details.stats.map(statInfo => (
            <li key={statInfo.stat.name}>
              <strong>{statInfo.stat.name}:</strong> {statInfo.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default PokemonDetail
