"""Add profile content tables.

Revision ID: a8e42d91b630
Revises: 014f3e27a0e8
"""
from alembic import op
import sqlalchemy as sa


revision = "a8e42d91b630"
down_revision = "014f3e27a0e8"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "profiles",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], name="fk_profiles_user_id_users"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "profile_sections",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("profile_id", sa.Integer(), nullable=False),
        sa.Column("type", sa.String(), nullable=False),
        sa.Column("label", sa.String(), nullable=False),
        sa.Column("position", sa.Integer(), server_default="0", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["profile_id"], ["profiles.id"], name="fk_profile_sections_profile_id_profiles"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "profile_subsections",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("profile_section_id", sa.Integer(), nullable=False),
        sa.Column("position", sa.Integer(), server_default="0", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["profile_section_id"], ["profile_sections.id"], name="fk_profile_subsections_profile_section_id_profile_sections"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_table(
        "profile_fields",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("profile_subsection_id", sa.Integer(), nullable=False),
        sa.Column("label", sa.String(), nullable=False),
        sa.Column("value", sa.Text(), server_default="", nullable=False),
        sa.Column("position", sa.Integer(), server_default="0", nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False),
        sa.ForeignKeyConstraint(["profile_subsection_id"], ["profile_subsections.id"], name="fk_profile_fields_profile_subsection_id_profile_subsections"),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade():
    op.drop_table("profile_fields")
    op.drop_table("profile_subsections")
    op.drop_table("profile_sections")
    op.drop_table("profiles")
