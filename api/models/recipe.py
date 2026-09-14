from models import db
from models.category import Category
from models.ingredient import Ingredient
from models.association import recipe_category


class Recipe(db.Model):
    __tablename__ = 'recipe'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    duration = db.Column(db.String(50), nullable=False)
    pictures = db.Column(db.Text)
    instructions = db.Column(db.Text, nullable=False)

    categories = db.relationship(
        'Category',
        secondary=recipe_category,
        backref=db.backref('recipes', lazy='dynamic')
    )

    def as_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "duration": self.duration,
            "pictures": self.pictures.split(',') if self.pictures else [],
            "instructions": self.instructions,
            "categories": [cat.as_dict() for cat in self.categories],
            "ingredients": [ing.as_dict() for ing in self.ingredients],
        }
