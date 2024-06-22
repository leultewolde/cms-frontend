'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {RegisterRequestDTO} from '@/types/auth';
import Link from "next/link";
import SelectMenu from "@/components/SelectMenu";
import {Role} from "@/types/enums";
import {useAuth} from "@/contexts/AuthContext";

const RegisterPage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    // const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<Role>(Role.ADMINISTRATOR);
    const router = useRouter();
    const {register} = useAuth();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const registerData: RegisterRequestDTO = {firstname, lastname, username, password, role};
        try {
            await register(registerData);
        } catch (error) {
            console.error('Error registering:', error);
        }
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                    alt="CMS"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Create an account
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="firstname" className="block text-sm font-medium leading-6 text-white">
                            Firstname
                        </label>
                        <div className="mt-2">
                            <input
                                id="firstname"
                                name="firstname"
                                type="text"
                                autoComplete="off"
                                aria-autocomplete="none"
                                required
                                onChange={(e) => setFirstname(e.target.value)}
                                placeholder="Enter Firstname"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="lastname" className="block text-sm font-medium leading-6 text-white">
                            Lastname
                        </label>
                        <div className="mt-2">
                            <input
                                id="lastname"
                                name="lastname"
                                type="text"
                                autoComplete="off"
                                aria-autocomplete="none"
                                required
                                onChange={(e) => setLastname(e.target.value)}
                                placeholder="Enter Lastname"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-white">
                            Username
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                autoComplete="off"
                                aria-autocomplete="none"
                                required
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                            Password
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter Password"
                                autoComplete="off"
                                aria-autocomplete="none"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <SelectMenu disabled label="Role" values={[
                        {id: 1, name: "Administrator", value: Role.ADMINISTRATOR.toString()},
                        {id: 2, name: "Contributor", value: Role.CONTRIBUTOR.toString()},
                        {id: 3, name: "Reviewer", value: Role.REVIEWER.toString()}
                    ]} onChange={option => setRole(option.value as Role)}/>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    Already have an account?{' '}
                    <Link href="/auth/login"
                          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Log in to your account
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
