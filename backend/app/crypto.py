import jwt

from app.database import User

bcrypt = None  # inited in __init__.py
SECRET = "secret"  # to be changed when deploying
CURRENT_JWT_VERSION = 1


def create_token_for_user(user_id):
    return jwt.encode({"v": CURRENT_JWT_VERSION, "uid": user_id}, SECRET, algorithm="HS256")


# return None if token is not valid or user not found
def get_user_from_token(token):
    if token is None:
        return None
    payload = jwt.decode(token.encode(), SECRET, algorithms=["HS256"])
    if payload["v"] != CURRENT_JWT_VERSION:
        return None
    return User.query.filter_by(id=payload["uid"]).first()


def verify_password(hashed, input):
    return bcrypt.check_password_hash(hashed, input)


def hash_password(pwd):
    return bcrypt.generate_password_hash(pwd)
