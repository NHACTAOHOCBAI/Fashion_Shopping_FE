import { Popover } from "antd";
import type { JSX } from "react";
import './my_popover.css';

type MyPopoverProps = {
    content: React.ReactNode;
    title?: string;
    trigger?: 'click' | 'hover' | 'focus';
    children: JSX.Element;
};

const MyPopover = ({ content, title, trigger, children }: MyPopoverProps) => {
    return (
        <Popover
            content={content}
            title={title}
            trigger={trigger}
            classNames={{
                root: 'no-shadow-popover drop-shadow',
            }}
        >
            <span className="cursor-pointer">{children}</span>
        </Popover>
    );
};

export default MyPopover;
