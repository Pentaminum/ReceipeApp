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

const ItemBox = styled.div`
    position: fixed;
    top: 60%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    width: 300px;
    height: 400px;
    padding: 20px;
    z-index: 1000;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const CloseButton = styled.button`
    color: white;
    background: #76D7C4;
    border: none;
    cursor: pointer;
    &:hover {
        color: #D7DBDD;
        background: #48C9B0;
    }
`;

const Contents = styled.div`
    width: 100%;
    height: 100%;
    #border: 1px solid #D7DBDD;
    flex-grow: 1;
    overflow-y: auto;
    white-space: pre-line;
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
        
        const formattedDate = new Date(lastModified).toLocaleString('en-US', options);
        
        const [date, time] = formattedDate.split(', ');
        const [hourMinute, period] = time.split(' ');
        const [hour, minute] = hourMinute.split(':');
        const [month, day, year] = date.split('/');
        const formattedDateResult = `${year}-${month}-${day} ${hour}:${minute} ${period}`;
        return `${formattedDateResult}`;
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
                <ItemBox visible={selectedRecipe !== null}>
                    <CloseButton onClick={closeDisplay}>X</CloseButton>
                    <Contents>
                        <div style={{fontSize: '20px', marginBottom: '20px'}}>{selectedRecipe.name}</div>
                        <div style={{marginBottom: '20px'}}>Last Modified: {formatLastModified(selectedRecipe.lastModified)}</div>
                        <div style={{marginBottom: '20px'}}>
                            <div>Ingredients:</div>
                            <div style={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>{selectedRecipe.ingredients}</div>
                        </div>
                        <div style={{marginBottom: '20px'}}>
                            <div>Directions:</div>
                            <div style={{ marginTop: '10px', marginLeft: '10px', marginRight: '10px' }}>{selectedRecipe.directions}</div>
                        </div>
                    </Contents>
                </ItemBox>
            )}
        </div>
    );
};

export default SavedRecipes;
