"""add customer first name fields

Revision ID: 428d9ce54092
Revises: b6ab1b08707f
Create Date: 2026-08-01

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '428d9ce54092'
down_revision = 'b6ab1b08707f'
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table('customers', schema=None) as batch_op:

        # Add only new columns
        batch_op.add_column(
            sa.Column(
                'first_name',
                sa.String(length=100),
                nullable=True
            )
        )

        batch_op.add_column(
            sa.Column(
                'last_name',
                sa.String(length=100),
                nullable=True
            )
        )


def downgrade():

    with op.batch_alter_table('customers', schema=None) as batch_op:

        batch_op.drop_column('last_name')
        batch_op.drop_column('first_name')