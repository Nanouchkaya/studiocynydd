import { useState } from "react";

export const Message = ({ children }) => {
  // const [isVisible, setVisibility] = useState(true);
  // const display = isVisible ? 'block' : 'none';

  return (
    <div className='advertisement-message'>
      {children}
    </div>
  )
}