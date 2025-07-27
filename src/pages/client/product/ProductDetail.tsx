import { useParams } from "react-router";
import { useGetProdutcById } from "../../../hooks/useProduct";
import MyImageDisplay from "../../../components/MyImageDisplay";

const ProductDetail = () => {
    const { id } = useParams();
    const { data: detailProduct, isPending } = useGetProdutcById(Number(id))
    return (
        <div>
            <div className="flex">
                <div className="flex-[1] border rounded ">
                    <MyImageDisplay images={thumbnails} />
                </div>
            </div>
        </div>
    )
}

export default ProductDetail