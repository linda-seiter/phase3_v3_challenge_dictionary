import uuid

class Planet():
    """Planet model"""

    all = {}

    def __init__(self, name, distance_from_sun):
        self.id = str(uuid.uuid4())
        self.name = name
        self.distance_from_sun = distance_from_sun
        type(self).all[self.id] = self  
        

    def moons(self):
        """Get list of moons for this planet"""
        return [moon for moon in Moon.all.values() if moon.planet_id == self.id]


class Moon():
    """Moon model"""

    all = {}

    def __init__(self, name, orbital_period, planet_id):
        self.id = str(uuid.uuid4())
        self.name = name
        self.orbital_period = orbital_period
        self.planet_id = planet_id  
        type(self).all[self.id] = self  

    def planet(self):
        """Get planet using planet_id as key"""
        return Planet.all.get(self.planet_id)
