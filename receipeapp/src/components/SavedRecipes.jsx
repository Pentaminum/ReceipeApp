import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

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

    const fetchRecipes = async () => {
        try {
            const response = await axios.get('/recipes');
            setRecipes(response.data);
        } catch (error) {
            console.error('Error occurred while fetching recipes:', error);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const displayRecipe = (recipe) => {
        setSelectedRecipe(recipe); 
        setUpdatedRecipe(recipe);
    };

    const closeDisplay = () => {
        setSelectedRecipe(null);
    };

    const updateRecipe = async () => {
        try {
            if (!updatedRecipe.ingredients || !updatedRecipe.directions) {
                alert('Please fill out all the fields');
                return;
            }
            const response = await fetch(`/recipes/${updatedRecipe.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedRecipe),
            });
            if (!response.ok) {
                throw new Error('Failed to update recipe');
            }
            await fetchRecipes();
            setSelectedRecipe(null);
        } catch (error) {
            console.error('Error updating recipe:', error);
        }
    };

    const deleteRecipe = async () => {
        try {
            const response = await fetch(`/recipes/${selectedRecipe.id}`, {
                method: 'DELETE',
            });
            if (!response.ok) {
                throw new Error('Failed to delete recipe');
            }
            await fetchRecipes();
            setSelectedRecipe(null);
        } catch (error) {
            console.error('Error deleting recipe:', error);
        }
    };

    const handleChange = (e, field) => {
        // Handle changes in input fields
        setUpdatedRecipe({
            ...updatedRecipe,
            [field]: e.target.value
        });
    };

    const formatLastModified = (lastModified) => {
        if (!lastModified) {
            return 'Unknown';
        }

        try {
            const date = new Date(lastModified);
    
            // 날짜와 시간을 가져옵니다.
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hour = String(date.getHours()).padStart(2, '0');
            const minute = String(date.getMinutes()).padStart(2, '0');
            const second = String(date.getSeconds()).padStart(2, '0');
    
            // 형식화된 날짜 및 시간을 반환합니다.
            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        } catch (error) {
            console.error('Error formatting lastModified:', error);
            return 'Invalid Date';
        }
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
                            <div style={{marginBottom: '20px'}}>Last Modified: {formatLastModified(selectedRecipe.lastmodified)}</div>
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
