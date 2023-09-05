from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length, Range
from models import Planet


class MoonSchema(Schema):
    id = fields.Int(dump_only=True)
    name = fields.Str(required=True, validate=Length(
        min=1, error="Must not be empty string."))
    orbital_period = fields.Float(required=True, validate=Range(min=0))
    planet_id = fields.Int(required=True)

    @validates("planet_id")
    def planet_foreign_key(self, value):
        """planet_id is valid foreign key"""
        if value not in Planet.all.keys():
            raise ValidationError(
                f"Foreign key violation for planet_id {value}.")


class PlanetSchema(Schema):

    id = fields.Int(dump_only=True)
    name = fields.Str(required=True)
    distance_from_sun = fields.Int(required=True, validate=Range(min=0))

    @validates("name")
    def unique(self, value):
        """name is not empty string and is unique"""
        if not value:
            raise ValidationError("Must not be empty string.")
        if any(planet.name == value for planet in Planet.all.values()):
            raise ValidationError("Must be unique")
