import { TablePagination, TablePaginationDefault } from '../components/sharedComponents/table/table.interfaces';

export interface ILoadRequest {
    page?: number;
    itemsPerPage?: number;
    sort?: string;
    search?: string;
    filters?: object;
}
export const loadRequestDataDefault: ILoadRequest = {
    page: 1,
    itemsPerPage: 10,
    sort: null,
    search: null,
    filters: null
};
