from flask.views import MethodView
from flask_smorest import Blueprint, abort

from model import Moon
from views.schema import MoonSchema

blp = Blueprint("Moon API", __name__, description="Operations on moons")


@blp.route("/moons")
class Moons(MethodView):
    @blp.response(200, MoonSchema(many=True))
    def get(self):
        """List moons"""
        return Moon.all.values()

    @blp.arguments(MoonSchema)
    @blp.response(201, MoonSchema)
    def post(self, fields):
        """Insert a new moon"""
        moon = Moon(**fields)
        return moon


@blp.route("/moons/<string:moon_id>")
class MoonById(MethodView):
    @blp.response(200, MoonSchema)
    def get(self, moon_id):
        """Get moon by id"""
        moon = Moon.all.get(moon_id)
        if moon is None:
            abort(404, message=f"Moon {moon_id} not found.")
        return moon

    @blp.response(204)
    def delete(self, moon_id):
        """Delete moon by id"""
        try:
            del Moon.all[moon_id]
        except KeyError:
            abort(404, message=f"Moon {moon_id} not found.")

    @blp.arguments(MoonSchema)
    @blp.response(200, MoonSchema)
    def patch(self, fields, moon_id):
        """Update moon by id"""
        moon = Moon.all.get(moon_id)
        if moon is None:
            abort(404, message=f"Moon {moon_id} not found.")
        for key, value in fields.items():
            setattr(moon, key, value)
        return moon
            
