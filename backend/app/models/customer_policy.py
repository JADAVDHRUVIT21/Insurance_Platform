from datetime import datetime
from app.extensions import db


class CustomerPolicy(db.Model):
    __tablename__ = "customer_policies"

    id = db.Column(db.Integer, primary_key=True)

    customer_id = db.Column(
        db.Integer,
        db.ForeignKey("customers.id"),
        nullable=False
    )

    policy_id = db.Column(
        db.Integer,
        db.ForeignKey("policies.id"),
        nullable=False
    )

    policy_start_date = db.Column(
        db.Date,
        nullable=False
    )

    policy_end_date = db.Column(
        db.Date,
        nullable=False
    )

    nominee_name = db.Column(
        db.String(150),
        nullable=False
    )

    nominee_relationship = db.Column(
        db.String(100),
        nullable=False
    )

    premium_status = db.Column(
        db.String(30),
        default="Pending"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    customer = db.relationship(
        "Customer",
        backref="customer_policies"
    )

    policy = db.relationship(
        "Policy",
        backref="customer_policies"
    )

    claims = db.relationship(
        "Claim",
        back_populates="customer_policy",
        cascade="all, delete-orphan",
        lazy=True
    )

    def to_dict(self):
        return {
            "id": self.id,
            "customer_id": self.customer_id,
            "policy_id": self.policy_id,
            "policy_start_date": str(self.policy_start_date),
            "policy_end_date": str(self.policy_end_date),
            "nominee_name": self.nominee_name,
            "nominee_relationship": self.nominee_relationship,
            "premium_status": self.premium_status
        }