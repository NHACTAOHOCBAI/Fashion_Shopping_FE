import { Button, Checkbox, Form } from "antd"
import { SlidersHorizontal } from "lucide-react"
import MyPopover from "../../../../components/MyPopover"
import React from "react"
import type { ProductFilters } from "../Product"

interface ProductFilterProps {
    setFilters: (value: ProductFilters) => void
    categoryOpt: {
        value: number;
        label: string;
    }[] | undefined
    brandOpt: {
        value: number;
        label: string;
    }[] | undefined

}
const ProductFilter = ({ setFilters, categoryOpt, brandOpt }: ProductFilterProps) => {
    const Content = () => {
        const [form] = Form.useForm();

        const onFinish = () => {
            const allValues = form.getFieldsValue() as ProductFilters
            setFilters({
                brandId: allValues.brandId || [],
                categoryId: allValues.categoryId || [],
            })
        };
        const handleReset = () => {
            form.resetFields()
            setFilters({} as ProductFilters)
        }
        return (
            <Form form={form} onValuesChange={onFinish} layout='vertical'>
                <div className="min-w-[150px] max-w-[300px]">
                    <Form.Item
                        name="brandId"
                        label="Brand  "
                    >
                        <Checkbox.Group className="flex flex-wrap gap-3">
                            {
                                brandOpt?.map((value) =>
                                    <Checkbox value={value.value}>{value.label}</Checkbox>)
                            }
                        </Checkbox.Group>
                    </Form.Item>
                    <Form.Item name="categoryId"
                        label="Category"
                    >
                        <Checkbox.Group className="flex flex-wrap gap-3">
                            {
                                categoryOpt?.map((value) =>
                                    <Checkbox value={value.value}>{value.label}</Checkbox>)
                            }
                        </Checkbox.Group>
                    </Form.Item>

                    <Button onClick={handleReset}>Reset</Button>
                </div>
            </Form>
        );
    }
    return (
        <MyPopover
            placement="bottomLeft"
            trigger="click"
            content={<Content />}>
            <Button className="rounded-2xl">
                Filter <SlidersHorizontal size={16} />
            </Button>
        </MyPopover>
    )
}


export default React.memo(ProductFilter)