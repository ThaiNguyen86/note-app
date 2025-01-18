import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    folderID: {
        type: String,
        required: true,
    },
}, { timestamps: true }); //auto add createdAt, updatedAt fields into document

const NoteModel = mongoose.model("Note", folderSchema);
export default NoteModel;
