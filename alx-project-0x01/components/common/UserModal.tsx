import React, { useState } from "react";
import { UserModalProps } from "../../interfaces";

const UserModal: React.FC<UserModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    website: "",
    company: { name: "", catchPhrase: "", bs: "" },
    address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const keys = name.split(".");
    if (keys.length === 1) {
      setFormData({ ...formData, [name]: value });
    } else if (keys[0] === "company") {
      setFormData({ ...formData, company: { ...formData.company, [keys[1]]: value } });
    } else if (keys[0] === "address") {
      if (keys[1] === "geo") {
        setFormData({
          ...formData,
          address: { ...formData.address, geo: { ...formData.address.geo, [keys[2]]: value } },
        });
      } else {
        setFormData({ ...formData, address: { ...formData.address, [keys[1]]: value } });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
    setFormData({
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
      company: { name: "", catchPhrase: "", bs: "" },
      address: { street: "", suite: "", city: "", zipcode: "", geo: { lat: "", lng: "" } },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Add New User</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="website" placeholder="Website" value={formData.website} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="company.name" placeholder="Company Name" value={formData.company.name} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="company.catchPhrase" placeholder="Catch Phrase" value={formData.company.catchPhrase} onChange={handleChange} className="border p-2 w-full rounded" />
          <input name="company.bs" placeholder="BS" value={formData.company.bs} onChange={handleChange} className="border p-2 w-full rounded" />

          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
