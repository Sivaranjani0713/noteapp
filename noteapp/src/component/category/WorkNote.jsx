import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../category/worknotes.css";
import empty from "../assets/Detective-check-footprint 1.png";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { TiArrowBack } from "react-icons/ti";

const WorkNote = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getWorkNotes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/usernotes/get", {
          withCredentials: true,
        });
        // work category mattum filter pannuradhu
        const filtered = res.data.notes.filter((n) => n.category === "work");
        setNotes(filtered);
      } catch (err) {
        console.error(err);
      }
    };
    getWorkNotes();
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
        <h2>Work Notes</h2>
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

export default WorkNote;
