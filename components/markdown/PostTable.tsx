import React from 'react';

interface Props {
  className: string;
  children: React.ReactNode;
}

export const PostTable: React.FC<Props> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table ${className}`}>{children}</table>
    </div>
  );
};
