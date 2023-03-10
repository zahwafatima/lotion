import React, {useState, useEffect, useRef} from 'react';
import './App.css';

export default function Header() {
  let menuVisible = true;
  function toggleMenu(){
      menuVisible = !menuVisible;
        const notesContainer = document.getElementById('notesSection');
        document.getElementById('menuButton').addEventListener('click', () => {
        notesContainer.classList.toggle('notesContainer', menuVisible);
        });

        notesContainer.style.display = menuVisible ? "" : "none";
        notesContainer.style.width = menuVisible ? "25%" : '';
        notesContainer.style.order = menuVisible ? '-1' : '';
        const writingPad = document.getElementsByClassName("writingContainer")
        for (var i = 0; i < writingPad.length; i++) {
          writingPad[i].style.width = menuVisible ? "75%": "100%";
        }
  }

  return (
    <>
        <div className='AppHeader'>
            <div>
                <button onClick={toggleMenu} className = "menuSection" id = "menuButton" type="button">&#9776;</button></div>
            <div className="titleSection" id="titlePage">
                <h1>Lotion</h1>
                <h3>Like Notion, but worse.</h3></div>
        </div>
    </>
  )
}


