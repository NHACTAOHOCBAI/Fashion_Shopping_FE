interface QueryParams {
    page?: number;
    limit?: number;
    keyword?: string;
    order?: "asc" | "dsec";
    sort?: string;
    [key: string]: any; // cho phép thêm bất kỳ key nào khác
}