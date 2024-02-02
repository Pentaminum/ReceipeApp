import React, { useState } from 'react';
import styled from 'styled-components';
import AddRecipe from './AddRecipe';
import SavedRecipes from './SavedRecipes';

const WhiteBox = styled.div`
    margin: 0 auto;
    width: 500px;
    height: 620px;
    display: flex;
    flex-direction: column;
    background-color: white;
    justify-content: flex-start;
    align-items: center;
`;

const ViewButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: flex-start;
`;

const ViewButton = styled.button`
    width: 250px;
    height: 50px;
    color: white;
    background-color: #76D7C4;
    border: #148F77 1px solid;
    text-align: center;
    transition: background-color 0.3s;
    &:hover {
        background-color: #48C9B0;
        cursor: pointer;
    }
    &:not(:last-child) {
        border-right: none;
    }
`;

const ReceipeContainer= styled.div`
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    overflow-y: auto;
`;

const AppBox = () => {
    const [view, setView] = useState('AddRecipe');

    const handleViewChange = (view) => {   
        setView(view);
    }

    return (
        <div>
            <WhiteBox>
                <ViewButtonContainer>
                <ViewButton onClick={() => handleViewChange('AddRecipe')}>Add Recipe</ViewButton>
                    <ViewButton onClick={() => handleViewChange('SavedRecipes')}>Saved Recipes</ViewButton>
                </ViewButtonContainer>
                <ReceipeContainer>
                    {view === 'AddRecipe' ? <AddRecipe /> : <SavedRecipes />}
                </ReceipeContainer>
            </WhiteBox>
        </div>
    );
};

export default AppBox;