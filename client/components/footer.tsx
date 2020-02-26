import React, { Component } from 'react';
import ResponseButton from './resp_button';

// <div className="button-group">
//   <button type="button">{'> Yes'}</button>
//   <button type="button">{'> No'}</button>
// </div>

export default function Sidebar() {
  return (
    <div className="footer">
      <div>
        AUTHORIZED RESPONSE OPTIONS:
      </div>
      <div>
        <ResponseButton givenValue='scrambled' />
      </div>
    </div>
  );
}
