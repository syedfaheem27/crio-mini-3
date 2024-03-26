const Card = ({ flag, name }) => {
    return (
        <div className="countryCard">
            <img src={flag} alt={`Flag of ${name}`} />
            <h2>{name}</h2>
        </div>
    );
};

export default Card;