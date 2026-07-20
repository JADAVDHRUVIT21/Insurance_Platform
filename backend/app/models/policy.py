from datetime import datetime
from app.extensions import db


class Policy(db.Model):
    __tablename__ = "policies"

    id = db.Column(db.Integer, primary_key=True)

    policy_number = db.Column(db.String(50), unique=True, nullable=False)
    policy_name = db.Column(db.String(150), nullable=False)

    company_id = db.Column(
        db.Integer,
        db.ForeignKey("companies.id"),
        nullable=False
    )

    policy_type = db.Column(db.String(50))

    sum_assured = db.Column(db.Float)

    premium_amount = db.Column(db.Float)

    premium_frequency = db.Column(db.String(30))

    policy_term = db.Column(db.Integer)

    maturity_age = db.Column(db.Integer)

    min_entry_age = db.Column(db.Integer)

    max_entry_age = db.Column(db.Integer)

    status = db.Column(
        db.String(20),
        default="Active"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    company = db.relationship("Company", backref="policies")

    def to_dict(self):
        return {
            "id": self.id,
            "policy_number": self.policy_number,
            "policy_name": self.policy_name,
            "company_id": self.company_id,
            "policy_type": self.policy_type,
            "sum_assured": self.sum_assured,
            "premium_amount": self.premium_amount,
            "premium_frequency": self.premium_frequency,
            "policy_term": self.policy_term,
            "maturity_age": self.maturity_age,
            "min_entry_age": self.min_entry_age,
            "max_entry_age": self.max_entry_age,
            "status": self.status
        }