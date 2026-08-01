from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models.company import Company
from app.middleware.role_required import role_required

company_bp = Blueprint(
    "company",
    __name__,
    url_prefix="/api/companies"
)

# ======================================
# Create Company
# ======================================

@company_bp.route("", methods=["POST"])
@company_bp.route("/", methods=["POST"])
@jwt_required()
@role_required("admin")
def create_company():

    data = request.get_json()

    if not data:
        return jsonify({
            "status": "error",
            "message": "No data received"
        }), 400

    if not data.get("company_name"):
        return jsonify({
            "status": "error",
            "message": "Company name is required"
        }), 400

    existing = Company.query.filter_by(
        company_name=data["company_name"]
    ).first()

    if existing:
        return jsonify({
            "status": "error",
            "message": "Company already exists"
        }), 409

    company = Company(
        company_name=data.get("company_name"),
        company_code=data.get("company_code"),
        email=data.get("email"),
        phone=data.get("phone"),
        website=data.get("website"),
        address=data.get("address"),
        city=data.get("city"),
        state=data.get("state")
    )

    db.session.add(company)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Company created successfully",
        "company": company.to_dict()
    }), 201


# ======================================
# Get All Companies
# ======================================

@company_bp.route("", methods=["GET"])
@company_bp.route("/", methods=["GET"])
def get_companies():

    companies = Company.query.all()

    return jsonify({
        "status": "success",
        "count": len(companies),
        "companies": [c.to_dict() for c in companies]
    })


# ======================================
# Get Company By ID
# ======================================

@company_bp.route("/<int:id>", methods=["GET"])
def get_company(id):

    company = Company.query.get_or_404(id)

    return jsonify({
        "status": "success",
        "company": company.to_dict()
    })


# ======================================
# Update Company
# ======================================

@company_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
@role_required("admin")
def update_company(id):

    company = Company.query.get_or_404(id)

    data = request.get_json()

    if not data:
        return jsonify({
            "status": "error",
            "message": "No data received"
        }), 400

    if "company_name" in data:
        duplicate = Company.query.filter(
            Company.company_name == data["company_name"],
            Company.id != id
        ).first()

        if duplicate:
            return jsonify({
                "status": "error",
                "message": "Company name already exists"
            }), 409

    company.company_name = data.get("company_name", company.company_name)
    company.company_code = data.get("company_code", company.company_code)
    company.email = data.get("email", company.email)
    company.phone = data.get("phone", company.phone)
    company.website = data.get("website", company.website)
    company.address = data.get("address", company.address)
    company.city = data.get("city", company.city)
    company.state = data.get("state", company.state)

    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Company updated successfully",
        "company": company.to_dict()
    })


# ======================================
# Delete Company
# ======================================

@company_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("admin")
def delete_company(id):

    company = Company.query.get_or_404(id)

    db.session.delete(company)
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": "Company deleted successfully"
    })