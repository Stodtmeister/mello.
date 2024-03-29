from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Comment(db.Model):
    __tablename__ = 'comments'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    card_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("cards.id")))
    comment = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now, onupdate=datetime.now)

    card = db.relationship("Card", back_populates="comments")
    users = db.relationship("User", back_populates="comments")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_id': self.card_id,
            'comment': self.comment,
            'author': self.users.to_dict(),
            'created_at':self.created_at.strftime('%m/%d %I:%M %p'),
            'updated_at':self.updated_at.strftime('%m/%d %I:%M %p')
        }

    def to_dict_no_user(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'card_id': self.card_id,
            'comment': self.comment,
            'created_at':self.created_at,
            'updated_at':self.updated_at
        }
