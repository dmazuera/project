"""Utility file to seed ratings database from MovieLens data in seed_data/"""

from sqlalchemy import func

from model_project import User, Listings, Rental_Records, connect_to_db, db
from server import app


def load_users():
    """Load users from u.user into database."""

    print "Users"

    for i, row in enumerate(open("test_userdata.txt")):
        row = row.rstrip()
        user_id, username, first_name, last_name, email, password, phone, ip_address, city, is_activated= row.split(",")

        user = User(first_name=first_name,
                    last_name=last_name,
                    phone=phone,
                    email=email,
                    password=password,
                    is_activated=is_activated)
        
        db.session.add(user)

        if i % 100 == 0:
            print i

    db.session.commit()


def load_listings():
    """Load movies from u.item into database."""

    print "Listings"

    for i, row in enumerate(open("test_data.txt")):
        row = row.rstrip()

        business, address, yelp_url, phone, lat, lng  = row.split("|")

        zipcode = address[-5:]   
        lat = lat[:-3]

        listings = Listings(business=business,
                      address=address,
                      zipcode=zipcode,
                      phone=phone,
                      lat=float(lat),
                      lng=float(lng))
        
        # owner_id = 

        db.session.add(listings)

        if i % 100 == 0:
            print i

    db.session.commit()




def set_val_Listing_id():
    """Set value for the next user_id after seeding database"""

    # Get the Max user_id in the database
    result = db.session.query(func.max(Listings.listing_id)).one()
    max_id = int(result[0])

    # Set the value for the next user_id to be max_id + 1
    query = "SELECT setval('listings_listing_id_seq', :new_id)"
    db.session.execute(query, {'new_id': max_id + 1})
    db.session.commit()


if __name__ == "__main__":
    connect_to_db(app)
    db.create_all()

    load_users()
    load_listings()
    # set_val_user_id()

 
