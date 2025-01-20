import React from "react";
import CreateNote from "../components/CreateNote";
import NoteList from "../components/NoteList";

const DashboardPage = () => {
    return (
        <div>
            <CreateNote />
            <NoteList />
        </div>
    );
};

export default DashboardPage;
