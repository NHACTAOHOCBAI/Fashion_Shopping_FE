import { Popover } from "antd";
import type { JSX } from "react";
import '../styles/my_popover.css'; // Adjust the path as necessary
import type { TooltipPlacement } from "antd/es/tooltip";

type MyPopoverProps = {
    content: React.ReactNode;
    title?: string;
    trigger?: 'click' | 'hover' | 'focus';
    children: JSX.Element;
    placement?: TooltipPlacement
};

const MyPopover = ({ content, title, trigger, children, placement = "bottomRight" }: MyPopoverProps) => {
    return (
        <Popover
            placement={placement}
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
