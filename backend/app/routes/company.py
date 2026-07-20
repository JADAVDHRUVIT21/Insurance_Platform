from flask import Blueprint, request
from app.extensions import db
from app.models.company import Company

company_bp = Blueprint(
    "company",
    __name__,
    url_prefix="/api/companies"
)


@company_bp.route("/", methods=["POST"])
def create_company():
    data = request.get_json()

    company = Company(
        company_name=data["company_name"],
        company_code=data.get("company_code"),
        email=data.get("email"),
        phone=data.get("phone"),
        website=data.get("website"),
        address=data.get("address"),
        city=data.get("city"),
        state=data.get("state"),
    )

    db.session.add(company)
    db.session.commit()

    return {
        "status": "success",
        "message": "Company created successfully",
        "company": company.to_dict()
    }, 201


@company_bp.route("/", methods=["GET"])
def get_companies():
    companies = Company.query.all()

    return {
        "status": "success",
        "companies": [company.to_dict() for company in companies]
    }