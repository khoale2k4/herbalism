import React from 'react';

interface MadeInCanadaIconProps {
    size?: number;
    className?: string;
    fillColor?: string;
    strokeColor?: string;
    ariaHidden?: boolean;
}

const CartIcon: React.FC<MadeInCanadaIconProps> = ({
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
            style={{ display: 'block', margin: 'auto' }} 
        >
            <path d="M20.8702 9.02976L18.4728 20.4002H5.42359L3.13034 9.02976M2.3999 9.02976H21.5999M6.60152 8.91662V6.838C6.60152 3.72385 9.04058 1.2002 12.0503 1.2002C15.0601 1.2002 17.4992 3.72385 17.4992 6.838V8.91662M8.58576 9.34658L10.1448 20.2881M15.5008 9.41875L13.9417 20.3592M4.42979 14.6019H19.2984" stroke={strokeColor} strokeLinecap="round" strokeLinejoin="round"></path>
        </svg>
    );
};

export default CartIcon;