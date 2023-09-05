import React, { useState, useEffect } from "react";
import MoonCard from "./MoonCard";
import MoonForm from "./MoonForm";

function MoonList({ planetId }) {
  const [moons, setMoons] = useState([]);

  useEffect(() => {
    const fetchMoons = async () => {
      const response = await fetch(`/planets/${planetId}/moons`);
      const moonArr = await response.json();
      setMoons(moonArr);
    };
    fetchMoons().catch(console.error);
  }, [planetId]);

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

  let moonCards = moons.map((moon) => (
    <MoonCard key={moon.id} moon={moon} onDelete={handleDeleteMoon} />
  ));

  return (
    <>
      <hr />
      <h2>Moons:</h2>
      <div className="moonList">{moonCards}</div>
      <hr />
      <MoonForm
        onMoonRequest={handleAddMoon}
        planetId={planetId}
        edit={false}
      />
    </>
  );
}

export default MoonList;
