import { AxiosHttpClient } from "./axios-http-client";
import { Builder } from "./builder";
import { ILgxModel } from "./interfaces/lgx-model";
import { Observable } from "rxjs";
import { AxiosInstance } from "axios";
import { LgxHttpClientModel } from "./interfaces/lgx-http-client-model";
import { ILgxQueryConfig } from "./interfaces/lgx-query-config";

export abstract class Model {
  public abstract baseUrl(): string;
  public getResource = (): string => this.resource;
  public resource: string;
  public baseUrlClass: string;
  private static instances: LgxHttpClientModel[] = [];
  private static httpClient: AxiosHttpClient;
  public queryConfig: ILgxQueryConfig;

  constructor() {
    this.baseUrlClass = this.baseUrl();
    const instance: LgxHttpClientModel = Model.instances.find(
      item => item.url === this.baseUrlClass
    );
    if (!instance) {
      const newInstance: AxiosHttpClient = new AxiosHttpClient();
      Model.instances.push({
        url: this.baseUrlClass,
        instance: newInstance
      });
      Model.httpClient = newInstance;
    } else {
      Model.httpClient = instance.instance;
    }
    this.initHttpClient();
  }

  private initHttpClient(): void {
    Model.httpClient.setBaseUrl(this.baseUrlClass);
  }

  public static getHttpClient(): AxiosHttpClient {
    return this.httpClient;
  }

  public getQueryConfig(): ILgxQueryConfig {
    return this.queryConfig;
  }

  public static find(page?: number, perPage?: number): Promise<any> {
    return new Builder(this).find(page, perPage);
  }

  public static findRx(page?: number, perPage?: number): Observable<any> {
    return new Builder(this).findRx(page, perPage);
  }

  public static findById(id: number): Promise<any> {
    return new Builder(this).findById(id);
  }

  public static findByIdRx(id: number): Observable<any> {
    return new Builder(this).findByIdRx(id);
  }

  public static async save(model: ILgxModel): Promise<any> {
    return new Builder(this).save(model);
  }

  public static saveRx(model: ILgxModel): Observable<any> {
    return new Builder(this).saveRx(model);
  }

  public static async update(
    id: string | number,
    model: ILgxModel
  ): Promise<any> {
    return new Builder(this).update(id, model);
  }

  public static updateRx(
    id: string | number,
    model: ILgxModel
  ): Observable<any> {
    return new Builder(this).updateRx(id, model);
  }

  public static async destroy(id: number | string): Promise<any> {
    return new Builder(this).destroy(id);
  }

  public static destroyRx(id: number | string): Observable<any> {
    return new Builder(this).destroyRx(id);
  }

  public static page(page: number): Builder {
    return new Builder(this).page(page);
  }

  public static perPage(perPge: number): Builder {
    return new Builder(this).perPage(perPge);
  }

  public static filter(attribute: string, value: any): Builder {
    return new Builder(this).filter(attribute, value);
  }

  public static where(attribute: string, value: string): Builder {
    return new Builder(this).where(attribute, value);
  }

  public static orWhere(
    attribute: string,
    value: string,
    type?: string
  ): Builder {
    return new Builder(this).orWhere(attribute, value, type);
  }

  public static orderBy(attribute: string, direction?: string): Builder {
    return new Builder(this).orderBy(attribute, direction);
  }

  public static with(attribute: any): Builder {
    return new Builder(this).with(attribute);
  }

  public static option(queryParameter: string, value: string): Builder {
    return new Builder(this).option(queryParameter, value);
  }

  public static formData(): Builder {
    return new Builder(this).formData();
  }

  public static setUrl(url: string, action?: string): Builder {
    return new Builder(this).setUrl(url, action);
  }

  public static header(name: string, value: string): Builder {
    return new Builder(this).header(name, value);
  }

  public static noPagination(): Builder {
    return new Builder(this).noPagination();
  }

  public static getInstance(): AxiosInstance {
    return new Builder(this).getHttpClient().getInstance();
  }
}
