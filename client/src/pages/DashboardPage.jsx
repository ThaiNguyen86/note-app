import React, { useState } from "react";
<<<<<<< HEAD
=======
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> origin/thuandoan
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";

const DashboardPage = () => {
  const [refreshNotes, setRefreshNotes] = useState(false);

  const handleNoteCreated = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
<<<<<<< HEAD
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h1>
      
      <div style={{ marginBottom: "30px" }}>
        <CreateNote onNoteCreated={handleNoteCreated} />
      </div>
      
      <div style={{ marginBottom: "30px" }}>
=======
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary fw-bold display-4">Dashboard</h1>

      <div className="mb-4">
        <CreateNote onNoteCreated={handleNoteCreated} />
      </div>

      <div className="mb-4">
>>>>>>> origin/thuandoan
        <NoteList refresh={refreshNotes} />
      </div>
    </div>
  );
};

export default DashboardPage;