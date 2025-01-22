import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";

const DashboardPage = () => {
  const [refreshNotes, setRefreshNotes] = useState(false);

  const handleNoteCreated = () => {
    setRefreshNotes((prev) => !prev);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4 text-primary fw-bold display-4">Dashboard</h1>

      <div className="mb-4">
        <CreateNote onNoteCreated={handleNoteCreated} />
      </div>

      <div className="mb-4">
        <NoteList refresh={refreshNotes} />
      </div>
    </div>
  );
};

export default DashboardPage;