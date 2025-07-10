// MyInput.tsx
import React from 'react';
import { Input } from 'antd';
import type { InputProps } from 'antd';
import './my_input.css';

const MyInput: React.FC<InputProps> = (props) => {
    return (
        <div className="custom-input">
            <Input {...props} />
        </div>
    );
};

export default MyInput;
