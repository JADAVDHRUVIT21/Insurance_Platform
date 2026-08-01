from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "9e4b9ba320e8"
down_revision = "428d9ce54092"
branch_labels = None
depends_on = None


def upgrade():
    op.execute("""
        ALTER TABLE customers
        ADD COLUMN IF NOT EXISTS gender VARCHAR(20);
    """)

def downgrade():
    op.execute("""
        ALTER TABLE customers
        DROP COLUMN IF EXISTS gender;
    """)