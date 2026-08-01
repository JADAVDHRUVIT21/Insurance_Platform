from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

from app.models.user import User

profile_bp = Blueprint(
    "profile",
    __name__,
    url_prefix="/api/profile"
)


@profile_bp.route("/", methods=["GET"])
@jwt_required()
def get_profile():

    print("========== PROFILE API ==========")

    user_id = get_jwt_identity()

    print("JWT User ID:", user_id)

    user = User.query.get(int(user_id))

    print("User:", user)

    if not user:
        return jsonify({
            "status": "error",
            "message": "User not found"
        }), 404

    print("Profile Loaded Successfully")

    return jsonify({
        "status": "success",
        "user": user.to_dict()
    })