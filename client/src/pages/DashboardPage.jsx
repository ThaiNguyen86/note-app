import React, { useState } from "react";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";

const DashboardPage = () => {
  const [refreshNotes, setRefreshNotes] = useState(false);

  const handleNoteCreated = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h1>
      
      <div style={{ marginBottom: "30px" }}>
        <CreateNote onNoteCreated={handleNoteCreated} />
      </div>
      
      <div style={{ marginBottom: "30px" }}>
        <NoteList refresh={refreshNotes} />
      </div>
    </div>
  );
};

export default DashboardPage;
