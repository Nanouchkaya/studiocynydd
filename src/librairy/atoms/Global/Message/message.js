import { useState } from "react";

export const Message = ({ children }) => {
  const [isVisible, setVisibility] = useState(true);
  const display = isVisible ? 'block' : 'none';

  return (
    <div style={{
      display: display,
      position: 'fixed',
      bottom: '0',
      width: '100%',
      textAlign: 'center',
      backgroundColor: '#f4ece9',
      color: '#8d0c22',
      padding: '1rem'
    }}>
      {children}
      <a onClick={() => setVisibility(false)}>Fermer</a>
    </div>
  )
}