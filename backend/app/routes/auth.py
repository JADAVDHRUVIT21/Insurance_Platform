from flask import Blueprint, request
from app.extensions import db
from app.models.user import User
from flask_jwt_extended import create_access_token

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")


@auth_bp.route("/test", methods=["GET"])
def test():
    return {
        "status": "success",
        "message": "Authentication route is working!"
    }


@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    if not data:
        return {"message": "No data received"}, 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "customer")

    if not name or not email or not password:
        return {
            "message": "All fields are required"
        }, 400

    existing = User.query.filter_by(email=email).first()

    if existing:
        return {
            "message": "Email already exists"
        }, 409

    user = User(
        name=name,
        email=email,
        role=role
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return {
        "status": "success",
        "message": "User registered successfully",
        "user": user.to_dict()
    }, 201
    
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    if not data:
        return {
            "message": "No data received"
        }, 400

    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return {
            "message": "Email and password are required"
        }, 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return {
            "message": "Invalid email or password"
        }, 401

    if not user.check_password(password):
        return {
            "message": "Invalid email or password"
        }, 401

    access_token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role,
            "name": user.name
        }
    )

    return {
        "status": "success",
        "message": "Login successful",
        "token": access_token,
        "user": user.to_dict()
    }, 200