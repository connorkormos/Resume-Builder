"""Rename columns to containers and add container layout flags.

Revision ID: 75c8a91de204
Revises: d7e9a4c26b10
"""

from alembic import op
import sqlalchemy as sa


revision = "75c8a91de204"
down_revision = "d7e9a4c26b10"
branch_labels = None
depends_on = None


def upgrade():
    # A rename preserves IDs, content, and the sections.column_id references.
    # PostgreSQL and current SQLite update the referenced table automatically.
    op.rename_table("columns", "containers")
    op.add_column(
        "containers",
        sa.Column("type", sa.String(), nullable=False, server_default="column"),
    )
    op.add_column(
        "containers",
        sa.Column("span_full_page", sa.Boolean(), nullable=False, server_default=sa.false()),
    )


def downgrade():
    # Native DROP COLUMN avoids rebuilding a table referenced by sections.
    # SQLite requires version 3.35+ for this operation.
    op.drop_column("containers", "span_full_page")
    op.drop_column("containers", "type")
    op.rename_table("containers", "columns")
