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

    user_id = get_jwt_identity()

    user = User.query.get(int(user_id))

    if not user:
        return jsonify({
            "status": "error",
            "message": "User not found"
        }), 404

    return jsonify({
        "status": "success",
        "user": user.to_dict()
    })