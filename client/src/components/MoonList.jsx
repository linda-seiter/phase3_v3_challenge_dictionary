import React, { useState, useEffect, useCallback } from "react";
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

  const fetchMoons = useCallback(async () => {
    const res = await fetch(`/planets/${planetId}/moons`);
    if (res.ok) {
      const moonsJSON = await res.json();
      setMoons(moonsJSON);
    } else {
      setMoons([]);
    }
  }, [planetId]);

  useEffect(() => {
    fetchMoons().catch(console.error);
  }, [planetId, fetchMoons]);

  function handleDeleteMoon(id) {
    fetch(`/moons/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setMoons((moons) => moons.filter((moon) => moon.id !== id));
      }
    });
  }

  function handleUpdateMoon() {
    fetchMoons();
  }

  let moonCards = moons.map((moon) => (
    <MoonCard
      key={moon.id}
      moon={moon}
      onDelete={handleDeleteMoon}
      onUpdate={handleUpdateMoon}
    />
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
