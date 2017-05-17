

@app.route("/users/<int:user_id>")
def profile(user_id):
    """Show user's profile"""

    user = db.session.query(User).get(user_id)

    return render_template("user.html", user=user)

@app.route("/edit_profile", methods=['POST'])
def edit_profile():
    """Edit user's profile"""

    user_id = request.form.get("user_id")
    description = request.form.get("description")

    user = db.session.query(User).get(int(user_id))
    user.description = description
    db.session.commit()

    return jsonify({"description": description})




@app.route('/save_picture.json', methods=['POST'])
def upload():
    """Saving user's profile picture ID in database. 
    ID of picture uploaded on Imgur is provided by Imgur's API."""

    picture_id = request.form.get('pic_id')
    ext = request.form.get('extension')
    user_id = session.get("user_id")   
    
    base = "http://i.imgur.com/"
    pic_id = picture_id
    size = 't'
    link = base + pic_id + size + '.' + ext

    user = db.session.query(User).get(user_id)
    user.picture = link
    db.session.commit()

    return jsonify({"pic_url":link})
