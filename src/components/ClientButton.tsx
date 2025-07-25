import React from 'react';

type ClientButtonProps = {
    children: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const ClientButton = ({ children, className, ...rest }: ClientButtonProps) => {
    return (
        <div
            className={`cursor-pointer font-bold rounded-full px-[20px] py-[15px]  border-[2px] w-fit transition-all duration-500  hover:bg-black hover:text-white hover:-translate-y-1 ${className ?? ''}`}
            {...rest}
        >
            {children}
        </div>
    );
};

export default ClientButton;
