import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function NoteList() {
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  const folder = {
    notes: [{ id: '1', content: "Hello" }, { id: '2', content: "World" }, { id: '3', content: "Goodbye" },
    { id: '4', content: "Cruel" }, { id: '5', content: "World" }, { id: '6', content: "Hello" }, { id: '7', content: "World" },
    { id: '8', content: "Goodbye" }, { id: '9', content: "Cruel" }, { id: '10', content: "World" }, { id: '11', content: "Hello" },
    ]
  };

  const handleNoteClick = (id) => {
    // Toggle giữa trạng thái đã chọn và chưa chọn
    setSelectedNoteId(prevSelectedNoteId => (prevSelectedNoteId === id ? null : id));
  };

  return (
    <div className="flex h-full w-full">
      {/* Sidebar - Note List */}
      <div className="w-1/4 bg-custom-gray p-2">
        {/* Header */}
        <div className="flex justify-between items-center my-2">
          <h5 className="font-bold">Notes</h5>
        </div>

        {/* Notes List */}
        <ListGroup
          className="overflow-y-auto h-screen text-left px-2"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // Internet Explorer/Edge
            overflowY: 'scroll', // Ensure scrolling works
          }}
        >
          {folder.notes.map(({ id, content }) => (
            <Link
              key={id}
              to={`note/${id}`}
              onClick={() => handleNoteClick(id)} // Cập nhật state khi click vào ghi chú
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
    </div>
  );
}
