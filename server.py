from jinja2 import StrictUndefined

from flask import Flask, jsonify, render_template, request, flash, redirect, session
from flask_debugtoolbar import DebugToolbarExtension

from model_project import connect_to_db, db, User, Listings, Rental_Records
import json



app = Flask(__name__)

# Required to use Flask sessions and the debug toolbar
app.secret_key = "ABC"

# Normally, if you use an undefined variable in Jinja2, it fails
# silently. This is horrible. Fix this so that, instead, it raises an
# error.
app.jinja_env.undefined = StrictUndefined

###################################################

###################################################





@app.route('/')
def index():
    """Homepage."""

    return render_template("homepage.html")



###################################################

#LOGIN 

@app.route('/login', methods=["POST"])
def login_form():
    """     """
    return render_template("homepage.html")



@app.route('/process_login', methods=["POST"])
def process_login():
    """      """

    email = request.form.get('email')
    password = request.form.get('password')

    user = User.query.filter_by(email=email).first()


    if not user:
        #if not user....
        flash("YOU ARE NOT IN THE SYSTEM - please register")
        return redirect("/")
    else:
        if password == user.password:
            # login success
            session["user"] = user.user_id
            flash("Thank you for Logging In!")
            return redirect("/entry_page")


        elif password != user.password:
             flash("Incorrect password Try again")
             return redirect("/")





@app.route('/logout')
def logout():
    """Log out."""


    del session["user_id"]
    flash("Logged Out.")
    return redirect("/")



#######################################################################
# ADD A SPLIT PANE 

@app.route('/entry_page')
def entry_page():
    """     """

    return render_template("entry_page.html")






#######################################################################



#NEW USER

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
    user = User(first_name=first_name, last_name=last_name, phone=phone, 
                email=email, password=password)

    # 2. Add this customer to session
    db.session.add(user)

    # 3. Commit the changes
    db.session.commit()

    # 4. Display a flash message to confirm user added
    flash("User added successfully!!!")

    return redirect("/")




#???????????????????????????????????????????/

@app.route('/account_page')
def account_page(): 
    """" """
    user_id = session.get("user")
    user = User.query.get(user_id)

    #I am passing the whole object "user" to this page... I can then on the page take out of "user" all the attributes
    return render_template("user_info.html", user=user)



# USER PAGE
@app.route("/users/<int:user_id>")
def user_info(user_id):
    """Show info about user."""

    user = User.query.get(user_id)
    return render_template("user.html", user=user)

#??????????????????????????????????????????????????

##########################################################################

#USER  

#homepage has a link that hgets user to user/list page
@app.route("/view_users")
def user_list():
    """Show list of users."""

    users = User.query.all()
    return render_template("user_list.html", users=users)



@app.route("/user/<int:user_id>", methods=['GET'])
def user_detail(user_id):
    """Show info about user.
    If a user is logged in, let them add/edit their page.
    """

    user = User.query.get(user_id)
    user_id = session.get("user_id")

    #below will be all the things a user can SEE that is THEIR own on the PAGE
    if user_id:
        first_name = User.query.filter_by(
            movie_id=movie_id, user_id=user_id).first()

    else:
        user_rating = None

    #passing the items a user will be able to see that is THERE OWN on the HTML page
    return render_template("user_info.html",
                           user=user,
                           user_rating=user_rating)




@app.route("/user/<int:user_id>", methods=['POST'])
def user_edit_process(user_id):
    """Add/edit user info."""

    # Get form variables
    score = int(request.form["score"])

    user_id = session.get("user_id")
    if not user_id:
        raise Exception("No user logged in.")

    rating = Rating.query.filter_by(user_id=user_id, movie_id=movie_id).first()

    if rating:
        rating.score = score
        flash("Rating updated.")

    else:
        rating = Rating(user_id=user_id, movie_id=movie_id, score=score)
        flash("Rating added.")
        db.session.add(rating)

    db.session.commit()

    return redirect("/movies/%s" % movie_id)








############################################################################s


#NEW LISTING
 
@app.route('/new_listing')
def new_listing():
    """Create a listing page."""

    return render_template("add_listing.html")



@app.route('/process_new_listing', methods=['POST'])
def process_new_listing():
    """Process new user to User DB."""

    # Get form variables
    business = request.form["business"]
    phone = request.form["phone"]
    address = request.form["address"]
    zipcode = request.form["zipcode"]
    height_max = request.form["height"]
    width_max = request.form["width"]
    price = request.form["price"]
    # description = request.form["description"]

    
    # To add this customer to db:
    # 1. Create the user
    listing = Listings(business=business, phone=phone, address=address, zipcode=zipcode, 
                       height_max=height_max, width_max=width_max)

    # 2. Add this customer to session
    db.session.add(listing)

    # 3. Commit the changes
    db.session.commit()

    # 4. Display a flash message to confirm user added
    flash("Listing added successfully!!!")

    return redirect("/")





@app.route('/listings.json')
def listing_info():
    """JSON information about bears."""

    listings = {
        listing.listing_id: {
            "ownerId": listing.owner_id,
            "business": listing.business,
            "phone": listing.phone,
            "address": listing.address,
            "zipcode": listing.zipcode,
            "Lat": listing.lat,
            "Long": listing.lng,
            "heightmax": listing.height_max,
            "widthmax": listing.width_max,
            "image": listing.image,
            "price": listing.price
        }
        for listing in Listings.query.all()}

    return jsonify(listings)





#LISTING LIST
@app.route("/view_listing")
def listings_list():
    """Show list of listings."""

    listings = Listings.query.order_by('listing_id').all()
    return render_template("listings_list.html",
                            listings=listings)



@app.route("/listings/<int:listing_id>")
def listing_detail(listing_id):
    """Show info about listing. (copied from Ratings -- info about movie**)
    If a user is logged in, let them add/edit a rating.
    """
    

    print session
    # user_id = session.get("user")
    user_id = 999
    print user_id
    user = User.query.filter_by(user_id=user_id).first()
    print user.email, user.user_id


    print listing_id
    listing = Listings.query.get(listing_id)
    print type(listing)
    print listing.phone

    # if the user is interested in BOOKING... send the user_id, owner_id and listing_id to Rental Records.

  
    return render_template("listing_details.html", listing=listing,
                                                   user=user)


##########################################################################
# HALF PAGE MAP --- other half SEARCH

@app.route('/advertise')
def advertise():
    """Create a listing page."""

    return render_template("map_select_listing.html")



@app.route('/search_zipcode')
def search_zipcode():
    """Show map of SF with search functionality on page."""


    zipcode = request.args.get("zipcode")

    return render_template("map_select_listing.html",
                            zipcode= zipcode)





#USE TO GET OUT listings with the FILTERS!!! Mentioned by user.
@app.route('/filter_search.json')
def filter_search():
    """Show map of SF with filters."""

    low_price = int(request.args.get('lowPrice'))
    high_price = int(request.args.get('highPrice'))
    height = float(request.args.get('height'))
    width = float(request.args.get('width'))
    
    print "hi"
    print "height"
    # Retrieves listings from db_queries
    listings = find_all_listings( height, width, low_price, high_price)

    return jsonify(listings)



#The BELOW is what is Jsonified to send to MARKERs
def find_all_listings(height, width, low_price, high_price):
    """ Finds all the listings within the geocoded location range. """

    # Query for the listings in the database within the latitude and
    # longitude bounds of the user's search with respect to any filters
    #COMMA seperated conditions are ANDS in SQLAlchemy

    listings = {
        listing.listing_id: {
            "ownerId": listing.owner_id,
            "business": listing.business,
            "phone": listing.phone,
            "address": listing.address,
            "zipcode": listing.zipcode,
            "Lat": listing.lat,
            "Long": listing.lng,
            "heightmax": listing.height_max,
            "widthmax": listing.width_max,
            "image": listing.image,
            "price": listing.price
        }
        for listing in Listings.query.filter( (Listings.height_max >= height), 
                                                 (Listings.width_max >= width), 
                                                 (Listings.price >= low_price), 
                                                 (Listings.price <= high_price)).all()}
    return listings





@app.route('/book_listing')
def book_listing():
    """Advertiser interested in Booking. Send an email to the owner of the listing to confirm or deny."""

    return render_template("listing_EMAIL.html") #????????







####################################################################

if __name__ == "__main__":
    # We have to set debug=True here, since it has to be True at the
    # point that we invoke the DebugToolbarExtension
    app.debug = True
    app.jinja_env.auto_reload = app.debug  # make sure templates, etc. are not cached in debug mode

    connect_to_db(app)

    # Use the DebugToolbar
    DebugToolbarExtension(app)


    
    app.run(port=5000, host='0.0.0.0')
