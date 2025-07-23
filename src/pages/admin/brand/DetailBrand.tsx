import { Image, Modal } from "antd"
import MyField from "../../../components/MyField"
import { formatDate } from "../../../utils/formatTime"

interface DetailBrandProps {
    isDetailOpen: boolean,
    detailBrand: Brand | undefined,
    closeDetailModal: () => void
}
const DetailBrand = ({ isDetailOpen, detailBrand, closeDetailModal }: DetailBrandProps) => {
    return (
        <Modal
            title="Detail Brand"
            width={450}
            open={isDetailOpen}
            footer={null}
            onCancel={closeDetailModal}
        >
            <div className="flex flex-col gap-2">
                <Image
                    src={detailBrand?.logoUrl}
                    style={{ aspectRatio: 5 / 3, objectFit: "contain" }}  // borderRadius: 0 để tránh bo góc
                    className=" rounded"
                />
                <MyField
                    title="Brand name"
                    value={detailBrand?.name}
                />
                <div className="flex justify-between">
                    <MyField
                        title="Created at"
                        value={formatDate(detailBrand?.createdAt as Date)}
                    />
                    <MyField
                        title="Updated at"
                        value={formatDate(detailBrand?.updatedAt as Date)}
                    />
                </div>
                <MyField
                    title="Description"
                    value={detailBrand?.description}
                />
                <MyField
                    layout="vertical"
                    title="Description"
                    value={detailBrand?.description}
                />
            </div>
        </Modal>
    )
}
export default DetailBrand