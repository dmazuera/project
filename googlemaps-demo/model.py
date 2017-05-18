"""Data model for bears."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

#---------------------------------------------------------------------#

class Bear(db.Model):
    """Map points for bears."""

    __tablename__ = "bears"

    marker_id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    bear_id = db.Column(db.String(64), nullable=True)
    gender = db.Column(db.String(64), nullable=True)
    birth_year = db.Column(db.String(64), nullable=True)
    cap_year = db.Column(db.String(64), nullable=True)
    cap_lat = db.Column(db.String(15), nullable=True)
    cap_long = db.Column(db.String(15), nullable=True)
    collared = db.Column(db.String(15), nullable=True)

    def __repr__(self):
        """Clear representation of bear."""

        return "<Bear marker_id={marker_id} bear_id={bear_id}>".format(marker_id=self.marker_id, bear_id=self.bear_id)


#---------------------------------------------------------------------#

def connect_to_db(app):
    """Connect the database to Flask app."""

    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///bears'
    db.app = app
    db.init_app(app)


if __name__ == "__main__":
    from server import app
    connect_to_db(app)
    print "Connected to DB."
