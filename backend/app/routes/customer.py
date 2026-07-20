from flask import Blueprint, request
from datetime import datetime
from app.extensions import db
from app.models.customer import Customer

customer_bp = Blueprint(
    "customer",
    __name__,
    url_prefix="/api/customers"
)


# ----------------------------
# Create Customer
# ----------------------------
@customer_bp.route("/", methods=["POST"])
def create_customer():
    try:
        data = request.get_json()

        if not data:
            return {"message": "No data received"}, 400

        required_fields = [
            "first_name",
            "last_name",
            "email",
            "phone"
        ]

        for field in required_fields:
            if not data.get(field):
                return {
                    "status": "error",
                    "message": f"{field} is required"
                }, 400

        # Check duplicate email
        existing = Customer.query.filter_by(
            email=data["email"]
        ).first()

        if existing:
            return {
                "status": "error",
                "message": "Customer email already exists"
            }, 409

        dob = None

        if data.get("dob"):
            dob = datetime.strptime(
                data["dob"],
                "%Y-%m-%d"
            ).date()

        customer = Customer(
            first_name=data["first_name"],
            last_name=data["last_name"],
            email=data["email"],
            phone=data["phone"],
            gender=data.get("gender"),
            dob=dob,
            address=data.get("address"),
            city=data.get("city"),
            state=data.get("state"),
            pincode=data.get("pincode")
        )

        db.session.add(customer)
        db.session.commit()

        return {
            "status": "success",
            "message": "Customer created successfully",
            "customer": customer.to_dict()
        }, 201

    except Exception as e:
        db.session.rollback()

        return {
            "status": "error",
            "message": str(e)
        }, 500


# ----------------------------
# Get All Customers
# ----------------------------
@customer_bp.route("/", methods=["GET"])
def get_customers():

    customers = Customer.query.order_by(Customer.id.desc()).all()

    return {
        "status": "success",
        "count": len(customers),
        "customers": [customer.to_dict() for customer in customers]
    }


# ----------------------------
# Get Customer By ID
# ----------------------------
@customer_bp.route("/<int:id>", methods=["GET"])
def get_customer(id):

    customer = Customer.query.get(id)

    if not customer:
        return {
            "status": "error",
            "message": "Customer not found"
        }, 404

    return {
        "status": "success",
        "customer": customer.to_dict()
    }


# ----------------------------
# Update Customer
# ----------------------------
@customer_bp.route("/<int:id>", methods=["PUT"])
def update_customer(id):

    customer = Customer.query.get(id)

    if not customer:
        return {
            "status": "error",
            "message": "Customer not found"
        }, 404

    data = request.get_json()

    customer.first_name = data.get(
        "first_name",
        customer.first_name
    )

    customer.last_name = data.get(
        "last_name",
        customer.last_name
    )

    customer.email = data.get(
        "email",
        customer.email
    )

    customer.phone = data.get(
        "phone",
        customer.phone
    )

    customer.gender = data.get(
        "gender",
        customer.gender
    )

    if data.get("dob"):
        customer.dob = datetime.strptime(
            data["dob"],
            "%Y-%m-%d"
        ).date()

    customer.address = data.get(
        "address",
        customer.address
    )

    customer.city = data.get(
        "city",
        customer.city
    )

    customer.state = data.get(
        "state",
        customer.state
    )

    customer.pincode = data.get(
        "pincode",
        customer.pincode
    )

    db.session.commit()

    return {
        "status": "success",
        "message": "Customer updated successfully",
        "customer": customer.to_dict()
    }


# ----------------------------
# Delete Customer
# ----------------------------
@customer_bp.route("/<int:id>", methods=["DELETE"])
def delete_customer(id):

    customer = Customer.query.get(id)

    if not customer:
        return {
            "status": "error",
            "message": "Customer not found"
        }, 404

    db.session.delete(customer)
    db.session.commit()

    return {
        "status": "success",
        "message": "Customer deleted successfully"
    }