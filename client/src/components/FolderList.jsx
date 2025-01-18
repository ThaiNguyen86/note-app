import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function FolderList({ folders }) {

  return (
    <div className="h-full w-1/3 bg-teal-500 p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <h5 className="font-bold text-xl text-white">Folders</h5>
        {/* <NewFolder /> */}
      </div>

      {/* Folder List with Scroll */}
      <ListGroup
        className="overflow-y-auto max-h-96 bg-teal-500 text-left p-2"
        style={{
          scrollbarWidth: 'thin', // For Firefox
          scrollbarColor: 'gray lightgray', // For Firefox
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
