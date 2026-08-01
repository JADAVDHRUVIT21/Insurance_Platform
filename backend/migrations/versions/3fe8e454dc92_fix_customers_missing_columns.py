from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "3fe8e454dc92"
down_revision = "9e4b9ba320e8"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS dob DATE;

        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS address TEXT;

        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS city VARCHAR(100);

        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS state VARCHAR(100);

        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS pincode VARCHAR(10);

        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS created_at TIMESTAMP;
    """)


def downgrade():
    op.execute("""
        ALTER TABLE customers DROP COLUMN IF EXISTS dob;
        ALTER TABLE customers DROP COLUMN IF EXISTS address;
        ALTER TABLE customers DROP COLUMN IF EXISTS city;
        ALTER TABLE customers DROP COLUMN IF EXISTS state;
        ALTER TABLE customers DROP COLUMN IF EXISTS pincode;
        ALTER TABLE customers DROP COLUMN IF EXISTS created_at;
    """)