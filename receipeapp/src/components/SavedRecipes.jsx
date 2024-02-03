import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const RecipeForm = styled.div`
    width: 100%; 
    max-height: 100%; 
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
`;

const RecipeItem = styled.button`
    width: 100%;
    height: 40px; 
    border: none;
    background-color: white;
    border-bottom: 1px solid #D7DBDD;
    padding: 5px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    font-size: 15px;
    transition: background-color 0.3s;
    &:hover {
        background-color: #D7DBDD; 
        cursor: pointer;
    }
`;

const Heading = styled.div`
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    font-size: 15px;
    border-bottom: 2px solid black;
`;

const DisplayItem = styled.div`
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 300px;
    height: 300px;
    padding: 20px;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;


const SavedRecipes = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(savedRecipes);
    }, []);

    const displayRecipe = (recipe) => {
        setSelectedRecipe(recipe); 
    };

    const closeDisplay = () => {
        setSelectedRecipe(null);
    };

    const formatLastModified = (lastModified) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true };
        return new Date(lastModified).toLocaleString('en-US', options).replace(",", "");
    };

    return (
        <div>
            <RecipeForm>
                <Heading>Saved Recipes</Heading>
                {recipes.map((recipe) => (
                    <RecipeItem key={recipe.id} onClick={() => displayRecipe(recipe)}>{recipe.name}</RecipeItem>
                ))}
            </RecipeForm>
            {selectedRecipe && (
                <DisplayItem visible={selectedRecipe !== null}>
                    <div>
                        <button onClick={closeDisplay}>X</button>
                        <div>{selectedRecipe.name}</div>
                        <div>Last Modified: {formatLastModified(selectedRecipe.lastModified)}</div>
                        <div>{selectedRecipe.ingredients}</div>
                        <div>{selectedRecipe.directions}</div>
                    </div>
                </DisplayItem>
            )}
        </div>
    );
};

export default SavedRecipes;
