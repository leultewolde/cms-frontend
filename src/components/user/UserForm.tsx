import React, {useState} from 'react';
import {createUser} from '@/services/userService';
import {UserRequestDTO, UserResponseDTO} from '@/types/user';
import {Role} from "@/types/enums";

const UserForm = ({addUser}: { addUser: (user: UserResponseDTO) => void }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<Role>(Role.CONTRIBUTOR);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const newUser: UserRequestDTO = {username, role};
        try {
            const response = await createUser(newUser);
            addUser(response);
            // Reset form
            setUsername('');
            setEmail('');
            setRole(Role.CONTRIBUTOR);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="input-container">
                <label>Username:</label>
                <input
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
            </div>
            <div className="input-container">
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-container">
                <label>Role:</label>
                <select value={role} onChange={(e) => setRole(e.target.value as Role)}>
                    <option value={Role.CONTRIBUTOR}>Contributor</option>
                    <option value={Role.REVIEWER}>Reviewer</option>
                    <option value={Role.ADMINISTRATOR}>Administrator</option>
                </select>
            </div>
            <button type="submit">Create User</button>
        </form>
    );
};

export default UserForm;
