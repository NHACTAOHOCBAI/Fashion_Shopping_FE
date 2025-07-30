import { Link } from 'react-router'
const useBreadcrumbItems = (pathname: string) => {
    const endpoints = pathname.split('/')
    const items: {
        title: React.ReactNode;
    }[] = [
            {
                title: <Link to='/products'>Products</Link>,
            },
        ];

    endpoints.forEach((value, index) => {
        if (index <= 1)
            return;
        if (index == 2)
            items.push({
                title: <Link to={`/products/${value}`}>{value}</Link>,
            })
        if (index == 3)
            items.push({
                title: <Link to={`/products/${endpoints[index - 1]}/${value}`}>{value}</Link>,
            })
    })
    if (items.length === 1)
        items.push({
            title: <Link to='/products'>All</Link>,
        },)
    return items
}
export default useBreadcrumbItems