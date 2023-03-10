import React, { useState, useEffect, useRef } from 'react';
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";


export default function TextBox({ notes, setNotes, activeNote, onUpdateNote, formatDate1, formatDate2 }) {
    var saveDisplaying = true;
    const noteNameRef = useRef()
    const { quill, quillRef } = useQuill();
    const navigate = useNavigate()
    const dateTextActive = useRef();
    const placeholder = "Untitled";

    const toggleButton = () => {
        saveDisplaying = !saveDisplaying;
        
        var save = document.getElementById('saveButton');
        var edit = document.getElementById('editButton');
        var dateTextActive = document.getElementById('dateTextActive');
        var dateTextSaved = document.getElementById('dateTextSaved');
        var title = document.getElementById('titleText');

        save.style.display = (saveDisplaying) ? 'block' : 'none';
        edit.style.display = (saveDisplaying) ? 'none' : 'block';

        dateTextActive.style.display = (saveDisplaying) ? 'block' : 'none';
        dateTextSaved.style.display = (saveDisplaying) ? 'none' : 'block';
        title.disabled = (saveDisplaying) ? false : true;


        dateTextSaved.innerHTML = formatDate1(dateTextActive.value)
        var quillToolbar = document.getElementsByClassName('ql-toolbar ql-snow');
        for (var i = 0; i < quillToolbar.length; i++){
            if (!saveDisplaying) {
                quillToolbar[i].setAttribute('style', 'display:none !important;');
                quill.enable(false);
            } else {
                quillToolbar[i].setAttribute('style', 'display:block !important;');
                quill.enable(true);
            }
        }
    }
      

    const handleDeleteNote = (idToDelete) => {
        const answer = window.confirm("Are you sure?");
        if (answer) {
            setNotes(notes.filter((note) => note.id !== idToDelete));
            
          }
    }

    const handleAddNote = (noteId) => {
        const name = noteNameRef.current.value;
        if (name === '') return;
        const text = quill.getText();
        onUpdateNote({
            id: noteId,
            name: name,
            date: formatDate1(dateTextActive.value),
            descr: text
        });
    };

    const onEditField = (key, value) => {
        onUpdateNote({
            ...activeNote,
            [key]: value,
            date: formatDate2(new Date()),
        });
    }

    function formatDate(dateStr) {
        const months = {
            January: '01',
            February: '02',
            March: '03',
            April: '04',
            May: '05',
            June: '06',
            July: '07',
            August: '08',
            September: '09',
            October: '10',
            November: '11',
            December: '12'
        };
        const [monthName, day, year, _, time] = dateStr.split(/[ ,]+/);
        const [hour, minute] = time.split(':');

        const month = months[monthName];
        const paddedDay = day.padStart(2, '0');

        const isoDate = `${year}-${month}-${paddedDay}T0${hour}:${minute}`;
        return isoDate;
    }

    useEffect(() => {
        if (activeNote && quill) {
            const noteContent = document.createElement('div');
            noteContent.innerHTML = activeNote.descr;
            quill.setText(noteContent.innerText);
        }
        
    }, [activeNote, quill]);
    

    
    
if (!activeNote) return;

return (
    <>
        <div>
            <div className='textSection' >
                <div id='textBox'>
                    <div id='mainTitle'>
                        <input id='titleText' disabled={false} ref={noteNameRef} placeholder="Untitled" value={`${activeNote ? activeNote.name : placeholder}`} onChange={(e) => onEditField("name", e.target.value)} type="text" />
                        <input id='dateTextActive' type="datetime-local" defaultValue={`${formatDate2(new Date())}`} />
                        <p id='dateTextSaved' style={{ display: 'none', fontSize: 'smaller', color: '#8f8f8e' }}></p>
                    </div>
                    <div id='mainButtons'>
                        <button onClick={function (e) { handleAddNote(activeNote.id); toggleButton(); }} className="saveDeleteButtons" id='saveButton' type="button">Save</button>
                        <button onClick={toggleButton} className="saveDeleteButtons" id='editButton' type="button" style={{ display: 'none' }} >Edit</button>
                        <button onClick={() => handleDeleteNote(activeNote.id)} className="saveDeleteButtons" type="button">Delete</button>
                    </div>
                </div>
            </div>
            <div className='editingSection'>
                {activeNote && (
                    <div id='descrText' placeholder="Your Note Here" ref={quillRef} defaultValue={activeNote.descr} onBlur={(e) => onEditField("descr", quill.root.innerHTML)} />
                )}
            </div>

        </div>
    </>
)
}
