"""Add an optional link to profile fields.

Revision ID: d7e9a4c26b10
Revises: a8e42d91b630
"""
from alembic import op
import sqlalchemy as sa


revision = "d7e9a4c26b10"
down_revision = "a8e42d91b630"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("profile_fields", sa.Column("link", sa.String(), nullable=True))


def downgrade():
    with op.batch_alter_table("profile_fields") as batch_op:
        batch_op.drop_column("link")
