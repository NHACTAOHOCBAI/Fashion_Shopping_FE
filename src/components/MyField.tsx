interface MyFieldProps {
    title: string,
    value: string | undefined,
    layout?: "horizontal" | "vertical"
}
const MyField = ({ title, value, layout = "horizontal" }: MyFieldProps) => {
    return (
        <div className={`flex flex-wrap ${layout === "vertical" ? "flex-row " : "gap-x-2"}`}>
            <p className="font-medium uppercase whitespace-nowrap">{title} : </p>
            <p className="break-all">{value || "No"}</p>
        </div>
    );
};

export default MyField