from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import json

migrate = Migrate()
db = SQLAlchemy()


class Post(db.Model):
    __tablename__ = 'posts'
    id = db.Column(db.Integer, primary_key=True)
    poster_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    poster = db.relationship("User", back_populates="posts")
    anonymous = db.Column(db.Boolean)
    content = db.Column(db.String(1024))
    prompt = db.Column(db.String(1024))
    comments = db.Column(db.String(5000), default='[]')
    reacts = db.Column(db.String(2000), default='{}')
    time = db.Column(db.Integer)

    def export(self):
        common = {"id": self.id,
                  "content": self.content,
                  "time": self.time,
                  "comments": self.comments,
                  "reacts": self.reacts,
                  "prompt": self.prompt
                  }
        print(common)
        if self.anonymous or self.poster is None:
            common.update({"anonymous": True})
        else:
            common.update({"anonymous": False, "poster_name": self.poster.get_display_name()})
        return common

    def add_comment(self, comment):
        self.comments = json.dumps(json.loads(self.comments) + [comment])

    def add_react(self, react):
        current_reacts = json.loads(self.reacts)
        current_reacts[react] = current_reacts.get(react, 0) + 1
        self.reacts = json.dumps(current_reacts)

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(1024))
    hashed_password = db.Column(db.String(32))
    posts = db.relationship("Post", back_populates="poster")
    display_name = db.Column(db.String(50))

    def get_display_name(self):
        if self.display_name is not None:
            return self.display_name
        else:
            return self.username

