#!/usr/bin/env python3

from flask import redirect
from setup import api, app
from views.planet import blp as PlanetBlueprint
from views.moon import blp as MoonBlueprint

api.register_blueprint(PlanetBlueprint)
api.register_blueprint(MoonBlueprint)


@app.route('/')
def index():
    # return f'<h2><a href={app.config["OPENAPI_SWAGGER_UI_PATH"]}>{app.config["API_TITLE"]}</a></h2>'
    return redirect(app.config["OPENAPI_SWAGGER_UI_PATH"])


if __name__ == '__main__':
    app.run(port=5555, debug=True)
