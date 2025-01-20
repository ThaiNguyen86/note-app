import React from "react";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";
import NoteShare from "../components/NoteShare";

const DashboardPage = () => {
    return (
        <div style={{ padding: "20px", maxWidth: "900px", margin: "auto" }}>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>Dashboard</h1>
            
            <div style={{ marginBottom: "30px" }}>
                <CreateNote />
            </div>
            
            <div style={{ marginBottom: "30px" }}>
                <NoteList />
            </div>
        </div>
    );
};

export default DashboardPage;
