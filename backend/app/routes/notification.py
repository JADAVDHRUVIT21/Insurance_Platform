from flask import Blueprint, request, jsonify
from app.extensions import db
from app.models.notification import Notification

notification_bp = Blueprint(
    "notification",
    __name__,
    url_prefix="/api/notifications"
)


@notification_bp.route("/", methods=["POST"])
def create_notification():

    data = request.get_json()

    notification = Notification(
        title=data["title"],
        message=data["message"],
        notification_type=data["notification_type"]
    )

    db.session.add(notification)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Notification created successfully",
        "notification": notification.to_dict()
    }), 201


@notification_bp.route("/", methods=["GET"])
def get_notifications():

    notifications = Notification.query.order_by(
        Notification.created_at.desc()
    ).all()

    return jsonify({
        "status": "success",
        "notifications": [
            n.to_dict() for n in notifications
        ]
    })


@notification_bp.route("/<int:id>/read", methods=["PUT"])
def mark_as_read(id):

    notification = Notification.query.get_or_404(id)

    notification.is_read = True

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Notification marked as read"
    })


@notification_bp.route("/<int:id>", methods=["DELETE"])
def delete_notification(id):

    notification = Notification.query.get_or_404(id)

    db.session.delete(notification)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Notification deleted"
    })