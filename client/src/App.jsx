import React from 'react';
import FoodList from './components/FoodList';
import './styles.css';

export default function App(){
  return (
    <div className="container">
      <h1>Food Management — SDG 12</h1>
      <FoodList />
    </div>
  );
}
