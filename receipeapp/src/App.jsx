import React from 'react';
import './App.css';
import styled from 'styled-components';
import AppBox from './components/AppBox';

const CenteredContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh; 
  background-color: #76D7C4 ; 
`;

const Title = styled.h1`
    text-align: center;
    margin-bottom: 5px;
`;

function App() {
  return (
    <div>
      <CenteredContainer>
        <Title>Recipe App</Title>
        <AppBox />
      </CenteredContainer>
    </div>
  );
}

export default App;
