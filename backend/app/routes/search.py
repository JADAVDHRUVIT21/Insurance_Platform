from flask import Blueprint, request, jsonify
from sqlalchemy import or_

from app.models.customer import Customer

search_bp = Blueprint(
    "search",
    __name__,
    url_prefix="/api/search"
)

@search_bp.route("/customers", methods=["GET"])
def search_customers():

    keyword = request.args.get("q", "")

    customers = Customer.query.filter(
        or_(
            Customer.first_name.ilike(f"%{keyword}%"),
            Customer.last_name.ilike(f"%{keyword}%"),
            Customer.email.ilike(f"%{keyword}%"),
            Customer.phone.ilike(f"%{keyword}%")
        )
    ).all()

    return jsonify({
        "status": "success",
        "count": len(customers),
        "customers": [customer.to_dict() for customer in customers]
    })