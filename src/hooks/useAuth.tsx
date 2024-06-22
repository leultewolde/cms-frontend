import React, {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {logout} from "@/services/authService";

export default function useAuth() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            router.push('/auth/login');
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    }, [router]);

    return {isLoggedIn, logout};
}