'use client';

import React, {useMemo} from 'react';
import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Transition,
} from '@headlessui/react';
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline';
import {useAuth} from '@/contexts/AuthContext';
import Link from 'next/link';
import Image from "next/image";

enum PageStatus {
    PROTECTED,
    NOT_PROTECTED,
    NEUTRAL,
}

const navigation = [
    {name: 'Home', href: '/', current: true, protected: PageStatus.NEUTRAL},
    // { name: 'Users', href: '/users', current: false, protected: PageStatus.PROTECTED },
    // {name: 'Contents', href: '/contents', current: false, protected: PageStatus.PROTECTED},
    {name: 'Tasks', href: '/tasks', current: false, protected: PageStatus.PROTECTED},
    // {name: 'Reviews', href: '/reviews', current: false, protected: PageStatus.PROTECTED},
    {name: 'Publishing Platforms', href: '/publishing-platforms', current: false, protected: PageStatus.PROTECTED},
    // { name: 'Content Histories', href: '/content-histories', current: false, protected: PageStatus.PROTECTED },
    // { name: 'Task Queues', href: '/task-queues', current: false, protected: PageStatus.PROTECTED },
    {name: 'Login', href: '/auth/login', current: false, protected: PageStatus.NOT_PROTECTED},
    {name: 'Register', href: '/auth/register', current: false, protected: PageStatus.NOT_PROTECTED},
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ');
}

export default function Header() {
    const {isLoggedIn, logout, user} = useAuth();

    const filteredNavigation = useMemo(() => {
        return navigation.filter((nav) => {
            if (isLoggedIn) {
                return nav.protected === PageStatus.PROTECTED || nav.protected === PageStatus.NEUTRAL;
            } else {
                return nav.protected === PageStatus.NOT_PROTECTED || nav.protected === PageStatus.NEUTRAL;
            }
        });
    }, [isLoggedIn]);

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({open}) => (
                <>
                    <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                        <div className="relative flex h-16 items-center justify-between">
                            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                >
                                    <span className="absolute -inset-0.5"/>
                                    <span className="sr-only">Open main menu</span>
                                    {open ? (
                                        <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                    ) : (
                                        <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                    )}
                                </DisclosureButton>
                            </div>
                            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex flex-shrink-0 items-center">
                                    <Image
                                        className="h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                        alt="CMS"
                                        width={32}
                                        height={32}
                                    />
                                </div>
                                <div className="hidden sm:ml-6 sm:block">
                                    <div className="flex space-x-4">
                                        {filteredNavigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.current
                                                        ? 'bg-gray-900 text-white'
                                                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            {isLoggedIn &&
                                <div
                                    className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                    {(user && user.role) && <button
                                        type="button"
                                        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                    >
                                        <span className="absolute -inset-1.5"/>
                                        <span className="sr-only">{user.role.slice(0, 5)}</span>
                                        <span className="h-6 w-6" aria-hidden="true">{user.role}</span>
                                    </button>}

                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <div>
                                            <MenuButton
                                                className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">Open user menu</span>
                                                <Image
                                                    className="h-8 w-8 rounded-full"
                                                    src="https://media.istockphoto.com/id/1337144146/vector/default-avatar-profile-icon-vector.jpg?s=612x612&w=0&k=20&c=BIbFwuv7FxTWvh5S3vB6bkT0Qv8Vn8N5Ffseq84ClGI="
                                                    alt=""
                                                    width={32}
                                                    height={32}
                                                />
                                            </MenuButton>
                                        </div>
                                        <Transition
                                            enter="transition ease-out duration-100"
                                            enterFrom="transform opacity-0 scale-95"
                                            enterTo="transform opacity-100 scale-100"
                                            leave="transition ease-in duration-75"
                                            leaveFrom="transform opacity-100 scale-100"
                                            leaveTo="transform opacity-0 scale-95"
                                        >
                                            <MenuItems
                                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                <MenuItem>
                                                    {({focus}) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Your Profile
                                                        </a>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({focus}) => (
                                                        <a
                                                            href="#"
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Settings
                                                        </a>
                                                    )}
                                                </MenuItem>
                                                <MenuItem>
                                                    {({focus}) => (
                                                        <a
                                                            href="#"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                logout();
                                                            }}
                                                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                                                        >
                                                            Sign out
                                                        </a>
                                                    )}
                                                </MenuItem>
                                            </MenuItems>
                                        </Transition>
                                    </Menu>
                                </div>}
                        </div>
                    </div>

                    <DisclosurePanel className="sm:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {filteredNavigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    className={classNames(
                                        item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium'
                                    )}
                                    aria-current={item.current ? 'page' : undefined}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                    </DisclosurePanel>
                </>
            )}
        </Disclosure>
    );
}
