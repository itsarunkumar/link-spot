// Layout component code here (tsx)
  import React from 'react';
  
  export default function appLayout({children}) {
    return (
      <div>
        <h1>{children}</h1>
      </div>
    );
  }