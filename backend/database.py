"""
Database setup module.
Initialises SQLAlchemy and provides the shared `db` instance used by models
and the Flask application.
"""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
