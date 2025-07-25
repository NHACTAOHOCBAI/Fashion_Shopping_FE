interface MyFieldProps {
    title: string,
    value: string | undefined,
    layout?: "horizontal" | "vertical",
}
const MyField = ({ title, value, layout = "horizontal" }: MyFieldProps) => {
    return (
        <div className={`flex flex-wrap gap-x-2 ${layout === "vertical" ? "flex-row " : ""}`}>
            <p className="font-medium uppercase whitespace-nowrap text-text-heading">{title} : </p>
            <p className="break-all">{value || "No"}</p>
        </div>
    );
};

export default MyField