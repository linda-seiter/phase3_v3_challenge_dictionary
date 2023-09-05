from marshmallow import Schema, fields, validates, ValidationError
from marshmallow.validate import Length, Range
from model import Planet


class MoonSchema(Schema):
    id = fields.Str(dump_only=True)
    name = fields.Str(required=True, validate=Length(
        min=1, error="Must not be empty string."))
    orbital_period = fields.Float(required=True, validate=Range(min=0))
    planet_id = fields.Str(required=True)

    @validates("planet_id")
    def planet_foreign_key(self, value):
        """planet_id is valid foreign key"""
        if Planet.all.get(value) is None:
            raise ValidationError(f"Foreign key violation for planet_id {value}.")


class PlanetSchema(Schema):

    id = fields.Str(dump_only=True)
    name = fields.Str(required=True, validate=Length(
        min=1, error="Must not be empty string."))
    distance_from_sun = fields.Int(required=True, validate=Range(min=0))
    