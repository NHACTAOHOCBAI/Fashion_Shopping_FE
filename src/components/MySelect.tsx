import { Select } from "antd"
import { type SelectProps } from "antd";
const MySelect = (selectStyle: SelectProps) => {
    return (
        <Select
            {...selectStyle}
            filterOption={(input, option) =>
                (option?.label as string).toLowerCase().includes(input.toLowerCase())
            }
            classNames={{
                popup: {
                    root: 'shadow ',
                },
            }}
        />
    )
}
export default MySelect