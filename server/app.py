#!/usr/bin/env python3
from flask import Flask, redirect
from flask_smorest import Api

from default_config import DefaultConfig
from views.planet import blp as PlanetBlueprint
from views.moon import blp as MoonBlueprint
from seed import seed

app = Flask(__name__)
app.config.from_object(DefaultConfig)
app.json.compact = False

# Initialize the Planet and Moon dictionaries
seed()

# Create the API
api = Api(app)

api.register_blueprint(PlanetBlueprint)
api.register_blueprint(MoonBlueprint)

@app.route('/')
def index():
    return redirect(app.config["OPENAPI_SWAGGER_UI_PATH"])

if __name__ == '__main__':
    app.run(port=5555, debug=True)
