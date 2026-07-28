from flask import Blueprint, request
from flask_jwt_extended import create_access_token

from app.extensions import db
from app.models.user import User

auth_bp = Blueprint(
    "auth",
    __name__,
    url_prefix="/api/auth"
)


@auth_bp.route("/test", methods=["GET"])
def test():
    """
    Authentication Test
    ---
    tags:
      - Authentication

    responses:
      200:
        description: Authentication route is working
    """
    return {
        "status": "success",
        "message": "Authentication route is working!"
    }


@auth_bp.route("/register", methods=["POST"])
def register():
    """
    Register User
    ---
    tags:
      - Authentication

    parameters:
      - in: body
        name: body
        required: true
        schema:
          properties:
            name:
              type: string
              example: Dhruvit
            email:
              type: string
              example: dhruvit@gmail.com
            password:
              type: string
              example: admin123
            role:
              type: string
              example: admin

    responses:
      201:
        description: User registered successfully
      400:
        description: Validation Error
      409:
        description: Email already exists
    """

    data = request.get_json()

    if not data:
        return {"message": "No data received"}, 400

    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "customer")

    if not name or not email or not password:
        return {"message": "All fields are required"}, 400

    existing = User.query.filter_by(email=email).first()

    if existing:
        return {"message": "Email already exists"}, 409

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
    """
    User Login
    ---
    tags:
      - Authentication

    parameters:
      - in: body
        name: body
        required: true
        schema:
          properties:
            email:
              type: string
              example: dhruvit@gmail.com
            password:
              type: string
              example: admin123

    responses:
      200:
        description: Login successful
      401:
        description: Invalid email or password
    """

    data = request.get_json(force=True)

    if not data:
        return {"message": "No data received"}, 400

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user is None:
        return {"message": "Invalid email or password"}, 401

    if not user.check_password(password):
        return {"message": "Invalid email or password"}, 401

    token = create_access_token(
        identity=str(user.id),
        additional_claims={
            "role": user.role,
            "name": user.name
        }
    )

    return {
        "status": "success",
        "message": "Login successful",
        "token": token,
        "user": user.to_dict()
    }, 200