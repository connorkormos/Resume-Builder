"""Rename sections.column_id to container_id without rebuilding sections.

Revision ID: a62d730be519
Revises: 75c8a91de204
"""
from alembic import op
import sqlalchemy as sa

revision = "a62d730be519"
down_revision = "75c8a91de204"
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column("sections", "column_id", new_column_name="container_id",
                    existing_type=sa.Integer(), existing_nullable=False)


def downgrade():
    op.alter_column("sections", "container_id", new_column_name="column_id",
                    existing_type=sa.Integer(), existing_nullable=False)
