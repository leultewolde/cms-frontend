'use client';
import {NextPage} from 'next';
import Link from 'next/link';
import {useEffect, useState} from 'react';
import {getUsers} from '@/services/userService';
import {UserResponseDTO} from '@/types/user';
import UserForm from '../../components/user/UserForm';
import withAuth from "@/components/withAuth";

const Users: NextPage = () => {
    const [users, setUsers] = useState<UserResponseDTO[]>([]);
    const [isFormActive, setIsFormActive] = useState<boolean>(false);

    const addUser = (user: UserResponseDTO) => {
        setUsers(prevState => {
            let curState = prevState;
            curState.push(user);
            return curState;
        });
        setIsFormActive(false);
    }

    useEffect(() => {
        async function fetchUsers() {
            const data = await getUsers();
            setUsers(data);
        }

        fetchUsers();
    }, []);

    return (
        <div className="comp-body">
            <h1>Users</h1>
            <button
                onClick={() => setIsFormActive(!isFormActive)}>{isFormActive ? "Close x" : "Create User + "}</button>
            {isFormActive && <UserForm addUser={addUser}/>}
            <table className="table-auto">
                <thead>
                <tr>
                    <th className="border px-4 py-2">Username</th>
                    <th className="border px-4 py-2">Email</th>
                    <th className="border px-4 py-2">Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => (
                    <tr key={user.userId}>
                        <td className="border px-4 py-2"><Link href={`/users/${user.username}`}>{user.username}</Link></td>
                        <td className="border px-4 py-2">{user.role.toString()}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default withAuth(Users);

