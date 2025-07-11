import React, { useState } from 'react';
interface ClickEffectProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
}

const MyClickable: React.FC<ClickEffectProps> = ({ children, onClick, disabled }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        if (disabled) return;
        setIsClicked(true);
        onClick?.();
        setTimeout(() => setIsClicked(false), 100); // animation reset
    };

    return (
        <div
            onClick={handleClick}
            className={`
                cursor-pointer flex items-center justify-center 
                 transition-transform duration-150 ease-in-out
                ${isClicked && !disabled ? 'scale-75 opacity-75' : 'hover:scale-90'}
                ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
            `}
        >
            {children}
        </div>
    );
};

export default MyClickable;
