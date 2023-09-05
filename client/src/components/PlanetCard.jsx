import React from "react";
import { Link } from "react-router-dom";

function PlanetCard({ planet: { id, name }, onDelete }) {
  return (
    <div className="planetCard">
      <h3>
        {name}
        <span>
          <button onClick={() => onDelete(id)}>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </span>
      </h3>
      <Link to={`/planets/${id}`}>View Details</Link>
    </div>
  );
}

export default PlanetCard;
