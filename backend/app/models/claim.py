from datetime import datetime
from app.extensions import db


class Claim(db.Model):
    __tablename__ = "claims"

    id = db.Column(db.Integer, primary_key=True)

    customer_policy_id = db.Column(
        db.Integer,
        db.ForeignKey("customer_policies.id"),
        nullable=False
    )

    claim_number = db.Column(
        db.String(50),
        unique=True,
        nullable=False
    )

    claim_amount = db.Column(db.Float, nullable=False)

    claim_reason = db.Column(db.Text)

    claim_date = db.Column(
        db.Date,
        nullable=False
    )

    status = db.Column(
        db.String(20),
        default="Pending"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    customer_policy = db.relationship(
        "CustomerPolicy",
        back_populates="claims"
    )

    def to_dict(self):
        return {
            "id": self.id,
            "customer_policy_id": self.customer_policy_id,
            "claim_number": self.claim_number,
            "claim_amount": self.claim_amount,
            "claim_reason": self.claim_reason,
            "claim_date": str(self.claim_date),
            "status": self.status
        }