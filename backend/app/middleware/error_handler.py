from flask import jsonify
import traceback


def register_error_handlers(app):
    print("CUSTOM ERROR HANDLER LOADED")
    @app.errorhandler(400)
    def bad_request(error):
        return jsonify({
            "status": "error",
            "message": "Bad Request"
        }), 400

    @app.errorhandler(401)
    def unauthorized(error):
        return jsonify({
            "status": "error",
            "message": "Unauthorized"
        }), 401

    @app.errorhandler(403)
    def forbidden(error):
        return jsonify({
            "status": "error",
            "message": "Access Denied"
        }), 403

    @app.errorhandler(404)
    def not_found(error):
        return jsonify({
            "status": "error",
            "message": "Resource Not Found"
        }), 404

    @app.errorhandler(Exception)
    def handle_exception(error):
        print("\n========== ERROR ==========")
        traceback.print_exc()
        print("===========================\n")

        return jsonify({
            "status": "error",
            "message": str(error)
        }), 500