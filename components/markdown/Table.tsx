import React, { useEffect, useState, useRef, Children } from 'react';

interface Props {
  className: string;
}

export const Table: React.FC<Props> = ({ children, className }) => {
  return (
    <div className="overflow-x-auto">
      <table className={`table ${className}`}>{children}</table>
    </div>
  );
};
