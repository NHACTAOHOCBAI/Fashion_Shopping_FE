import { Card, Image } from "antd"
import MyField from "../../../../components/MyField"

const VariantsCard = () => {
    return (
        <Card
            className="w-[250px]"
            size="small"
            title={`Variant 1`}
            key={1}
        >
            <div className="border rounded p-[5px]">
                <Image
                    src="https://static0.srcdn.com/wordpress/wp-content/uploads/2023/11/jujutsu-kaisen_yuta-takes-control.jpg"
                    className="w-full aspect-[5/3] object-contain" />
            </div>
            <div className="flex flex-col gap-[5px] mt-[10px]">
                <MyField title="Size" value="L" />
                <MyField title="Color" value="Green" />
                <MyField title="Price" value="100$" />
                <MyField title="Sold" value="190" />
                <MyField title="Stock" value="20" />
            </div>
        </Card>
    )
}
export default VariantsCard