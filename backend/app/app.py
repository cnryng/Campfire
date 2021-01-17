import datetime
import time

import pytz
from flask import Blueprint, jsonify, request, g

from app.crossdomain import crossdomain
from app.crypto import *
from app.database import db, Post, User

api = Blueprint('api', __name__)


def get_arg(name: str, default: str = ""):
    json_obj = request.get_json(silent=True)
    if json_obj is not None and name in json_obj: return json_obj[name]
    return request.values[name] if name in request.values else default


def get_user_from_request():
    session = request.cookies.get("session")
    if session is None or session == "":
        session = get_arg("session")
    return get_user_from_token(session)


@api.route('/')
def hello():
    return jsonify({"success": True})


# list today's posts
@api.route('list')
@crossdomain('http://localhost:3000')
def list_posts():
    today = datetime.datetime.now(tz=pytz.timezone('US/Eastern'))
    start = today.replace(hour=0, minute=0, second=0, microsecond=0)
    end = start + datetime.timedelta(1)
    posts = Post.query.filter(start.timestamp() <= Post.time, Post.time <= end.timestamp())
    return jsonify({"success": True, "posts": list(map(lambda p: p.export(), posts))})



@api.route('stats', methods=['GET', 'POST', 'OPTIONS'])
@crossdomain('http://localhost:3000')
def stats():
    user = get_user_from_request()
    if user is None:
        return jsonify({"success": False})
    posts = user.posts
    total_comments = 0
    total_emoji_response = 0
    for post in posts:
        import json
        total_comments += len(json.loads(post.comments))
        total_emoji_response += sum(json.loads(post.reacts).values())

    return jsonify({"success": True, "stats": {
        "n_posts": len(posts),
        "total_comments": total_comments,
        "total_emoji_response": total_emoji_response
    }})


@api.route('daily_prompt')
@crossdomain('http://localhost:3000')
def prompt():
    return jsonify({"success": True, "prompt": "do you like cat or dog?"})


# arg: post_id, react
@api.route('react', methods=['POST', 'OPTIONS'])
@crossdomain('http://localhost:3000')
def react():
    react = get_arg('react')
    if react is None or react == "":
        return jsonify({"success": False})

    post = Post.query.filter_by(id=get_arg('post_id')).first()
    if post is None:
        return jsonify({"success": False})

    post.add_react(react=get_arg('react'))
    db.session.commit()
    return jsonify({"success": True})


# arg: post_id, comment
@api.route('comment', methods=['POST', 'OPTIONS'])
@crossdomain('http://localhost:3000')
def comment():
    comment = get_arg('comment')
    if comment is None or comment == "":
        return jsonify({"success": False})

    post = Post.query.filter_by(id=get_arg('post_id')).first()

    if post is None:
        return jsonify({"success": False})

    post.add_comment(comment=get_arg('comment'))
    db.session.commit()
    return jsonify({"success": True})


# arg: content, anonymous (boolean), prompt
@api.route('post', methods=['POST', 'OPTIONS'])
@crossdomain('http://localhost:3000')
def write_post():
    user = get_user_from_request()
    content = get_arg('content')
    prompt = get_arg('prompt')
    if content is None or content == "":
        return jsonify({"success": False, "reason": "Content can't be empty"})
    if user is None or get_arg("anonymous"):
        db.session.add(Post(content=content, prompt=prompt, time=int(time.time()), anonymous=True))
    else:
        db.session.add(Post(content=content, prompt=prompt, time=int(time.time()), poster_id=user.id))
    db.session.commit()
    return jsonify({"success": True})


# arg: username, password
@api.route('user/register', methods=['POST', 'OPTIONS'])
@crossdomain('http://localhost:3000')
def register():
    username = get_arg('username')
    password = get_arg('password')
    if username is None or username == "" or password is None or password == "":
        return jsonify({"success": False, "reason": "Username and password can't be empty"})
    if User.query.filter_by(username=username).first() is not None:
        return jsonify({"success": False, "reason": "Username already used"})
    db.session.add(User(username=username, hashed_password=hash_password(password)))
    db.session.commit()
    return jsonify({"success": True})


# arg: username, password
@api.route('user/login', methods=['POST', 'OPTIONS'])
@crossdomain('*')
def login():
    username = get_arg('username')
    password = get_arg('password')
    if username is None or username == "" or password is None or password == "":
        return jsonify({"success": False, "reason": "Username and password can't be empty"})
    user = User.query.filter_by(username=username).first()
    if user is None or not verify_password(user.hashed_password, password):
        return jsonify({"success": False, "reason": "Username or password is incorrect"})

    session = create_token_for_user(user.id)
    resp = jsonify({"success": True, "session": session})
    resp.set_cookie('session', session, max_age=30*24*60*60, httponly=True)
    return resp


# arg: session, penname
@api.route('user/change_pen_name', methods=['POST', 'OPTIONS'])
@crossdomain('*')
def change_pen_name():
    penname = get_arg('penname')
    if penname is None or penname == "":
        return jsonify({"success": False, "reason": "Pen name can't be empty"})
    if User.query.filter_by(display_name=penname).first() is not None or User.query.filter_by(username=penname).first() is not None:
        return jsonify({"success": False, "reason": "Pen name already used"})

    user = get_user_from_request()
    user.display_name = penname
    db.session.commit()
    return jsonify({"success": True})



