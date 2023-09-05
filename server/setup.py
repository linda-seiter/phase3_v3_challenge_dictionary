from flask import Flask
from flask_migrate import Migrate
from flask_smorest import Api

from default_config import DefaultConfig
from models import Planet, Moon

app = Flask(__name__)
app.config.from_object(DefaultConfig)
app.json.compact = False

# Seed the Planet and Moon dictionaries
mercury = Planet(name="Mercury", distance_from_sun=35000000)
venus = Planet(name="Venus", distance_from_sun=67000000)
earth = Planet(name="Earth", distance_from_sun=93000000)
mars = Planet(name="Mars", distance_from_sun=142000000)

Moon(name="Moon", orbital_period=27.3, planet_id=earth.id)
Moon(name="Phobos", orbital_period=0.3, planet_id=mars.id)
Moon(name="Deimos", orbital_period=1.4, planet_id=mars.id)

api = Api(app)
