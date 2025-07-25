interface ProductFieldProps {
    title: string,
    value: string | undefined,
}
const ProductField = ({ title, value }: ProductFieldProps) => {
    return (
        <div className="flex " >
            <p className="flex-[1] font-medium uppercase whitespace-nowrap text-text-heading" > {title} : </p>
            <p className="flex-[4] break-all" > {value} </p>
        </div>
    )
}
export default ProductField