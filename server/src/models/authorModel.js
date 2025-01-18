import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
}, { timestamps: true }); //auto add createdAt, updatedAt fields into document

const AuthorModel = mongoose.model("Author", folderSchema);
export default AuthorModel;
