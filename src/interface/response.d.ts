type GetAllResponse<T, K extends string = 'data'> = {
    pagination: {
        total: number;
        page?: number;
        limit?: number;
    };
} & {
    [key in K]: T[];
};
