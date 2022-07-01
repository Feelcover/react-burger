import React from 'react';
import AppHeader from '../AppHeader/AppHeader';
import AppStyle from './App.module.css';


function App() {
  return (
    <div className={AppStyle.page}>
        <AppHeader/>
    </div>
  )
}

export default App;