import React, { useState } from "react";

export default function MoonForm({
  onMoonRequest,
  planetId,
  moon = {
    name: "",
    orbital_period: 0,
    planet_id: planetId,
  },
  edit,
}) {
  const [formData, setFormData] = useState(moon);
  const [errors, setErrors] = useState([]);

  async function postMoon() {
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const res = await fetch("/moons", config);
    if (res.ok) {
      const newMoon = await res.json();
      onMoonRequest(newMoon);
      setFormData({
        name: "",
        orbital_period: 0,
        planet_id: planetId,
      });
      setErrors([]);
    } else {
      const messages = await res.json();
      setErrors([JSON.stringify(messages.errors)]);
    }
  }

  async function updateMoon() {
    const updateData = {
      name: formData.name,
      orbital_period: formData.orbital_period,
      planet_id: planetId,
    };
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    };
    const res = await fetch(`/moons/${moon.id}`, config);
    if (res.ok) {
      onMoonRequest();
      setFormData({
        name: "",
        orbital_period: 0,
        planet_id: planetId,
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
      updateMoon();
    } else {
      postMoon();
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
        <h2>{moon.name ? "Edit Moon" : "Add New Moon"}</h2>
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
          <label htmlFor="orbital_period">Orbital period (days):</label>
        </div>
        <div>
          <input
            type="number"
            id="orbital_period"
            placeholder="Enter orbital period (days)"
            value={formData.orbital_period}
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
