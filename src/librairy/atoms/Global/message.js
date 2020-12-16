import { useState } from "react";

export const Message = ({ children }) => {
  const [isVisible, setVisibility] = useState(true);
  const display = isVisible ? 'block' : 'none';

  return (
    <div className="advertisement-message" style={{display}}>
      {children}
      <a onClick={() => setVisibility(false)} style={{marginLeft: '0.5rem'}}>Fermer</a>
    </div>
  )
}