import {Metadata} from 'next';
import {getUserByUsername} from '@/services/userService';

interface UserDetailProps {
    params: {
        username: string;
    };
}

export async function generateMetadata({ params }: UserDetailProps): Promise<Metadata> {
    const user = await getUserByUsername(params.username);
    return { title: user.username };
}

export default async function UserDetail({ params }: UserDetailProps) {
    const user = await getUserByUsername(params.username);

    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Role: {user.role}</p>
        </div>
    );
}
