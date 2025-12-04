import axios from "axios";
import { useState, useEffect } from "react";
import { GrEdit } from "react-icons/gr";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./noteslist.css";
import { FaPlus, FaTimes } from "react-icons/fa";
import { IoAddCircle } from "react-icons/io5";
import { LuTimerReset } from "react-icons/lu";
import image from "./assets/Detective-check-footprint 1.png";
import { FaUserClock } from "react-icons/fa6";
import { RiCloseCircleFill } from "react-icons/ri";

export const NotesList = () => {
  const [newTitle, setNewTitle] = useState(""); // create ku
  const [updateTitle, setUpdateTitle] = useState(""); // edit ku
  const [showSettings, setShowSettings] = useState(false);
  const [showNotes, setShownotes] = useState(false);
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [updateDate, setUpdateDate] = useState("");
  const [updateTime, setUpdateTime] = useState("");
  const [note, setnote] = useState([]);
  const [newNote, setNotes] = useState("");
  const [updatenote, setUpdate] = useState("");
  const [edit, setEdit] = useState(null);

  const getall = async () => {  
    try {
      const getapi = await axios.get(
        "http://localhost:5000/api/usernotes/get",
        { withCredentials: true }
      );
      // console.log("Fetched notes:", getapi.data);
      setnote(getapi.data.get);
      setnote(Array.isArray(getapi.data.notes) ? getapi.data.notes : []);
    } catch (error) {
      console.log(error);
    }
  };
  const singleNumStartZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  // Convert to 12-hour format
  const formatHour = (hour) => {
    return hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  };
  const formatDate = (date) => {
    const options = {
      weekday: "long",
      month: "long",
      year: "numeric",
      day: "numeric",
    };
    return date.toLocaleDateString(undefined, options);
  };

  // Format time (hh:mm AM/PM)
  const formatTime = (date) => {
    const hours = formatHour(date.getHours());
    const minutes = singleNumStartZero(date.getMinutes());
    const ampm = date.getHours() >= 12 ? "PM" : "AM";
    return `${hours}:${minutes} ${ampm}`;
  };
  const handleAddnotes = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !newTitle.trim()) return;
    let deadline = null;
    if (date && time) {
      deadline = new Date(`${date}T${time}`);
    }
    try {
      const addbtn = await axios.post(
        "http://localhost:5000/api/usernotes/create",
        {
          id: Date.now(),
          title: newTitle,
          text: newNote,
          category,
          deadline,
          completed: false,
        },
        { withCredentials: true }
      );
      if (deadline) {
        const now = new Date();
        const timeDifferent = deadline.getTime() - now.getTime();
        if (timeDifferent > 0) {
          setTimeout(() => {
            showNotification(note);
          }, timeDifferent);
        }
      }
      const formattedDeadline = deadline
        ? `${formatDate(deadline)} at ${formatTime(deadline)}`
        : null;

      const taskWithFormat = {
        ...addbtn.data,
        formattedDeadline,
      };
      console.log("created:", taskWithFormat);
      setnote((prev) => [...prev, taskWithFormat]);
      setNewTitle("");
      setNotes("");
      setDate("");
      setTime("");
      setShownotes(false);
    } catch (error) {
      console.log(error);
    }
  };
  const showNotification = (notetext) => {
    if (Notification.permission === "granted") {
      new Notification("Reminder:", { body: notetext });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("Reminder:", { body: notetext });
        } else {
          alert(`Reminder: ${notetext}`);
        }
      });
    } else {
      alert(`Reminder: ${notetext}`);
    }
  };
  const handleDeleteNotes = async (id) => {
    try {
      const deletenote = await axios.delete(
        `http://localhost:5000/api/usernotes/delete/${id}`,
        { withCredentials: true }
      );
      setnote((prev) => prev.filter((filternote) => filternote._id !== id));
      console.log(deletenote);
      // getall();
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdate = async (id, e) => {
    if (e) e.preventDefault();
    if (!updatenote.trim() || !updateTitle.trim()) return;
    try {
      let deadline = null;
      if (updateDate && updateTime) {
        deadline = new Date(`${updateDate}T${updateTime}`);
      }
      const update = await axios.put(
        `http://localhost:5000/api/usernotes/update/${id}`,
        { title: updateTitle, text: updatenote, deadline, category },
        { withCredentials: true }
      );
      const updatedNote = update.data.note || update.data;
      const formattedDeadline = deadline
        ? `${formatDate(deadline)} at ${formatTime(deadline)}`
        : null;
      setnote((prev) =>
        prev.map((oldnote) =>
          oldnote._id === id ? { ...updatedNote, formattedDeadline } : oldnote
        )
      );
      console.log("updated", update);
      setUpdate("");
      setUpdateTitle("");
      setDate("");
      setTime("");
      setEdit(null);
    } catch (error) {
      console.log(error);
    }
  };
  const handleEditbtn = (note) => {
    setEdit(note._id);
    setUpdate(note.text);
    setUpdateTitle(note.title || "");
    if (note.deadline) {
      const d = new Date(note.deadline);

      // convert to yyyy-mm-dd (for <input type="date">)
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, "0");
      const dd = String(d.getDate()).padStart(2, "0");

      // convert to HH:MM (24h format for <input type="time">)
      const hh = String(d.getHours()).padStart(2, "0");
      const min = String(d.getMinutes()).padStart(2, "0");

      setUpdateDate(`${yyyy}-${mm}-${dd}`);
      setUpdateTime(`${hh}:${min}`);
    } else {
      setUpdateDate("");
      setUpdateTime("");
    }
  };

  // 🔹 date filters
  const isToday = (d) => {
    const today = new Date();
    return (
      d.getDate() === today.getDate() &&
      d.getMonth() === today.getMonth() &&
      d.getFullYear() === today.getFullYear()
    );
  };
  const isTomorrow = (d) => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return (
      d.getDate() === tomorrow.getDate() &&
      d.getMonth() === tomorrow.getMonth() &&
      d.getFullYear() === tomorrow.getFullYear()
    );
  };
  const isYesterday = (d) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return (
      d.getDate() === yesterday.getDate() &&
      d.getMonth() === yesterday.getMonth() &&
      d.getFullYear() === yesterday.getFullYear()
    );
  };
  //past
  const isPast = (d) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return d < new Date(yesterday.setHours(0, 0, 0, 0));
  };

  // Filter notes
  // const filteredNotes = category
  //   ? note.filter((n) => n.category === category)
  //   : note;

  const [openclosk, setOpen] = useState(false);

  useEffect(() => {
    getall();
  }, []);

  return (
    <div className="mains">
      <div
        className="date-btn"
        onClick={() => setOpen((p) => !p)}
        aria-expanded={openclosk}
        aria-haspopup="true"
      >
        {openclosk ? (
          <RiCloseCircleFill className="closes" />
        ) : (
          <FaUserClock className={`date-icon ${openclosk ? "active" : ""}`} />
        )}{" "}
      </div>
      <div className="left-side">
        {openclosk && (
          <div className="date-dropdown">
            <ul className="sidebars">
              <h4>Tomorrow</h4>
              <div className="section">
                {note
                  .filter((n) => n.deadline && isTomorrow(new Date(n.deadline)))
                  .map((n) => (
                    <li key={n._id} className={`lists ${n.category}`}>
                      {n.title}
                    </li>
                  ))}
              </div>

              <h4>Today</h4>
              <div className="section">
                {note
                  .filter((n) => n.deadline && isToday(new Date(n.deadline)))
                  .map((n) => (
                    <li key={n._id} className={`lists ${n.category}`}>
                      {n.title}
                    </li>
                  ))}
              </div>
              <h4>Yesterday</h4>
              <div className="section">
                {note
                  .filter(
                    (n) => n.deadline && isYesterday(new Date(n.deadline))
                  )
                  .map((n) => (
                    <li key={n._id} className={`lists ${n.category}`}>
                      {n.title}
                    </li>
                  ))}
              </div>
              <h4>Past Day's</h4>
              <div className="section">
                {note
                  .filter((n) => n.deadline && isPast(new Date(n.deadline)))
                  .map((n) => (
                    <li key={n._id} className={`lists ${n.category}`}>
                      {n.title}
                    </li>
                  ))}
              </div>
            </ul>
          </div>
        )}
        <ul className="sidebar">
          <h4>Tomorrow</h4>
          <div className="section">
            {note
              .filter((n) => n.deadline && isTomorrow(new Date(n.deadline)))
              .map((n) => (
                <li key={n._id} className={`lists ${n.category}`}>
                  {n.title}
                </li>
              ))}
          </div>

          <h4>Today</h4>
          <div className="section">
            {note
              .filter((n) => n.deadline && isToday(new Date(n.deadline)))
              .map((n) => (
                <li key={n._id} className={`lists ${n.category}`}>
                  {n.title}
                </li>
              ))}
          </div>
          <h4>Yesterday</h4>
          <div className="section">
            {note
              .filter((n) => n.deadline && isYesterday(new Date(n.deadline)))
              .map((n) => (
                <li key={n._id} className={`lists ${n.category}`}>
                  {n.title}
                </li>
              ))}
          </div>
          <h4>Past Day's</h4>
          <div className="section">
            {note
              .filter((n) => n.deadline && isPast(new Date(n.deadline)))
              .map((n) => (
                <li key={n._id} className={`lists ${n.category}`}>
                  {n.title}
                </li>
              ))}
          </div>
        </ul>
      </div>
      <div className="alls">
        {showNotes && (
          <div className="modal-overlay">
            <div className="todo-input">
              <form action="" className="notesform">
                <div className="title">
                  <label htmlFor="">Title:</label>
                  <input
                    className="input"
                    type="text"
                    placeholder="Title"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="title">
                  <label htmlFor="">Note:</label>
                  <textarea
                    className="inputs note-textarea"
                    type="text"
                    placeholder="Create your Notes here"
                    value={newNote}
                    onChange={(e) => setNotes(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAddnotes(e)}
                  />
                </div>
                <div className="title">
                  <label htmlFor="">Category:</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="select">Select--Option</option>
                    <option value="work">Work</option>
                    <option value="personal">Personal</option>
                    <option value="study">Study</option>
                    <option value="idea">Idea</option>
                  </select>
                </div>
                <div className="date-time">
                  <label htmlFor="">Date:</label>
                  <input
                    className="input"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                  />
                  <label htmlFor="">Time:</label>
                  <input
                    className="input"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
                {/* {createshowSettings && (
            )} */}
                <div className="btns">
                  {" "}
                  <button className="add-btn" onClick={handleAddnotes}>
                    Add
                  </button>
                  <button
                    className="add-btns"
                    onClick={() => setShownotes(false)}
                  >
                    Close
                  </button>
                </div>
              </form>
              {/* <div>
            <button onClick={() => setcreateShowSettings(!createshowSettings)}>
              {createshowSettings ? "close" : "open"}
            </button>
          </div> */}
            </div>
          </div>
        )}
        {note.length === 0 ? (
          <div className="empty-state">
            <img
              src={image} // <-- oru local/public folder la or online URL kudukkalaam
              alt="No notes"
            />
            <p>Empty</p>
          </div>
        ) : (
          <>
            <p className="tasks-list">Your Task List</p>
            <ul className="task-list">
              {note.map((data) => (
                <li key={data._id} className="list">
                  {edit === data._id ? (
                    <>
                      <div className="inside">
                        <input
                          type="text"
                          placeholder="Edit here"
                          value={updatenote}
                          onChange={(e) => setUpdate(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleUpdate(data._id);
                            }
                          }}
                        />
                        <button
                          className="toggle-btn"
                          onClick={() => {
                            if (showSettings) {
                              // Already open irundha close panna → values reset pannidum
                              setDate("");
                              setTime("");
                            }
                            setShowSettings(!showSettings); // toggle open/close
                          }}
                        >
                          {showSettings ? (
                            <FaTimes className="close-date" />
                          ) : (
                            <FaPlus className="add-date" />
                          )}
                        </button>

                        {showSettings && (
                          <div className="note-date">
                            <input
                              type="date"
                              value={updateDate}
                              onChange={(e) => setUpdateDate(e.target.value)}
                            />
                            <input
                              type="time"
                              value={updateTime}
                              onChange={(e) => setUpdateTime(e.target.value)}
                            />
                            <button
                              className="btn-reset"
                              onClick={() => {
                                setUpdateDate("");
                                setUpdateTime("");
                              }}
                            >
                              <LuTimerReset className="reset" />
                            </button>
                          </div>
                        )}
                        <div className="inside-btn">
                          <button
                            className="save"
                            onClick={() => handleUpdate(data._id)}
                          >
                            Save
                          </button>
                          <button
                            className="cancel"
                            onClick={() => {
                              setEdit(null);
                              setUpdate("");
                              setDate("");
                              setTime("");
                              setShowSettings(false);
                            }}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="para-text">
                        <span className="notes">{data.text}</span>
                        <p className="reminder">
                          {data.deadline
                            ? `${formatDate(
                                new Date(data.deadline)
                              )} at ${formatTime(new Date(data.deadline))}`
                            : ""}
                        </p>
                      </div>
                      <div className="outer-btn">
                        {" "}
                        <button
                          className="edit"
                          onClick={() => handleEditbtn(data)}
                        >
                          <GrEdit className="icon" />
                        </button>
                        <button
                          className="delete"
                          onClick={() => handleDeleteNotes(data._id)}
                        >
                          <RiDeleteBin6Line className="icons" />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </>
        )}
        <button className="addnotes" onClick={() => setShownotes(true)}>
          <IoAddCircle
            className="addnoteicon"
            onClick={() => setShownotes(true)}
          />
          Create New Notes
        </button>
      </div>
    </div>
  );
};

export default NotesList;
