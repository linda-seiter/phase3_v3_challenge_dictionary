import React, { useState } from "react";

export default function PlanetForm({
  onPlanetRequest,
  planet = {
    name: "",
    distance_from_sun: 0,
  },
  edit,
}) {
  const [formData, setFormData] = useState(planet);
  const [errors, setErrors] = useState([]);

  async function postPlanet() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/planets", config);
    if (res.ok) {
      const newPlanet = await res.json();
      onPlanetRequest(newPlanet);
      setFormData({
        name: "",
        distance_from_sun: 0,
      });
      setErrors([]);
    } else {
      const messages = await res.json();
      setErrors([JSON.stringify(messages.errors)]);
    }
  }

  async function updatePlanet() {
    const updateData = {
      name: formData.name,
      distance_from_sun: formData.distance_from_sun,
    };
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    };
    const res = await fetch(`/planets/${planet.id}`, config);
    if (res.ok) {
      onPlanetRequest();
      setFormData({
        name: "",
        distance_from_sun: 0,
      });
      setErrors([]);
    } else {
      const messages = await res.json();
      setErrors([JSON.stringify(messages.errors)]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (edit) {
      updatePlanet();
    } else {
      postPlanet();
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h2>{planet.name ? "Edit Planet" : "Add New Planet"}</h2>
        <div>
          <label htmlFor="name">Name:</label>
        </div>
        <div>
          <input
            type="text"
            id="name"
            placeholder="Enter name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="distance_from_sun">Distance from sun (miles):</label>
        </div>
        <div>
          <input
            type="number"
            id="distance_from_sun"
            placeholder="Enter distance from sun"
            value={formData.distance_from_sun}
            onChange={handleChange}
          />
        </div>
        {errors.map((err) => (
          <p key={err} style={{ color: "red" }}>
            {err}
          </p>
        ))}
        <button type="submit">Submit</button>
      </form>
    </section>
  );
}
