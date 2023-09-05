from flask.views import MethodView
from flask_smorest import Blueprint, abort

from models import Moon
from views.schemas import MoonSchema

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
        return Moon.all[moon.id]


@blp.route("/moons/<int:moon_id>")
class MoonById(MethodView):
    @blp.response(200, MoonSchema)
    def get(self, moon_id):
        """Get moon by id"""
        try:
            return Moon.all[moon_id]
        except KeyError:
            abort(404, message=f"Moon {moon_id} not found.")

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
        try:
            moon = Moon.all[moon_id]
            for key, value in fields.items():
                setattr(moon, key, value)
            return moon
        except KeyError:
            abort(404, message=f"Moon {moon_id} not found.")
