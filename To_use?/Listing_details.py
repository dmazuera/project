##### SHOW MORE DETAILS OF LISTING


@app.route("/places/<int:place_id>", methods=['GET'])
def place_details(place_id):
    """Show more details about selected place."""

    place = db.session.query(Place).get(place_id)

    return render_template("place.html", place=place)


@app.route("/post_comment.json", methods=['POST'])
def post_comment():
    """Stores new comment in database"""

    user_id = session.get("user_id")
    place_id = request.form["place_id"]
    review = request.form["reviewtext"]

    new_comment = Comment(user_id=user_id, place_id=place_id, review=review)

    db.session.add(new_comment)
    db.session.commit()

    comment_in_db = db.session.query(Comment).filter(Comment.user_id==user_id, Comment.place_id==place_id, Comment.review==review).first()

    return jsonify({"user_id": user_id,
                    "avatar": comment_in_db.user.picture,
                    "comment": review,
                    "user_name": comment_in_db.user.name,
                    "comment_id":comment_in_db.comment_id})

