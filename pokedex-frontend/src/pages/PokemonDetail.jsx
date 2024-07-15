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
    return <span className="loading loading-dots loading-lg grid place-items-center h-screen mx-auto"></span>
  }

  return (
<div className="mockup-phone">
<div className="camera"></div>
<div className="display w-72 py-8 px-4">
      <h1 className="text-3xl font-bold mb-4">{pokemon.name}</h1>
      <img src={pokemon.details.image} alt={pokemon.name} className="mb-4" />
      <p><strong>Pokedex No:</strong> {pokemon.details.id}</p>
      <p><strong>Type:</strong> {pokemon.details.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
      <p><strong>Height:</strong> {pokemon.details.height}</p>
      <p><strong>Weight:</strong> {pokemon.details.weight}</p>
      <p><strong>Base Experience:</strong> {pokemon.details.base_experience}</p>
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
    </div>
  )
}

export default PokemonDetail
