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
    height: 50px; 
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
    width: 400px;
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

const EditWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between; /* Distribute items evenly */
`

const UDButton = styled.button`
    color: white;
    background: #76D7C4;
    border: none;
    cursor: pointer;
    margin-top: 10px;
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
    const [updatedRecipe, setUpdatedRecipe] = useState(null);

    useEffect(() => {
        const savedRecipes = JSON.parse(localStorage.getItem('recipes')) || [];
        setRecipes(savedRecipes);
    }, []);

    const displayRecipe = (recipe) => {
        setSelectedRecipe(recipe); 
        setUpdatedRecipe(recipe);
    };

    const closeDisplay = () => {
        setSelectedRecipe(null);
    };

    const updateRecipe = () => {
        // Update the recipe in localStorage
        const updatedRecipes = recipes.map(recipe => {
            if (recipe.id === updatedRecipe.id) {
                return {
                    ...updatedRecipe,
                    lastModified: new Date().getTime() // Update last modified date
                };
            }
            return recipe;
        });
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        setRecipes(updatedRecipes);
        setSelectedRecipe(null);
    };

    const deleteRecipe = () => {
        // Filter out the recipe with the given ID and update the recipes array
        const updatedRecipes = recipes.filter(recipe => recipe.id !== selectedRecipe.id);
        // Update the localStorage with the updated recipes array
        localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
        // Update the state to reflect the deletion
        setRecipes(updatedRecipes);
        // Close the display after deleting the recipe
        setSelectedRecipe(null);
    };

    const handleChange = (e, field) => {
        // Handle changes in input fields
        setUpdatedRecipe({
            ...updatedRecipe,
            [field]: e.target.value
        });
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
                                <textarea 
                                style={{ width: '80%', height: '80px'}} 
                                value={updatedRecipe.ingredients} 
                                onChange={(e) => handleChange(e, 'ingredients')} 
                                />
                            </div>
                            <div style={{marginBottom: '20px'}}>
                                <div>Directions:</div>
                                <textarea 
                                style={{ width: '80%', height: '80px'}} 
                                value={updatedRecipe.directions} 
                                onChange={(e) => handleChange(e, 'directions')} 
                                />
                            </div>
                            <EditWrapper>
                                <UDButton onClick={deleteRecipe}>Delete</UDButton>
                                <UDButton onClick={updateRecipe}>Update</UDButton>
                            </EditWrapper>
                        </Contents>
                </ItemBox>
            )}
        </div>
    );
};

export default SavedRecipes;
