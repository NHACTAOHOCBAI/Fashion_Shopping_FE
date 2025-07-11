import { Select } from "antd"
import { type SelectProps } from "antd";
const MySelect = (selectStyle: SelectProps) => {
    return (
        <Select
            {...selectStyle}
            classNames={{
                popup: {
                    root: 'shadow ',
                },
            }}
        />
    )
}
export default MySelect