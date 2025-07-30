import { useLocation } from "react-router";

const useBreadcrumbItems = () => {
    const { pathname } = useLocation();
    const endpoints = pathname.split('/')
    const items: {
        title: string
        href?: string
    }[] = [
            {
                title: "Products",
                href: '/products',
            },
        ]
    endpoints.forEach((value, index) => {
        if (index <= 1)
            return;
        items.push({
            title: endpoints[index],
            href: value
        })
    })
    if (items.length === 1)
        items.push({
            title: "All",
            href: '',
        },)
    return items
}
export default useBreadcrumbItems