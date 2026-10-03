"""Add searchable resume tags.

Revision ID: c31d82ab690f
Revises: 464dc96f6e57
"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSONB

revision = "c31d82ab690f"
down_revision = "464dc96f6e57"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "resumes",
        sa.Column(
            "tags",
            sa.JSON().with_variant(JSONB(), "postgresql"),
            nullable=False,
            server_default="[]",
        ),
    )


def downgrade():
    with op.batch_alter_table("resumes") as batch_op:
        batch_op.drop_column("tags")
