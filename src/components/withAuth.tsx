"use client";

import {useRouter} from 'next/navigation';
import React, {useEffect, useState} from 'react';
import Loading from "@/components/common/Loading";
import useAuth from "@/hooks/useAuth";

const withAuth = (WrappedComponent: React.ComponentType) => {
    const Wrapper = (props: any) => {
        const {isLoggedIn} = useAuth();

        if (!isLoggedIn) return <Loading/>

        return <WrappedComponent {...props} />;
    };

    return Wrapper;
};

export default withAuth;
