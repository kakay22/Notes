import "./note.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faNoteSticky,
  faPen,
  faEdit,
  faList,
  faInfo,
  faSearch,
  faWarning,
  faTrash,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Note() {
  const [menuPressed, setMenuPressed] = useState(false);
  const [notes, setNotes] = useState([]);
  const [searchValue, setSearchValue] = useState("")

  const [logs, setLogs] = useState([]);

  const [prevAddedTitle, setPrevAddedTitle] = useState("");
  const [prevDeletedTitle, setPrevDeletedTitle] = useState("");
  const [prevUpdatedTitle, setPrevUpdateditle] = useState("");

  const [prevAddedDescription, setPrevAddedDescription] = useState("");
  const [prevDeletedDescription, setPrevDeletedDescription] = useState("");
  const [prevUpdatedDescription, setPrevUpdatedDescription] = useState("");

  const [addNotePressed, setAddNotePressed] = useState(false);
  const [manageNotesPressed, setManageNotesPressed] = useState(false);
  const [notesPressed, setNotesPressed] = useState(false);
  const [logsPressed, setLopgsPressed] = useState(false);
  const [aboutPressed, setAboutPressed] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  const [message, setMessage] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [lastLogIndex, setLastLogIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [operation, setOperation] = useState("");
  const [logMess, setLogMess] = useState("");

  const lastIndexLog = notes.length -1;


  const handleMenuToggle = () => {
    setMenuPressed(true);

    if (menuPressed) {
      setMenuPressed(false);
    }
  };

  const handleNotePressed = () => {
    setNotesPressed(true);
    setAddNotePressed(false);
    setManageNotesPressed(false);
    setLopgsPressed(false);
    setAboutPressed(false);
  };

  const handleAddnotePressed = () => {
    setAddNotePressed(true);
    setManageNotesPressed(false);
    setNotesPressed(false);
    setLopgsPressed(false);
    setAboutPressed(false);
  };

  const handleManageNotePressed = () => {
    setManageNotesPressed(true);
    setAddNotePressed(false);
    setNotesPressed(false);
    setLopgsPressed(false);
    setAboutPressed(false);
  };

  const handleLogPressed = () => {
    setLopgsPressed(true);
    setManageNotesPressed(false);
    setAddNotePressed(false);
    setNotesPressed(false);
    setAboutPressed(false);
  };

  const handleAboutPressed = () => {
    setAboutPressed(true);
    setLopgsPressed(false);
    setManageNotesPressed(false);
    setAddNotePressed(false);
    setNotesPressed(false);
  };

  const handeAddNote = () => {
    if (title != "" && description != "") {
      const currentTime = new Date().toDateString();
      const newItem = { title, description, currentTime, logMess };
      setPrevAddedTitle(title);
      setPrevAddedDescription(description);
      setNotes((currentNotes) => [...currentNotes, newItem]);
      setTitle("");
      setDescription("");
      setMessage("Note added!");
      setLogMess("You added the note ");
    } else {
      setMessage("Fill out all the fields!");
    }
    setTimeout(() => {
      setMessage("");
    }, 2000);

    setIsEditing(false);
    setOperation("Added note")
    setLastLogIndex(lastIndexLog);
  };

  

  const handleIsEditing = (e) => {
	setSelectedId(e);
	setIsEditing(true);
  }

  const handleEdit = (selectedId) => {
    if(editedTitle == "" && editedDescription == ""){
      setMessage("Fill out all the fields!");
      setTimeout(()=>{
        setMessage("");
      }, 1900)
    } else {
      notes[selectedId].title = editedTitle;
      notes[selectedId].description = editedDescription;

      setEditedTitle("");
      setEditedDescription("");

      setMessage("Save sucessfully!");
      setTimeout(()=>{
        setMessage("");
      }, 1800);
    }
  }

  const handleIsDeleting = (key) => {
    setIsDeleting(true);
    setSelectedId(key);
  }

  const handleDelete = (selectedId) => {
    const currentNotes = [...notes];
    currentNotes.splice(selectedId, 1);
    setNotes(currentNotes);
    setIsDeleting(false);
  }

  const handleIsViewing = (key) => {
    setSelectedId(key);
    setIsViewing(true);
  }


  return (
    <>
      <div className="container">
        <div className="header">
          <h2>Notes</h2>
          <div className="searchBar">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="search"
              name="search"
              id="search"
              placeholder="type to search note..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </div>
        </div>
        <motion.div
          className="sideBar"
          onMouseEnter={handleMenuToggle}
          onMouseLeave={handleMenuToggle}
          animate={{ width: menuPressed ? "150px" : "45px" }}
        >
          <p className="menuBtn">
            <FontAwesomeIcon
              icon={faBars}
              className="menuIcon"
              style={{ right: menuPressed ? "4%" : "20%" }}
            />
          </p>
          <button
            className="notesBtn"
            onClick={handleNotePressed}
            style={{
              background: notesPressed ? "#eee" : "transparent",
              color: notesPressed ? "black" : "white",
            }}
          >
            <FontAwesomeIcon icon={faNoteSticky} className="icon" /> Notes
          </button>
          <button
            className="addNoteBtn"
            onClick={handleAddnotePressed}
            style={{
              background: addNotePressed ? "#eee" : "transparent",
              color: addNotePressed ? "black" : "white",
            }}
          >
            <FontAwesomeIcon icon={faPen} className="icon" /> Add note
          </button>
          <button
            className="manageNoteBtn"
            onClick={handleManageNotePressed}
            style={{
              background: manageNotesPressed ? "#eee" : "transparent",
              color: manageNotesPressed ? "black" : "white",
            }}
          >
            <FontAwesomeIcon icon={faEdit} className="icon" /> Manage notes
          </button>
          <button
            className="logsBtn"
            onClick={handleLogPressed}
            style={{
              background: logsPressed ? "#eee" : "transparent",
              color: logsPressed ? "black" : "white",
            }}
          >
            <FontAwesomeIcon icon={faList} className="icon" /> Logs
          </button>
          <button
            className="aboutBtn"
            onClick={handleAboutPressed}
            style={{
              background: aboutPressed ? "#eee" : "transparent",
              color: aboutPressed ? "black" : "white",
            }}
          >
            <FontAwesomeIcon icon={faInfo} className="icon" /> About
          </button>
        </motion.div>

        <motion.div
          className="contents"
          animate={{ width: menuPressed ? "84.8%" : "92.5%" }}
        >
          <center>{notes.length == 0 ? "No notes yet!" : ""}</center>

          <div className="noteContainer">
            {notes.filter((item)=>(
              searchValue.toLowerCase() === "" ? item : item.title.includes(searchValue.toLowerCase())
            )).map((item, key) => (
              <p className="note" key={key}>
                <p className="currentTime">{item.currentTime}</p>
                <p className="title">{item.title}</p>
                <p className="description">{item.description}</p>
              </p>
            ))}
          </div>

          {addNotePressed && (
            <div className="addNoteContainer">
              <h3>Add Note:</h3>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="Title:"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <br />
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="10"
                placeholder="Description:"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
              <button className="addBtn" onClick={handeAddNote}>
                ADD NOTE
              </button>
              <h3
                className="message"
                style={{
                  color:
                    message === "Fill out all the fields!" ? "red" : "green",
                }}
              >
                {message}
              </h3>
            </div>
          )}

          {manageNotesPressed && (
            <div className="manageNotesContainer">
              <h3>Manage notes</h3>

              <table className="manageTable">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Time created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {notes.filter((item) => (
                      searchValue.toLowerCase() === "" ? item : item.title.includes(searchValue.toLowerCase())
                    )).map((item, key) => (
                    <tr key={key}>
                      <td>{item.title}</td>
                      <td>{item.description}</td>
                      <td>{item.currentTime}</td>
                      <td>
                        <button className="editBtn" onClick={() => handleIsEditing(key)}><FontAwesomeIcon icon={faEdit} /> <br /> EDIT </button> |{" "}
                        <button className="deleteBtn" onClick={() => handleIsDeleting(key)}><FontAwesomeIcon icon={faTrash} /> DELETE</button> |{" "}
                        <button className="viewBtn" onClick={() => handleIsViewing(key)}><FontAwesomeIcon icon={faEye} /> VIEW</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

			  {isEditing && selectedId >= 0 && (
				<div className="isEditingContainer">
					<div className="isEditingForm">
						<button className="closeBtn" onClick={() => setIsEditing(false)}>x</button>
						<label htmlFor="title">Edit Title: </label><br />
						<input type="text" name="editedTitle" id="editedTitle" placeholder={notes[selectedId].title} onChange={(e) => setEditedTitle(e.target.value)}/><br />
						<label htmlFor="description">Edit description: </label><br />
						<textarea name="editedDescription" id="editedDescription" cols="30" rows="10" placeholder={notes[selectedId].description} onChange={(e) => setEditedDescription(e.target.value)}></textarea><br />

            <button className="saveBtn" onClick={() => handleEdit(selectedId)}>SAVE</button>
            <p className="message">{message}</p>
					</div>
				</div>
			  )}

        {isDeleting && selectedId >= 0 &&  (
          <div className="isDeletingContainer">
              <p className="warningLogo"><FontAwesomeIcon icon={faWarning} /></p>
              <h1>Are you sure you want to delete {notes[selectedId].title} ?</h1><br />
              <div><button className="deleteBtn" onClick={() => handleDelete(selectedId)}>DELETE</button><button className="cancelBtn" onClick={() => setIsDeleting(false)}>CANCEL</button></div>
          </div> 
        )}

        {isViewing && selectedId >= 0 && (
          <div className="isViewingContainer">
            <div className="viewingCard">
              <button className="viewingCloseBtn" onClick={() => setIsViewing(false)}>x</button>
                <table>
                  <tr>
                    <th>Note title: </th>
                    <td>{notes[selectedId].title}</td>
                  </tr>
                  <tr>
                    <th>Note description: </th>
                    <td>{notes[selectedId].description}</td>
                  </tr>
                  <tr>
                    <th>Date created: </th>
                    <td>{notes[selectedId].currentTime}</td>
                  </tr>
                </table>
            </div>
          </div>
        )}

        </div>
          )}

          {logsPressed && (
            <div className="logsContainer">
              <h3 style={{marginLeft: "30px"}}>Logs</h3>

              <table className="logsTable">
                  <thead>
                    <tr>
                      <th>OPERATION</th>
                      <th>SPECIFICATION</th>
                      <th>TIME</th>
                    </tr>
                  </thead>
                  <tbody>
                    {notes.filter((item) => (
                      searchValue.toLowerCase() === "" ? item : item.title.includes(searchValue.toLowerCase())
                    )).map((item, key) => (
                      <tr key={key}>
                        <td>{operation}</td>
                        <td>{logMess} "{item.title}".</td>
                        <td>{item.currentTime}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          )}

          {aboutPressed && (
            <div className="aboutContainer">
              <h3>About pressed</h3>
            </div>
          )}
        </motion.div>
      </div>
    </>
  );
}
