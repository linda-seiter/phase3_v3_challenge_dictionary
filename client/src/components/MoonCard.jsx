import React, { useState } from "react";
import MoonForm from "./MoonForm";

function MoonCard({ moon, onDelete }) {
  const [showEdit, setShowEdit] = useState(false);
  function handleUpdateMoon() {
    window.location.reload(false);
  }

  return (
    <div className="moonCard">
      <h4>
        Name: {moon.name}
        <button onClick={() => setShowEdit((showEdit) => !showEdit)}>
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </button>
        <span>
          <button onClick={() => onDelete(moon.id)}>
            <span role="img" aria-label="delete">
              🗑
            </span>
          </button>
        </span>
      </h4>
      <p>Orbital period is {moon.orbital_period} days.</p>
      {showEdit && (
        <MoonForm
          moon={moon}
          planetId={moon.planet_id}
          onMoonRequest={handleUpdateMoon}
          edit={true}
        />
      )}
    </div>
  );
}

export default MoonCard;
