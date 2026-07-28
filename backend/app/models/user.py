from datetime import datetime

from app.extensions import db, bcrypt


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)

    name = db.Column(
        db.String(100),
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.String(20),
        nullable=False,
        default="customer"
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    # -------------------------
    # Hash Password
    # -------------------------
    def set_password(self, password):
        hashed = bcrypt.generate_password_hash(password)
        self.password = hashed.decode("utf-8")

    # -------------------------
    # Verify Password
    # -------------------------
    def check_password(self, password):
        print("\n========== PASSWORD CHECK ==========")
        print("Stored Hash :", self.password)
        print("Entered Password :", password)

        result = bcrypt.check_password_hash(
            self.password,
            password
        )

        print("Password Match :", result)
        print("====================================\n")

        return result

    # -------------------------
    # Convert User to Dictionary
    # -------------------------
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role
        }