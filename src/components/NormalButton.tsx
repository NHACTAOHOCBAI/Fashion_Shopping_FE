type NormalButtonProps = {
    children: React.ReactNode;
    className?: string;
} & React.ComponentPropsWithoutRef<'div'>;

const NormalButton = ({ children, className, ...rest }: NormalButtonProps) => {
    return (
        <div
            className={`cursor-pointer border-gray-100 font-bold rounded-xl px-[10px] py-[6px]  border-[2px] w-fit transition-all duration-500  hover:bg-black hover:text-white ${className ?? ''}`}
            {...rest}
        >
            {children}
        </div>
    );
};
export default NormalButton