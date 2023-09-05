from flask.views import MethodView
from flask_smorest import Blueprint, abort

# from setup import db, planets, moons
from models import Planet
from views.schemas import PlanetSchema, MoonSchema

blp = Blueprint("Planet API", __name__, description="Operations on planets")


@blp.route("/planets")
class Planets(MethodView):
    @blp.response(200, PlanetSchema(many=True))
    def get(self):
        """List planets"""
        return Planet.all.values()

    @blp.arguments(PlanetSchema)
    @blp.response(201, PlanetSchema)
    def post(self, fields):
        """Insert a new planet"""
        planet = Planet(**fields)
        return Planet.all[planet.id]


@blp.route("/planets/<int:planet_id>")
class PlanetById(MethodView):
    @blp.response(200, PlanetSchema)
    def get(self, planet_id):
        """Get planet by id"""
        try:
            return Planet.all[planet_id]
        except KeyError:
            abort(404, message=f"Planet {planet_id} not found.")

    @blp.response(204)
    def delete(self, planet_id):
        """Delete planet by id"""
        try:
            del Planet.all[planet_id]
        except KeyError:
            abort(404, message=f"Planet {planet_id} not found.")

    @blp.arguments(PlanetSchema)
    @blp.response(200, PlanetSchema)
    def patch(self, fields, planet_id):
        """Update planet by id"""
        try:
            planet = Planet.all[planet_id]
            for key, value in fields.items():
                setattr(planet, key, value)
            return planet
        except KeyError:
            abort(404, message=f"Planet {planet_id} not found.")


@blp.route("/planets/<int:planet_id>/moons")
class PlanetMoonsById(MethodView):
    @blp.response(200, MoonSchema(many=True))
    def get(self, planet_id):
        """Get planet moons by id"""
        try:
            planet = Planet.all[planet_id]
            return planet.moons()
        except KeyError:
            abort(404, message=f"Planet {planet_id} not found.")
