import { Card, Image } from "antd"
import MyField from "../../../../components/MyField"
interface VariantCardProps {
    item: Variant
    index: number
}
const VariantsCard = ({ item, index }: VariantCardProps) => {
    return (
        <Card
            className="w-[250px]"
            size="small"
            title={`Variant ${index + 1}`}
            key={index}
        >
            <div className="border rounded p-[5px]">
                <Image
                    src={item.imageUrl}
                    className="w-full aspect-[5/3] object-contain" />
            </div>
            <div className="flex flex-col gap-[5px] mt-[15px]">
                <MyField title="Size" value={item.size} />
                <MyField title="Color" value={item.color} />
                <MyField title="Price" value={item.price} />
                <MyField title="Sold" value={item.quantity - item.remaining} />
                <MyField title="Stock" value={item.remaining} />
            </div>
        </Card>
    )
}
export default VariantsCard