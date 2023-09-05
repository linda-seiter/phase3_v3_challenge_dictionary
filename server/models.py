class Planet():
    """Planet model"""

    # Dictionary of Planet objects.
    all = {}

    def __init__(self, name, distance_from_sun):
        self.id = len(type(self).all) + 1
        self.name = name
        self.distance_from_sun = distance_from_sun
        type(self).all[self.id] = self  # add to dictionary using id as key

    def moons(self):
        """Get list of moons for this planet"""
        return [moon for moon in Moon.all.values() if moon.planet_id == self.id]


class Moon():
    """Moon model"""

    # Dictionary of Moon objects.
    all = {}

    def __init__(self, name, orbital_period, planet_id):
        self.id = len(type(self).all) + 1
        self.name = name
        self.orbital_period = orbital_period
        self.planet_id = planet_id
        type(self).all[self.id] = self  # add to dictionary using id as key

    def planet(self):
        """Get planet using planet_id as key"""
        return Planet.all[self.planet_id]
