// Example: PersonalNotes.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import empty from "../assets/Detective-check-footprint 1.png";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import "../category/worknotes.css";

const PersonalNotes = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getPersonalNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/usernotes/get", {
          withCredentials: true,
        });
        const filtered = res.data.notes.filter(
          (n) => n.category === "personal"
        );
        setNotes(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    getPersonalNotes();
  }, []);
  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <div className="notes-body">
      <div className="notes-container">
        <TiArrowBack onClick={() => navigate("/home")} className="back" />
        <h2>Personal Notes</h2>
        <div className="search-box">
          <BsFillSearchHeartFill className="search-icon" />
          <input
            className="search"
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {notes.length === 0 ? (
          <div className="empty-state">
            <img
              src={empty} // <-- oru local/public folder la or online URL kudukkalaam
              alt="No notes"
            />
            <p>Empty</p>
          </div>
        ) : (
          <ul className="work-list">
            {filteredNotes.length === 0 ? (
              <p>No results found</p>
            ) : (
              filteredNotes.map((n) => (
                <li key={n._id} className="works">
                  <div>
                    <label>Title:</label>
                    <span>{n.title}</span>
                  </div>{" "}
                  <div>
                    <label>Notes:</label>
                    <span>{n.text}</span>
                  </div>
                  <span>{n.deadline}</span>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default PersonalNotes;
