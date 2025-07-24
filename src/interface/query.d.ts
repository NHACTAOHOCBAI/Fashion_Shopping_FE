interface QueryParams {
    page?: number;
    limit?: number;
    keyword?: string;
    order?: "asc" | "desc";
    sort?: string;
    [key: string]: any; // cho phép thêm bất kỳ key nào khác
}