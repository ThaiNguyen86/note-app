import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function FolderList({ folders }) {

  return (
    <div className="h-full w-full bg-teal-500 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-bold text-xl text-white">Folders</h5>
        {/* <NewFolder /> */}
      </div>

      {/* Folder List with Scroll */}
      <ListGroup
        className="overflow-y-auto max-h-96 bg-teal-500 text-left p-2"
        style={{
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // Internet Explorer/Edge
          overflowY: 'scroll', // Ensure scrolling works
        }}
      >
        {folders.map(({ id, name }) => (
          <Link
            key={id}
            to={`folders/${id}`}
            className="no-underline"
          >
            <Card
                className="mb-2"

            >
              <Card.Body className="p-3">
                <Card.Text className="text-lg font-semibold text-black">{name}</Card.Text>
              </Card.Body>
            </Card>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
}
