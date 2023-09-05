import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import MoonCard from "./MoonCard";
import MoonForm from "./MoonForm";
import PlanetForm from "./PlanetForm";

function PlanetDetail() {
  const [{ data: planet, error, status }, setPlanet] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const [showEdit, setShowEdit] = useState(false);

  const { id } = useParams();

  const fetchPlanet = useCallback(async () => {
    const res = await fetch(`/planets/${id}`);
    if (res.ok) {
      const planetJSON = await res.json();
      setPlanet({ data: planetJSON, error: null, status: "resolved" });
    } else {
      const planetErr = await res.json();
      setPlanet({ data: null, error: planetErr, status: "rejected" });
    }
  }, [id]);

  useEffect(() => {
    fetchPlanet().catch(console.error);
  }, [id, fetchPlanet]);

  function handleAddMoon(newMoon) {
    setPlanet({
      error,
      status,
      data: {
        ...planet,
        moons: [...planet.moons, newMoon],
      },
    });
  }

  function handleUpdatePlanet() {
    fetchPlanet();
    setShowEdit(false);
  }

  function handleDeleteMoon(id) {
    fetch(`/moons/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setPlanet({
          error,
          status,
          data: {
            ...planet,
            moons: planet.moons.filter((moon) => moon.id !== id),
          },
        });
      }
    });
  }

  const moonCards = planet?.moons.map((moon) => (
    <MoonCard key={moon.id} moon={moon} onDelete={handleDeleteMoon} />
  ));

  if (status === "pending") return <h2>Loading...</h2>;
  if (status === "rejected") return <h2>Error: {error.error}</h2>;

  return (
    <div>
      <h2>
        Planet {planet.name}
        <button onClick={() => setShowEdit((showEdit) => !showEdit)}>
          <span role="img" aria-label="edit">
            ✏️
          </span>
        </button>
      </h2>
      <h4>{planet.distance_from_sun} miles from the sun</h4>

      {showEdit && (
        <PlanetForm
          planet={planet}
          onPlanetRequest={handleUpdatePlanet}
          edit={true}
        />
      )}
      <hr />
      <h2>Moons:</h2>
      <div className="moonList">{moonCards}</div>
      <hr />
      <MoonForm
        onMoonRequest={handleAddMoon}
        planetId={planet.id}
        edit={false}
      />
    </div>
  );
}

export default PlanetDetail;
