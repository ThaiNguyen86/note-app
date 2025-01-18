import React, { useEffect, useState } from 'react';
import { Link, Outlet, useParams, useLoaderData, useSubmit, useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function NoteList() {

  const folder = {
    notes: [{ id: '1', content: "Hello" }, { id: '2', content: "World" }, { id: '3', content: "Goodbye" },
    { id: '4', content: "Cruel" }, { id: '5', content: "World" }, { id: '6', content: "Hello" }, { id: '7', content: "World" },
    { id: '8', content: "Goodbye" }, { id: '9', content: "Cruel" }, { id: '10', content: "World" }, { id: '11', content: "Hello" },
    ]
  };



  return (
    <div className="flex h-full w-full">
      {/* Sidebar - Note List */}
      <div className=" w-1/3 bg-amber-200 p-3 ">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h5 className="font-bold">Notes</h5>

        </div>

        {/* Notes List */}
        <ListGroup
          className="overflow-y-auto gap-2 max-h-96 text-left p-2"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // Internet Explorer/Edge
            overflowY: 'scroll', // Ensure scrolling works
          }}
        >
          <style>
            {`
      /* Hide scrollbar for Chrome, Safari, and Edge */
      .overflow-y-auto::-webkit-scrollbar {
        display: none;
      }
      /* Hide scrollbar for Firefox */
      .overflow-y-auto {
        scrollbar-width: none;
      }
    `}
          </style>
          {folder.notes.map(({ id, content }) => (
            <Link key={id} to={`note/${id}`}>
              <Card>
                <Card.Body className="p-2">
                  <div
                    className="text-sm font-semibold mb-1"
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
      <div className="w-2/3">
        <Outlet />
      </div>
    </div>
  );
}
