import React from 'react';

interface MadeInCanadaIconProps {
    size?: number;
    className?: string;
    fillColor?: string;
    strokeColor?: string;
    ariaHidden?: boolean;
}

const PersonIcon: React.FC<MadeInCanadaIconProps> = ({
    size = 48,
    className = '',
    fillColor = '#5D652C',
    strokeColor = '#4A3829',
    ariaHidden = true,
}) => {
    return (
        <svg
            className={`icon icon--made-in-canada ${className}`}
            width={size}
            height={size}
            aria-hidden={ariaHidden}
            focusable="false"
            role="presentation"
            viewBox="0 0 61 61"
            fill="none"
        >
            <path d="M6 20C6 16.6858 8.68578 14 12 14C15.3142 14 18 16.6858 18 20" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 14C14.2091 14 16 12.2091 16 10C16 7.79086 14.2091 6 12 6C9.79086 6 8 7.79086 8 10C8 12.2091 9.79086 14 12 14Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
};

export default PersonIcon;