import React from 'react'

export default function NotesElement({ note, activeNote, setActiveNote }) {
  function formatDescr() {
    if (note.descr.length > 50) 
      return note.descr.substr(0,50) +'...'
    else
      return note.descr.substr(0,50)
    
  }

  return (
    <>
      <div 
        className={`singleNote ${note.id === activeNote && "active"}`} //if on active note, then className is "singleNote active"
        onClick={()=> setActiveNote(note.id)}>
        <button  className='singleNoteButton'>
          <div><strong>{note.name}</strong></div>
          <div style={{ color: '#8f8f8e'}}><small>{note.date}</small></div>
          <div><p>{note.descr && formatDescr()}</p></div>
        </button>
      </div>

    </>
  );
}
