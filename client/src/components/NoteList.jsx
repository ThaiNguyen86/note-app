import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

export default function NoteList() {
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [notes, setNotes] = useState([
    { id: '1', content: "Hello" },
    { id: '2', content: "World" },
    { id: '3', content: "Goodbye" },
    { id: '4', content: "Cruel" },
    { id: '5', content: "World" },
    { id: '6', content: "Hello" },
    { id: '7', content: "World" },
    { id: '8', content: "Goodbye" },
    { id: '9', content: "Cruel" },
    { id: '10', content: "World" },
    { id: '11', content: "Hello" },
  ]);
  const [showModal, setShowModal] = useState(false); // Trạng thái hiển thị modal
  const [newNoteContent, setNewNoteContent] = useState(''); // Nội dung ghi chú mới

  const handleNoteClick = (id) => {
    setSelectedNoteId((prevSelectedNoteId) => (prevSelectedNoteId === id ? null : id));
  };

  const handleAddNote = () => {
    const newNote = {
      id: (notes.length + 1).toString(),
      content: newNoteContent || "Untitled Note",
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNewNoteContent(''); // Reset nội dung ghi chú mới
    setShowModal(false); // Đóng modal
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar - Note List */}
      <div className="w-1/4 bg-custom-gray p-2">
        {/* Header */}
        <div className="flex justify-between items-center my-2">
          <h5 className="font-bold">Notes</h5>
          <button onClick={() => setShowModal(true)}>📝➕</button>
        </div>

        {/* Notes List */}
        <ListGroup
          className="overflow-y-auto h-screen text-left px-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            overflowY: 'scroll',
          }}
        >
          {notes.map(({ id, content }) => (
            <Link
              key={id}
              to={`note/${id}`}
              onClick={() => handleNoteClick(id)}
            >
              <Card
                className={`mb-2 ${selectedNoteId === id ? 'bg-custom-yellow' : ''} hover:bg-custom-yellow transition-all duration-200`}
              >
                <Card.Body className="p-2">
                  <div
                    className={`text-sm font-semibold ${selectedNoteId === id ? 'text-black' : 'text-gray-600'}`}
                    dangerouslySetInnerHTML={{
                      __html: `${content.substring(0, 30) || 'Empty'}`,
                    }}
                  />
                  <small className="text-gray-500"></small>
                </Card.Body>
              </Card>
            </Link>
          ))}
        </ListGroup>
      </div>

      {/* Content Area */}
      <div className="w-3/4 mx-2">
        <Outlet />
      </div>

      {/* Modal for Adding Note */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Note Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter note content"
                value={newNoteContent}
                onChange={(e) => setNewNoteContent(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAddNote}>
            Add Note
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
