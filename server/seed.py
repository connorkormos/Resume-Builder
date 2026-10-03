import argparse
import os
from pathlib import Path
import re

from sqlalchemy import inspect, select

from config import app, db
from models import Resume, User


TEMPLATE_DIRECTORY = Path(__file__).resolve().parent / "sql" / "10-03-2026"
TITLE_PATTERN = re.compile(
    r"INSERT INTO resumes\s*\([^)]*\)\s*VALUES\s*\(\s*1,\s*NULL,\s*'((?:[^']|'')*)'",
    re.DOTALL,
)


def load_template_queries():
    files = sorted(TEMPLATE_DIRECTORY.glob("*.sql"))
    if len(files) != 100:
        raise RuntimeError(f"Expected 100 template SQL files; found {len(files)}.")

    templates = []
    titles = set()
    for path in files:
        sql = path.read_text(encoding="utf-8")
        match = TITLE_PATTERN.search(sql)
        if not match or not sql.rstrip().endswith("FROM new_resume"):
            raise RuntimeError(f"Unexpected template query format: {path.name}")
        title = match.group(1).replace("''", "'")
        if title in titles:
            raise RuntimeError(f"Duplicate template title: {title}")
        titles.add(title)
        templates.append((path.name, title, sql))
    return templates


def add_template_resumes_from_sql_queries(*, dry_run=False):
    if not os.environ.get("DATABASE_URL"):
        raise RuntimeError("DATABASE_URL must be set to the intended PostgreSQL database.")
    if db.engine.dialect.name != "postgresql":
        raise RuntimeError("Template imports require PostgreSQL.")

    templates = load_template_queries()
    with db.engine.begin() as connection:
        columns = {column["name"] for column in inspect(connection).get_columns("resumes")}
        required = {"tags", "plain_text", "is_official_template", "source_resume_id"}
        if missing := required - columns:
            raise RuntimeError(f"Apply pending migrations first; missing columns: {', '.join(sorted(missing))}.")
        if connection.execute(select(User.id).where(User.id == 1)).scalar_one_or_none() is None:
            raise RuntimeError("User ID 1 does not exist in this database.")

        existing_titles = set(connection.execute(
            select(Resume.title).where(
                Resume.user_id == 1,
                Resume.is_official_template.is_(True),
                Resume.title.in_([title for _, title, _ in templates]),
            )
        ).scalars())

        inserted = []
        skipped = []
        for filename, title, sql in templates:
            if title in existing_titles:
                skipped.append(title)
                continue
            if dry_run:
                inserted.append(title)
                continue
            try:
                row = connection.exec_driver_sql(sql).one()._mapping
                if row["title"] != title or row["user_id"] != 1 or not row["is_official_template"]:
                    raise RuntimeError("The insert returned an unexpected resume.")
                inserted.append(title)
            except Exception as exc:
                raise RuntimeError(f"Template import failed in {filename}; all inserts will roll back.") from exc

    return inserted, skipped


def main():
    parser = argparse.ArgumentParser(description="Import the 100 official resume templates for user 1.")
    parser.add_argument("--dry-run", action="store_true", help="Check which templates would be inserted.")
    args = parser.parse_args()
    with app.app_context():
        inserted, skipped = add_template_resumes_from_sql_queries(dry_run=args.dry_run)
    action = "would be inserted" if args.dry_run else "inserted"
    print(f"{len(inserted)} templates {action}; {len(skipped)} already present for user 1.")


if __name__ == "__main__":
    main()

# from datetime import datetime, timezone

# from config import app, db
# from models import Column, User, Resume

# from lorem_text import lorem

# from services.builders import build_resume_with_defaults

# from routes.column_routes import add_column, add_section

# DEMO_EMAIL = "demo@example.com"
# DEMO_PASSWORD = "change-me"
# DEMO_TITLE = "Demo Resume"

# DEMO_STYLING = {
# 	"display": "flex",
# 	"fontSize": "12px",
# 	"lineHeight": 1.2,
# 	"color": "rgba(0, 0, 0, 1)",
# 	"backgroundColor": "rgba(255, 255, 255, 1)",
# }

# DEMO_LAYOUT = {
# 	"padding": {
# 		"top": "2.5rem",
# 		"right": "2.5rem",
# 		"bottom": "2.5rem",
# 		"left": "2.5rem",
# 	},
# 	"gap": {
# 		"horizontal": "1rem",
# 		"vertical": "0.5rem",
# 	},
# }


# def delete_existing_demo_data():
# 	deleted_user = False
# 	deleted_resume = False

# 	demo_user = User.query.filter_by(email=DEMO_EMAIL).one_or_none()
# 	if demo_user:
# 		db.session.delete(demo_user)
# 		deleted_user = True
# 		# Flush so cascade deletes happen before we check for an orphaned id=0 resume.
# 		db.session.flush()

# 	demo_resume = Resume.query.filter(Resume.id == 0).one_or_none()
# 	if demo_resume:
# 		db.session.delete(demo_resume)
# 		deleted_resume = True
# 		db.session.flush()

# 	return deleted_user, deleted_resume


# def create_demo_user():
# 	user = User(
# 		id=0,
# 		first_name="Demo",
# 		last_name="User",
# 		email=DEMO_EMAIL,
# 	)
# 	user.set_password(DEMO_PASSWORD)
# 	db.session.add(user)
# 	db.session.flush()
# 	return user

#    #  "header": {''},
#    #  "workHistory": "Work History",
#    #  "education": "Education",
#    #  "skills": "Skills",
#    #  "contact": "Contact",
#    #  "summary": "Summary",
#    #  "projects": "Projects",
#    #  "custom": "Custom Section",
#    #  "default": "New Section",
# def create_demo_resume(user):
#    resume = build_resume_with_defaults(
#        title=DEMO_TITLE,
#        user_id=user.id,
#        sections_data={'header': True, 'contact': True, 'summary': True, 'skills': True, 'workHistory': True, 'education': True, 'projects': True}
#    )
#    db.session.add(resume)
#    db.session.flush()

#    column = resume.columns[0]
#    column.resume_id = 0
#    resume.id = 0
#    for section in column.sections:
#       if (section.type == 'header'):
#          section.show_heading = False
#       for subsection in section.subsections:
#          for field in subsection.fields:
#             field.value = [{"type": "paragraph", "label": field.label, "children": [{"type": "text", "text": lorem.words(1)}]}]
#             # field_value = field.value[0]["children"][0]["text"]
#             # print(field_value, 'field value')
#             # field.value[0]["children"][0]["text"] = lorem.words(1)
#             # print(field_value, 'field value')

#             # field.value[0]["children"][0]["text"] = 'lorem.words(1)'
#             print(lorem.words(1))


#    # db.session.commit()

#    return resume
# 	# resume = Resume(
# 	# 	id=0,
# 	# 	user_id=user.id,
# 	# 	title=DEMO_TITLE,
# 	# 	styling=DEMO_STYLING,
# 	# 	layout=DEMO_LAYOUT,
# 	# )
# 	# db.session.add(resume)
# 	# db.session.flush()
# 	# return resume

# def main():
# 	with app.app_context():
# 		try:
# 			deleted_user, deleted_resume = delete_existing_demo_data()
# 			user = create_demo_user()
# 			resume = create_demo_resume(user)

# 			db.session.commit()

# 			print(
# 				f"Seed complete: deleted user={deleted_user}, deleted resume={deleted_resume}; "
# 				f"created user (id={user.id}, email={user.email}) and resume (id={resume.id}, user_id={resume.user_id})"
# 			)
# 		except Exception as exc:
# 			db.session.rollback()
# 			print(f"Seed failed: {exc}")
# 			raise


# if __name__ == "__main__":
# 	main()
