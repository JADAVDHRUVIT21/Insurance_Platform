from functools import wraps

from flask_jwt_extended import (
    verify_jwt_in_request,
    get_jwt
)

from flask import jsonify


def role_required(*roles):

    def wrapper(fn):

        @wraps(fn)
        def decorator(*args, **kwargs):

            verify_jwt_in_request()

            claims = get_jwt()

            if claims.get("role") not in roles:
                return jsonify({
                    "status": "error",
                    "message": "Access Denied"
                }), 403

            return fn(*args, **kwargs)

        return decorator

    return wrapper