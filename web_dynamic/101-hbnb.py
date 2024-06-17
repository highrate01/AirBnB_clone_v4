#!/usr/bin/python3
"""
Flask App that integrates with AirBnB static HTML Template
"""
from flask import Flask, render_template, url_for
from models import storage
import uuid

# flask setup
app = Flask(__name__)
app.url_map.strict_slashes = False


# begin flask page rendering
@app.teardown_appcontext
def teardown_db(exception):
    """
    close session after each request
    """
    storage.close()


@app.route('/101-hbnb')
def hbnb_filters(the_id=None):
    """
    handles request to custom template with states, cities & amentities
    """
    cache_id = uuid.uuid4()
    state_objs = storage.all('State').values()
    states = dict([state.name, state] for state in state_objs)
    amens = storage.all('Amenity').values()
    places = storage.all('Place').values()
    users = dict([user.id, "{} {}".format(user.first_name, user.last_name)]
                 for user in storage.all('User').values())

    return render_template('101-hbnb.html',
                           cache_id=cache_id,
                           states=state_objs,
                           amens=amens,
                           places=places,
                           users=users)


if __name__ == "__main__":
    """
    MAIN Flask App"""
    app.run(host='0.0.0.0', port=5000)
