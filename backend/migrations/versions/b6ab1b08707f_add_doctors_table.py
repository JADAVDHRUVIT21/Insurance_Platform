from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "b6ab1b08707f"
down_revision = "71de7de589da"
branch_labels = None
depends_on = None


def upgrade():

    # ----------------------------
    # Add new columns
    # ----------------------------
    with op.batch_alter_table("doctors", schema=None) as batch_op:

        batch_op.add_column(
            sa.Column("doctor_code", sa.String(length=50), nullable=True)
        )

        # IMPORTANT:
        # Add as nullable first
        batch_op.add_column(
            sa.Column("name", sa.String(length=100), nullable=True)
        )

        batch_op.add_column(
            sa.Column("gender", sa.String(length=10), nullable=True)
        )

        batch_op.add_column(
            sa.Column("address", sa.String(length=200), nullable=True)
        )

        batch_op.add_column(
            sa.Column("city", sa.String(length=50), nullable=True)
        )

        batch_op.add_column(
            sa.Column("state", sa.String(length=50), nullable=True)
        )

        batch_op.add_column(
            sa.Column("updated_at", sa.DateTime(), nullable=True)
        )

    # ----------------------------
    # Copy existing doctor_name -> name
    # ----------------------------
    op.execute("""
        UPDATE doctors
        SET name = COALESCE(doctor_name, 'Unknown')
        WHERE name IS NULL;
    """)

    # ----------------------------
    # Modify existing columns
    # ----------------------------
    with op.batch_alter_table("doctors", schema=None) as batch_op:

        batch_op.alter_column(
            "email",
            existing_type=sa.VARCHAR(length=120),
            type_=sa.String(length=100),
            nullable=False
        )

        batch_op.alter_column(
            "phone",
            existing_type=sa.VARCHAR(length=20),
            nullable=False
        )

        batch_op.alter_column(
            "qualification",
            existing_type=sa.VARCHAR(length=150),
            type_=sa.String(length=100),
            existing_nullable=True
        )

        batch_op.alter_column(
            "specialization",
            existing_type=sa.VARCHAR(length=150),
            type_=sa.String(length=100),
            nullable=False
        )

        batch_op.alter_column(
            "consultation_fee",
            existing_type=sa.DOUBLE_PRECISION(precision=53),
            type_=sa.Numeric(precision=10, scale=2),
            existing_nullable=True
        )

        batch_op.create_unique_constraint(
            "uq_doctors_email",
            ["email"]
        )

    # ----------------------------
    # Make name NOT NULL
    # ----------------------------
    with op.batch_alter_table("doctors", schema=None) as batch_op:

        batch_op.alter_column(
            "name",
            existing_type=sa.String(length=100),
            nullable=False
        )

        batch_op.drop_column("doctor_name")


def downgrade():

    with op.batch_alter_table("doctors", schema=None) as batch_op:

        batch_op.add_column(
            sa.Column(
                "doctor_name",
                sa.VARCHAR(length=150),
                nullable=False
            )
        )

        batch_op.drop_constraint(
            "uq_doctors_email",
            type_="unique"
        )

        batch_op.alter_column(
            "consultation_fee",
            existing_type=sa.Numeric(precision=10, scale=2),
            type_=sa.DOUBLE_PRECISION(precision=53),
            existing_nullable=True
        )

        batch_op.alter_column(
            "specialization",
            existing_type=sa.String(length=100),
            type_=sa.VARCHAR(length=150),
            nullable=True
        )

        batch_op.alter_column(
            "qualification",
            existing_type=sa.String(length=100),
            type_=sa.VARCHAR(length=150),
            existing_nullable=True
        )

        batch_op.alter_column(
            "phone",
            existing_type=sa.VARCHAR(length=20),
            nullable=True
        )

        batch_op.alter_column(
            "email",
            existing_type=sa.String(length=100),
            type_=sa.VARCHAR(length=120),
            nullable=True
        )

        batch_op.drop_column("updated_at")
        batch_op.drop_column("state")
        batch_op.drop_column("city")
        batch_op.drop_column("address")
        batch_op.drop_column("gender")
        batch_op.drop_column("name")
        batch_op.drop_column("doctor_code")