import React from "react";

export default function Loading() {

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%',
        }}>
            <span>Loading...</span>
        </div>
    )
}