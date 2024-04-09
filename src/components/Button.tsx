import * as React from "react";

interface Props {
  children?: React.ReactNode;
  onClick: () => void;
}

function Button({ children, onClick }: Props) { 
  return (
    <button onClick={onClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    {children}
    </button>
  );
}

export default Button;