import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import PlanetForm from "./PlanetForm";
import MoonCard from "./MoonCard";
import MoonForm from "./MoonForm";

function PlanetDetail() {
  const [{ data: planet, error, status }, setPlanet] = useState({
    data: null,
    error: null,
    status: "pending",
  });
  const [showEdit, setShowEdit] = useState(false);
  const [moons, setMoons] = useState([]);
  const { id } = useParams();

  const fetchPlanet = useCallback(async () => {
    const [resPlanet, resMoons] = await Promise.all([
      fetch(`/planets/${id}`),
      fetch(`/planets/${id}/moons`),
    ]);
    if (resPlanet.ok) {
      const planetJSON = await resPlanet.json();
      setPlanet({ data: planetJSON, error: null, status: "resolved" });
    } else {
      const err = await resPlanet.json();
      setPlanet({ data: null, error: err, status: "rejected" });
    }
    if (resMoons.ok) {
      const moonsJSON = await resMoons.json();
      setMoons(moonsJSON);
    } else {
      setMoons([]);
    }
  }, [id]);

  useEffect(() => {
    fetchPlanet().catch(console.error);
  }, [id, fetchPlanet]);

  function handleUpdatePlanet() {
    fetchPlanet();
    setShowEdit(false);
  }

  function handleAddMoon(newMoon) {
    setMoons((moons) => [...moons, newMoon]);
  }

  function handleDeleteMoon(id) {
    fetch(`/moons/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setMoons((moons) => moons.filter((moon) => moon.id !== id));
      }
    });
  }

  function handleUpdateMoon(updatedMoon) {
    setMoons(
      moons.map((moon) => (moon.id === updatedMoon.id ? updatedMoon : moon))
    );
  }

  let moonCards = moons.map((moon) => (
    <MoonCard
      key={moon.id}
      moon={moon}
      onDelete={handleDeleteMoon}
      onUpdate={handleUpdateMoon}
    />
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
      <MoonForm onMoonRequest={handleAddMoon} planetId={id} edit={false} />
    </div>
  );
}

export default PlanetDetail;
