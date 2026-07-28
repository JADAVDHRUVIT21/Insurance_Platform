from flask import Blueprint, request
from flask_jwt_extended import jwt_required

from app.extensions import db
from app.models.company import Company
from app.middleware.role_required import role_required

company_bp = Blueprint(
    "company",
    __name__,
    url_prefix="/api/companies"
)

# ======================================================
# Create Company
# ======================================================

@company_bp.route("/", methods=["POST"])
@jwt_required()
@role_required("admin")
def create_company():
    """
    Create Company
    ---
    tags:
      - Company

    security:
      - Bearer: []

    parameters:
      - in: body
        name: body
        required: true
        schema:
          properties:
            company_name:
              type: string
            company_code:
              type: string
            email:
              type: string
            phone:
              type: string
            website:
              type: string
            address:
              type: string
            city:
              type: string
            state:
              type: string

    responses:
      201:
        description: Company created successfully
    """

    data = request.get_json()

    if not data:
        return {
            "status": "error",
            "message": "No data received"
        }, 400

    if not data.get("company_name"):
        return {
            "status": "error",
            "message": "Company name is required"
        }, 400

    existing = Company.query.filter_by(
        company_name=data["company_name"]
    ).first()

    if existing:
        return {
            "status": "error",
            "message": "Company already exists"
        }, 409

    company = Company(
        company_name=data["company_name"],
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

    return {
        "status": "success",
        "message": "Company created successfully",
        "company": company.to_dict()
    }, 201


# ======================================================
# Get All Companies
# ======================================================

@company_bp.route("/", methods=["GET"])
def get_companies():
    """
    Get All Companies
    ---
    tags:
      - Company

    responses:
      200:
        description: List of companies
    """

    companies = Company.query.all()

    return {
        "status": "success",
        "count": len(companies),
        "companies": [
            company.to_dict()
            for company in companies
        ]
    }, 200


# ======================================================
# Get Single Company
# ======================================================

@company_bp.route("/<int:id>", methods=["GET"])
def get_company(id):
    """
    Get Company
    ---
    tags:
      - Company

    parameters:
      - in: path
        name: id
        type: integer
        required: true

    responses:
      200:
        description: Company Found
    """

    company = Company.query.get_or_404(id)

    return {
        "status": "success",
        "company": company.to_dict()
    }, 200


# ======================================================
# Update Company
# ======================================================

@company_bp.route("/<int:id>", methods=["PUT"])
@jwt_required()
@role_required("admin")
def update_company(id):
    """
    Update Company
    ---
    tags:
      - Company

    security:
      - Bearer: []

    parameters:
      - in: path
        name: id
        required: true
        type: integer

      - in: body
        name: body
        required: true
        schema:
          properties:
            company_name:
              type: string
            company_code:
              type: string
            email:
              type: string
            phone:
              type: string
            website:
              type: string
            address:
              type: string
            city:
              type: string
            state:
              type: string

    responses:
      200:
        description: Company Updated Successfully
    """

    company = Company.query.get_or_404(id)

    data = request.get_json()

    if not data:
        return {
            "status": "error",
            "message": "No data received"
        }, 400

    if "company_name" in data:
        duplicate = Company.query.filter(
            Company.company_name == data["company_name"],
            Company.id != id
        ).first()

        if duplicate:
            return {
                "status": "error",
                "message": "Company name already exists"
            }, 409

    company.company_name = data.get(
        "company_name",
        company.company_name
    )

    company.company_code = data.get(
        "company_code",
        company.company_code
    )

    company.email = data.get(
        "email",
        company.email
    )

    company.phone = data.get(
        "phone",
        company.phone
    )

    company.website = data.get(
        "website",
        company.website
    )

    company.address = data.get(
        "address",
        company.address
    )

    company.city = data.get(
        "city",
        company.city
    )

    company.state = data.get(
        "state",
        company.state
    )

    db.session.commit()

    return {
        "status": "success",
        "message": "Company updated successfully",
        "company": company.to_dict()
    }, 200


# ======================================================
# Delete Company
# ======================================================

@company_bp.route("/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("admin")
def delete_company(id):
    """
    Delete Company
    ---
    tags:
      - Company

    security:
      - Bearer: []

    parameters:
      - in: path
        name: id
        required: true
        type: integer

    responses:
      200:
        description: Company Deleted Successfully
    """

    company = Company.query.get_or_404(id)

    db.session.delete(company)
    db.session.commit()

    return {
        "status": "success",
        "message": "Company deleted successfully"
    }, 200