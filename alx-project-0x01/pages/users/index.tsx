import React, { useState } from "react";
import UserCard from "../../components/common/UserCard";
import Header from "../../components/layout/Header";
import UserModal from "../../components/common/UserModal";
import { UserProps, UserData } from "../../interfaces";

interface UsersPageProps {
  posts: UserProps[];
}

const Users: React.FC<UsersPageProps> = ({ posts }) => {
  const [users, setUsers] = useState(posts);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddUser = (user: Omit<UserData, "id">) => {
    const newUser: UserData = { ...user, id: users.length + 1 };
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <Header />
      <div className="p-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Users</h1>
        <button onClick={() => setIsModalOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Add User
        </button>
      </div>

      <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>

      <UserModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleAddUser} />
    </div>
  );
};

export async function getStaticProps() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const posts = await response.json();

  return {
    props: { posts },
  };
}

export default Users;
