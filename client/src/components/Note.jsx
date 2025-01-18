import React, {useEffect, useState} from "react";
import {ContentState, convertFromHTML, convertToRaw, EditorState} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {draftToHTML} from "draftjs-to-html"

export default function Note() {

    const note = {
        id: "1",
        content: "This is a note",
    };
    const [editorState, setEditorState] = useState(() => {
        EditorState.createEmpty()
    });
    const [rawHTML, setRawHTML] = useState(note)

    useEffect(() => {
        setRawHTML(note.content);
    }, [note.content]);

    useEffect(() => {
        const blocksFromHTML = convertFromHTML(note.content);
        const state = ContentState.createFromBlockArray(
            blocksFromHTML.contentBlocks,
            blocksFromHTML.entityMap
        );
        setEditorState(EditorState.createWithContent(state));
    }, [note.id]);

    const handleOnChange = (editorState) => {
        setEditorState(editorState);
        setRawHTML(draftToHTML(convertToRaw(editorState.getCurrentContent())));
    };

    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={handleOnChange}
            placeholder="Write your note here..."
        />
    )
}
    