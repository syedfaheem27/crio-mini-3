const Card = ({ flag, name }) => {
    return (
        <div className="countryCard">
            <img src={flag} alt={`Flag of ${name}`} />
            <h4>{name}</h4>
        </div>
    );
};

export default Card;