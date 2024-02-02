import React, { useState } from 'react';
import styled from 'styled-components';

const RecipeForm = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TextBox = styled.textarea`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    margin-bottom: 10px;
`;

const Heading = styled.div`
    font-weight: bold;
    text-align: center;
    padding: 10px 0;
    font-size: 15px;
    border-bottom: 2px solid black;
    width: 100%; /* Ensure Heading takes full width */
`;

const SubHeading = styled.div`
    text-align: left;
    font-size: 13px;
    margin: 5px 0;
    width: 455px; 
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%; /* Ensure ButtonContainer takes full width */
`;

const Button = styled.button`
    width: 200px;
    height: 30px;
    color: white;
    background-color: #76D7C4;
    margin: 3px 0;
    border: none;
    border-radius: 5px;
    text-align: center;
    transition: background-color 0.3s;
    &:hover {
        background-color: #48C9B0; /* Change background color on hover */
        cursor: pointer;
    }
`;

const AddRecipe = () => {
    const [recipeName, setRecipeName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [directions, setDirections] = useState('');

    const handleReset = () => {
        setRecipeName('');
        setIngredients('');
        setDirections('');
    };

    return (
        <div>
            <RecipeForm>
                <Heading>New Recipe</Heading>
                <SubHeading>Recipe Name</SubHeading>
                <TextBox
                width="450px"
                height="18px"
                placeholder="Recipe Name"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
                />
                <SubHeading>Ingredients</SubHeading>
                <TextBox
                width="450px"
                height="100px"
                placeholder="Ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                />
                <SubHeading>Directions</SubHeading>
                <TextBox
                width="450px"
                height="200px"
                placeholder="Directions"
                value={directions}
                onChange={(e) => setDirections(e.target.value)}
                />
                <ButtonContainer>
                    <Button onClick={handleReset}>RESET</Button>
                    <Button>SAVE</Button>
                </ButtonContainer>
            </RecipeForm>
        </div>
    );
};

export default AddRecipe;
