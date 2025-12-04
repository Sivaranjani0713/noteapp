import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const NotesContext = createContext();

export const NotesProvider = ({ children }) => {
  const [note, setnote] = useState([]);

  // 🔹 Fetch all notes
  const getall = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/usernotes/get", {
        withCredentials: true,
      });
      setnote(Array.isArray(res.data.notes) ? res.data.notes : []);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Add note
  const addNote = async (newNote, date, time) => {
    if (!newNote.trim()) return;
    let deadline = null;
    if (date && time) deadline = new Date(`${date}T${time}`);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/usernotes/create",
        { id: Date.now(), text: newNote, deadline, completed: false },
        { withCredentials: true }
      );

      setnote((prev) => [...prev, res.data]);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Delete note
  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/usernotes/delete/${id}`, {
        withCredentials: true,
      });
      setnote((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Update note
  const updateNote = async (id, updatedText, date, time) => {
    if (!updatedText.trim()) return;
    let deadline = null;
    if (date && time) deadline = new Date(`${date}T${time}`);

    try {
      const res = await axios.put(
        `http://localhost:5000/api/usernotes/update/${id}`,
        { text: updatedText, deadline },
        { withCredentials: true }
      );

      setnote((prev) => prev.map((n) => (n._id === id ? res.data : n)));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getall();
  }, []);

  return (
    <NotesContext.Provider
      value={{ note, addNote, deleteNote, updateNote, getall }}
    >
      {children}
    </NotesContext.Provider>
  );
};
