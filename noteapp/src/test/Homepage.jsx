import React, { useContext, useState } from "react";
import { NotesContext } from "./NotesContext";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";

const Homepage = () => {
  const { note, addNote, deleteNote, updateNote } = useContext(NotesContext);
  const [newNote, setNewNote] = useState("");
  const [edit, setEdit] = useState(null);
  const [updateText, setUpdateText] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  // Add note
  const handleAdd = () => {
    addNote(newNote, date, time);
    setNewNote("");
    setDate("");
    setTime("");
  };

  // Update note
  const handleUpdate = (id) => {
    updateNote(id, updateText, date, time);
    setEdit(null);
    setUpdateText("");
    setDate("");
    setTime("");
  };

  return (
    <div>
      <h1>My Notes</h1>

      <div>
        <input
          type="text"
          placeholder="Add note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          type="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <ul>
        {note.map((n) => (
          <li key={n._id}>
            {edit === n._id ? (
              <>
                <input
                  type="text"
                  value={updateText}
                  onChange={(e) => setUpdateText(e.target.value)}
                />
                <button onClick={() => handleUpdate(n._id)}>Save</button>
                <button onClick={() => setEdit(null)}>Cancel</button>
              </>
            ) : (
              <>
                <span>{n.text}</span>
                <button
                  onClick={() => {
                    setEdit(n._id);
                    setUpdateText(n.text);
                  }}
                >
                  <GrEdit />
                </button>
                <button onClick={() => deleteNote(n._id)}>
                  <RiDeleteBin6Line />
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
