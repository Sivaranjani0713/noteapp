import React from "react";
import Registerform from "./component/RegisterForm";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotesList from "./component/NotesList";
import Homepage from "./component/Homepage";
import Loginform from "./component/LoginForm";
import WorkNote from "./component/category/WorkNote";
import PersonalNotes from "./component/category/PersonalNotes";
import StudyNotes from "./component/category/StudyNotes";
import IdeaNote from "./component/category/IdeaNote";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Registerform />} />
        <Route path="/login" element={<Loginform />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/notes" element={<NotesList />} />
        <Route path="/notes/work" element={<WorkNote />} />
        <Route path="/notes/personal" element={<PersonalNotes />} />
        <Route path="/notes/study" element={<StudyNotes />} />
        <Route path="/notes/idea" element={<IdeaNote />} />
      </Routes>
    </BrowserRouter>
  );
}
