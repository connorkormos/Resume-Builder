"""Drop the redundant subsection type; use the parent section's type.

Revision ID: e3b8c29f714a
Revises: a62d730be519
"""

from alembic import op
import sqlalchemy as sa


revision = "e3b8c29f714a"
down_revision = "a62d730be519"
branch_labels = None
depends_on = None


def upgrade():
    # Drop in place so fields keep their existing subsection foreign keys.
    op.drop_column("subsections", "type")


def downgrade():
    # Reconstruct the redundant value from the current parent section.
    op.add_column("subsections", sa.Column("type", sa.String(), nullable=True))
    op.execute("""
        UPDATE subsections
        SET type = (SELECT sections.type FROM sections WHERE sections.id = subsections.section_id)
    """)
    with op.batch_alter_table("subsections") as batch_op:
        batch_op.alter_column("type", existing_type=sa.String(), nullable=False)
