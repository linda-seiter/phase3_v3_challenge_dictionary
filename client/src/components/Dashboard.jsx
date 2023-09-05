import React, { Suspense, useState, useEffect } from "react";
import PlanetCard from "./PlanetCard";
import PlanetForm from "./PlanetForm";
import GridLoader from "react-spinners/GridLoader";

function Dashboard() {
  const [planets, setPlanets] = useState([]);

  useEffect(() => {
    const fetchPlanets = async () => {
      const response = await fetch("/planets");
      const planetArr = await response.json();
      setPlanets(planetArr);
    };
    fetchPlanets().catch(console.error);
  }, []);

  function handleAddPlanet(newPlanet) {
    setPlanets((planets) => [...planets, newPlanet]);
  }

  function handleDeletePlanet(id) {
    fetch(`/planets/${id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setPlanets((planets) => planets.filter((planet) => planet.id !== id));
      }
    });
  }

  let planetCards = planets.map((planet) => (
    <PlanetCard key={planet.id} planet={planet} onDelete={handleDeletePlanet} />
  ));

  return (
    <>
      <Suspense fallback={<GridLoader />}>
        <h1>Planets</h1>
        <div className="planetList">{planetCards}</div>
      </Suspense>
      <hr />
      <PlanetForm onPlanetRequest={handleAddPlanet} edit={false} />
    </>
  );
}

export default Dashboard;
