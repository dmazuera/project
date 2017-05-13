from jinja2 import StrictUndefined

from flask import Flask, jsonify, render_template, request, flash, redirect
from flask_debugtoolbar import DebugToolbarExtension

from model_project import connect_to_db, db, User


app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = "ABC"

# Normally, if you use an undefined variable in Jinja2, it fails
# silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined


@app.route('/')
def index():
    """Homepage."""

    return render_template("homepage.html")



@app.route('/new_user')
def new_user():
    """Create a user page."""

    return render_template("add_user.html")



@app.route('/process_new_user', methods=['POST'])
def process_new_user():
    """Process new user to User DB."""

    # Get form variables
    first_name = request.form["fname"]
    last_name = request.form["lname"]
    email = request.form["email"]
    password = request.form["password"]
    phone = request.form["lname"]
    zipcode = request.form["zipcode"]
    description = request.form["description"]

    # To add this customer to db:
    # 1. Create the user
    user = User(fname=first_name, lname=last_name, phone=phone, email=email, password=password)

    # 2. Add this customer to session
    db.session.add(user)

    # 3. Commit the changes
    db.session.commit()

    # 4. Display a flash message to confirm user added
    flash("User added successfully!!!")

    return redirect("/")












if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    app.jinja_env.auto_reload = app.debug  # make sure templates, etc. are not cached in debug mode

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)


    
    app.run(port=5000, host='0.0.0.0')
