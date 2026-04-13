"""
SQLAlchemy models for the Andhra Trails Flask backend.
Mirrors the original Supabase schema (profiles, reviews, favorites).
"""

import uuid
from datetime import datetime, timezone
from database import db


def _uuid():
    return str(uuid.uuid4())


def _now():
    return datetime.now(timezone.utc)


class User(db.Model):
    """Application user — handles authentication."""
    __tablename__ = "users"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    display_name = db.Column(db.String(100), nullable=True)
    created_at = db.Column(db.DateTime, default=_now)

    # Relationships
    reviews = db.relationship("Review", backref="user", lazy=True, cascade="all, delete-orphan")
    favorites = db.relationship("Favorite", backref="user", lazy=True, cascade="all, delete-orphan")

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "display_name": self.display_name,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Review(db.Model):
    """User review for a destination."""
    __tablename__ = "reviews"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    destination_id = db.Column(db.String(100), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=_now)
    updated_at = db.Column(db.DateTime, default=_now, onupdate=_now)

    def to_dict(self):
        user = User.query.get(self.user_id)
        return {
            "id": self.id,
            "user_id": self.user_id,
            "destination_id": self.destination_id,
            "rating": self.rating,
            "comment": self.comment,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "profiles": {"display_name": user.display_name if user else None},
        }


class Favorite(db.Model):
    """User favourite destination."""
    __tablename__ = "favorites"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    destination_id = db.Column(db.String(100), nullable=False)
    created_at = db.Column(db.DateTime, default=_now)

    __table_args__ = (db.UniqueConstraint("user_id", "destination_id", name="uq_user_dest"),)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "destination_id": self.destination_id,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class EmergencyContact(db.Model):
    """User's personal emergency contacts."""
    __tablename__ = "emergency_contacts"

    id = db.Column(db.String(36), primary_key=True, default=_uuid)
    user_id = db.Column(db.String(36), db.ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    relationship = db.Column(db.String(50), nullable=True)
    created_at = db.Column(db.DateTime, default=_now)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "name": self.name,
            "phone": self.phone,
            "relationship": self.relationship,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }
