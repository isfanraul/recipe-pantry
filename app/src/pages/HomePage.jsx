import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';
import { Link } from 'react-router';

import './HomePage.css';
import { CategoryList } from "../components/CategoryList";
import { DurationBadge } from "../components/DurationBadge";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export function HomePage() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/recipes`)
      .then(async (response) => {
        const data = await response.json();
        setRecipes(data);
      })
      .catch((error) => console.error(error));
  }, [])

  return (
    <>
      <h1>My recipes</h1>
      {recipes.length === 0 && (
        <div>
          You don't have any recipes. Add some :)
        </div>
      )}
      {recipes.length !== 0 && (
        <div className="recipes-container">
          {recipes.map((recipe) => {
            return (
              <Card key={`recipe-${recipe.id}`}>
                <Card.Img variant="top" src={recipe.pictures?.[0]} style={{ height: '200px' }} />
                <Card.Body>
                  <Card.Title className="recipe-title">{recipe.name}</Card.Title>
                    <CategoryList categories={recipe.categories} />
                  <footer>
                    <DurationBadge duration={recipe.duration} />
                    <Link to={`/recipes/${recipe.id}`}>
                      Read more
                    </Link>
                  </footer>
                </Card.Body>
              </Card>
            );
          })}
        </div>
      )}
    </>
  );
}
