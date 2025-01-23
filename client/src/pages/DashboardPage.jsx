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
      <h1 className=" bg-clip-text bg-gradient-to-b from-sky-600 to-amber-600 font-bold text-2xl text-center text-transparent">Home</h1>

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