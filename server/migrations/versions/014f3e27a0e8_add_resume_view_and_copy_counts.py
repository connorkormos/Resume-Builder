"""add resume view and copy counts

Revision ID: 014f3e27a0e8
Revises: c31d82ab690f
Create Date: 2026-10-06 13:44:46.340176

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '014f3e27a0e8'
down_revision = 'c31d82ab690f'
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        'resumes',
        sa.Column('view_count', sa.Integer(), server_default=sa.text('0'), nullable=False),
    )
    op.add_column(
        'resumes',
        sa.Column('copy_count', sa.Integer(), server_default=sa.text('0'), nullable=False),
    )


def downgrade():
    with op.batch_alter_table('resumes') as batch_op:
        batch_op.drop_column('copy_count')
        batch_op.drop_column('view_count')
