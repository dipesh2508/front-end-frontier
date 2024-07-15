import PropTypes from "prop-types";

const Card = ({ pokemon }) => {
  return (
    <div className="card card-side bg-base-100 w-96 shadow-xl p-4">
      <figure>
        <img src={pokemon.details.image} alt={pokemon.name} />
      </figure>

      <div className="card-body">
        <h2 className="card-title">{pokemon.name}</h2>
        <p>Pokedex No: {pokemon.details.id}</p>
        <div className="card-actions justify-start flex items-center">
          Type:{" "}
          {pokemon.details.types.map((typeInfo, key) => (
            <div
              key={key}
              className="badge badge-outline p-2 m-1 bg-primary-100 text-primary-700"
            >
              {typeInfo.type.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Card.propTypes = {
  pokemon: PropTypes.node.isRequired,
};

export default Card;
