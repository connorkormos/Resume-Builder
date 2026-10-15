import React from 'react';

export default function ProfileSection({section}) {

    if (!section) {
        return null;
    }

    return (
        <div>
            <h2>{section.title}</h2>
        </div>
    );
}