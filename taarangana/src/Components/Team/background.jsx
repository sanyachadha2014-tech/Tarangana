import React from 'react';
import './background.css';

export default function Background({ imagePath }) {
  return (
    <div
      className="team-fixed-background"
      style={{ backgroundImage: `url(${imagePath})` }}
    />
  );
}