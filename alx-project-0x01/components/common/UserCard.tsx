import React from "react";
import { UserProps } from "../../interfaces";

const UserCard: React.FC<UserProps> = ({
  name,
  username,
  email,
  phone,
  website,
  address,
  company
}) => {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white mb-4">
      <h2 className="text-xl font-bold">{name}</h2>
      <p className="text-gray-600">@{username}</p>

      <div className="mt-2">
        <p><strong>Email:</strong> {email}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Website:</strong> {website}</p>
      </div>

      <div className="mt-4">
        <p><strong>Company:</strong> {company.name}</p>
        <p className="italic text-sm">{company.catchPhrase}</p>
      </div>

      <div className="mt-4 text-sm">
        <p><strong>Address:</strong></p>
        <p>{address.street}, {address.suite}</p>
        <p>{address.city} — {address.zipcode}</p>
      </div>
    </div>
  );
};

export default UserCard;
