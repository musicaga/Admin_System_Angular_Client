import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ILoadRequest, loadRequestDataDefault } from '../../inferfaces/loadRequest';
import { Global } from './url';
import { TablePagination } from '../../components/sharedComponents/table/table.interfaces';
import { IProductType } from '../../inferfaces/productType';

@Injectable()
export class ProductTypeService {
    public url;
    public loadRequestData: ILoadRequest = JSON.parse(JSON.stringify(loadRequestDataDefault));
    constructor(private http: HttpClient) {
        this.url = Global.url_api;
    }

    getProductTypes(): Observable<any> {
        let params = new HttpParams();
        for (const param in this.loadRequestData) {
            if (this.loadRequestData.hasOwnProperty(param) && this.loadRequestData[param]) {
                params = params.set(param, this.loadRequestData[param]);
            }
        }
        return this.http.get<any>(`${this.url}/product-types`, { params });
    }

    getProductTypesList(loadRequestData: ILoadRequest): Observable<any> {
        let params = new HttpParams();
        for (const param in loadRequestData) {
            if (loadRequestData.hasOwnProperty(param) && loadRequestData[param]) {
                if (typeof loadRequestData[param] === 'object') {
                    for (const element in loadRequestData[param]) {
                        if (loadRequestData[param].hasOwnProperty(element)) {
                            params = params.set(`filters[${element}]`, loadRequestData[param][element]);
                        }
                    }
                } else {
                    params = params.set(param, loadRequestData[param]);
                }
            }
        }
        return this.http.get<any>(`${this.url}/product-types/search/all-list`, {params});
    }

    saveProductType(productType: IProductType): Observable<any> {
        return this.http.post<any>(`${this.url}/product-types`, productType);
    }

    updateProductType(productType: IProductType): Observable<any> {
        return this.http.put<any>(`${this.url}/product-types/${productType._id}`, productType);
    }

    deleteProductType(productType: IProductType): Observable<any> {
        return this.http.delete<any>(`${this.url}/product-types/${productType._id}`);
    }

    changePagination(pagination: TablePagination): Observable<any> {
        this.loadRequestData.page = pagination.currentPage;
        this.loadRequestData.itemsPerPage = pagination.itemsPerPage;
        return of('change pagination');
    }

    changeSearchValue(value: string): Observable<any> {
        this.loadRequestData.search = value;
        this.loadRequestData.page = 1;
        return of('change searchValue');
    }

    resetLoadRequest(): Observable<any> {
        this.loadRequestData = JSON.parse(JSON.stringify(loadRequestDataDefault));
        return of('change loadResquest');
    }
}