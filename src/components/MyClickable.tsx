import React, { useState } from 'react';
interface ClickEffectProps {
    children: React.ReactNode;
    onClick?: () => void;
}

const MyClickable: React.FC<ClickEffectProps> = ({ children, onClick }) => {
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = () => {
        setIsClicked(true);
        onClick?.();
        setTimeout(() => setIsClicked(false), 100); // animation reset
    };

    return (
        <div
            onClick={handleClick}
            className={`inline-block transition-transform duration-150 ease-in-out ${isClicked && 'scale-75 opacity-75'}`}
        >
            {children}
        </div>
    );
};

export default MyClickable;
