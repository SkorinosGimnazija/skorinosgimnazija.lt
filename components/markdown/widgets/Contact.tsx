import React from 'react';
import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';

interface Props {
  image?: string;
  name: string;
  phone: string;
  email?: string;
  title?: string;
}

export const Contact: React.FC<Props> = ({ children, image, name, phone, email, title }) => {
  return (
    <div className="mb-10 flex items-center overflow-hidden rounded-lg bg-white shadow-md">
      {image && <img className="hidden sm:block" src={image} alt={name} width="200px" />}
      <div className="m-4">
        <p className="text-xl font-bold">{name}</p>
        {title && <p className="mb-4">{title}</p>}
        <p>
          <HiOutlinePhone className="mr-1 inline text-xl" />
          {phone}
        </p>
        {email && (
          <p className="break-all">
            <HiOutlineMail className="mr-1 inline text-xl" />
            {email}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};
