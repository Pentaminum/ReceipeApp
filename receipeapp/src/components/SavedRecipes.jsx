import React from 'react';
import styled from 'styled-components';

const RecipeForm = styled.div`
    width: 100%; 
    max-height: 100%; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const RecipeItem = styled.div`
    width: 100%;
    height: 40px; 
    border-bottom: 1px solid #D7DBDD;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 15px;
`;

const Heading = styled.div`
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    font-size: 15px;
    border-bottom: 2px solid black;
`;


const SavedRecipes = () => {
    const recipes = [
        { id: 1, name: 'Pasta Carbonara' },
        { id: 2, name: 'Chicken Parmesan' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
        { id: 3, name: 'Chocolate Chip Cookies' },
    ];

    return (
        <div>
            <RecipeForm>
                <Heading>Saved Recipes</Heading>
                {recipes.map((recipe) => (
                    <RecipeItem key={recipe.id}>{recipe.name}</RecipeItem>
                ))}
            </RecipeForm>
        </div>
    );
};

export default SavedRecipes;
