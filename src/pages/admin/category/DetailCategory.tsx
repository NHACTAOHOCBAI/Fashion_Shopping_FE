import { Image, Modal } from "antd"
import MyField from "../../../components/MyField"
import { formatDate } from "../../../utils/formatTime"
import { useMemo } from "react"

interface DetailCategoryProps {
    isDetailOpen: boolean,
    detailCategory: Category | undefined,
    closeDetailModal: () => void
}
const DetailCategory = ({ isDetailOpen, detailCategory, closeDetailModal }: DetailCategoryProps) => {
    const subCategories = useMemo(() => detailCategory?.subCategories?.reduce((total, value) => {
        return total + value.name + ', '
    }, "").slice(0, -2), [detailCategory])
    console.log(subCategories)
    return (
        <Modal
            title="Detail Category"
            width={450}
            open={isDetailOpen}
            footer={null}
            onCancel={closeDetailModal}
        >
            <div className="flex flex-col gap-2">
                <Image
                    src={detailCategory?.imageUrl}
                    style={{ aspectRatio: 5 / 3, objectFit: "contain" }} // borderRadius: 0 để tránh bo góc
                    className=" rounded"
                />
                <MyField
                    title="Category name"
                    value={detailCategory?.name}
                />
                <MyField
                    title="Parent category"
                    value={detailCategory?.parent?.name}
                />
                <MyField
                    title="Sub categories"
                    value={subCategories}
                />
                <div className="flex justify-between">
                    <MyField
                        title="Created at"
                        value={formatDate(detailCategory?.createdAt as Date)}
                    />
                    <MyField
                        title="Updated at"
                        value={formatDate(detailCategory?.updatedAt as Date)}
                    />
                </div>
                <MyField
                    layout="vertical"
                    title="Description"
                    value={detailCategory?.description}
                />
            </div>
        </Modal>
    )
}
export default DetailCategory