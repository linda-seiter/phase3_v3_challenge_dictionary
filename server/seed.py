from models import Planet, Moon


def seed():
    # Initialize the Planet and Moon dictionaries
    Planet(name="Mercury", distance_from_sun=35000000)
    Planet(name="Venus", distance_from_sun=67000000)
    earth = Planet(name="Earth", distance_from_sun=93000000)
    mars = Planet(name="Mars", distance_from_sun=142000000)

    Moon(name="Moon", orbital_period=27.3, planet_id=earth.id)
    Moon(name="Phobos", orbital_period=0.3, planet_id=mars.id)
    Moon(name="Deimos", orbital_period=1.4, planet_id=mars.id)
