import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    authorID: {
        type: String,
        required: true,
    },
    notes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
    }],
}, { timestamps: true }); //auto add createdAt, updatedAt fields into document

const FolderModel = mongoose.model("Folder", folderSchema);
export default FolderModel;
