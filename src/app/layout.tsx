'use client';

import React from "react";
// import { Inter } from "next/font/google";
import "./globals.css";
import styles from '../styles/layout.module.css';
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import { AuthProvider } from '@/contexts/AuthContext';

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="h-full">
        <body className="h-full">
        <AuthProvider>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </AuthProvider>
        </body>
        </html>
    );
}
