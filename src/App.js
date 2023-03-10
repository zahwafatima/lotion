import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import Header from './Header';
import NotesElement from './NotesElement';
import TextBox from './TextBox';

import uuid from 'react-uuid';
import './App.css';

const LOCAL_STORAGE_KEY = 'notesArray';


function App() {
  const [notes, setNotes] = useState([]) //1st element: array of notes, 2nd element: function that updates notes
  const [activeNote, setActiveNote] = useState(false); //default is false = no active note

  const blankStyle1 = {
    color: '#797979',
    textAlign: 'center',
    padding: "10px",
    fontSize: '20px'
  };
  const blankStyle2 = {
    color: '#797979',
    textAlign: 'center',
    padding: "20%",
    fontSize: '25px',
    display: 'block'
  };


  const emptyNote = () => {
    const emptyNote = document.getElementsByClassName('emptyNote');
    for (var i = 0; i < emptyNote.length; i++) {
      emptyNote[i].style.display = (notes == []) ? "" : "none";
    }
  }

  const displayText = () => { document.getElementById('writingBox').style.display = 'block'; 
  }

  const temporaryNote = () => {
    var tempId = uuid()
    setActiveNote(tempId)
    setNotes(prevNotes => {
      return [{ id: tempId, name: 'Untitled', date: '...', descr: '' }, ...prevNotes]
    })
  }

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatDate1 = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  const formatDate2 = (today) => { //example initial format: Wed Mar 08 2023 21:09:39 GMT-0700 (Mountain Standard Time)
    var minutes = today.getMinutes();
    var hours = today.getHours();

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    var seconds = today.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds;

    var month = (today.getMonth() + 1);
    month = month < 10 ? '0' + month : month;

    var day = today.getDate();
    day = day < 10 ? '0' + day : day;

    var dateTime = today.getFullYear() + '-' + month + '-' + day + "T" + hours + ':' + minutes;
    return dateTime //example final format: yyyy-MM-ddThh:mm
  }

  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote) //returns the object of the current active note
  }

  const onUpdateNote = (updatedNote) => {
    const updatedNotesArray = notes.map((note) => {
      if (note.id === activeNote)
        return updatedNote;
      return note
    });
    setNotes(updatedNotesArray);
  }

  //STORE OUR NOTES
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) //converts to an array
    if (storedNotes) setNotes(storedNotes)
  }, []) //called only once at empty array of dependencies

  //GET OUR NOTES
  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(notes));
      emptyNote();
      displayText();
    }
  }, [notes]) //anytime anything in this notes array changes, we call this useEffect function (we saved our notes)

  
  
  return (
    <BrowserRouter>
      <>
        <div>
          <Header />
          <div className="container">
            <div className='notesContainer' id='notesSection'>
              <div className='NotesHeader'>
                <div className="notesTitle">
                  <h2>Notes</h2>
                </div>
                <div><button onClick={function (e) { emptyNote(); displayText(); temporaryNote() }} className="notesPlus" type="button"><h2>+</h2></button></div>
              </div>
              <div className='NotesColumn' onClick={function (e) { }}>
                <div style={blankStyle1} id='emptyNote1' className='emptyNote'>No Note Yet</div>
                <div>
                  {notes.map(note => {
                    return <NotesElement key={note.id} note={note} activeNote={activeNote} setActiveNote={setActiveNote} />
                  })}
                </div>
              </div>
            </div>
            <div style={blankStyle2} id='emptyNote2' className='emptyNote'>Select a note, or create a new one.</div>

            <div className='writingContainer' id='writingBox' style={{ display: 'none' }}>
              <TextBox notes={notes} setNotes={setNotes} dateTime={formatDate1(new Date())} activeNote={getActiveNote()} onUpdateNote={onUpdateNote} formatDate1={formatDate1} formatDate2={formatDate2} />

            </div>
          </div>

        </div>

      </>
    </BrowserRouter>

  )
}

export default App;
