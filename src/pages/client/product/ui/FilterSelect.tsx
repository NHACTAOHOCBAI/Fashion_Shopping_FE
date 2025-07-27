import { TreeSelect } from "antd"
import '../../../../styles/my_filter_select.css'
import { GoTriangleDown } from "react-icons/go"
const FilterSelect = ({ data, placeholder }: { data: any, placeholder: string }) => {
    return (
        <TreeSelect
            styles={{
                popup: { root: { maxHeight: 400, overflow: 'auto', minWidth: 300 } },
            }}
            virtual={false}
            showSearch
            placeholder={placeholder}
            allowClear
            treeDefaultExpandAll
            treeData={data}
            suffixIcon={<GoTriangleDown />}
        />
    )
}
export default FilterSelect