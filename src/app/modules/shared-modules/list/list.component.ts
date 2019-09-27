import { Component, OnDestroy, Injector } from "@angular/core";
import { Router, ActivationEnd } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Subscription } from "rxjs";
import {
  DynamicTableHeader,
  DynamicTableButtonAction,
  DynamicTablePagination,
  DynamicTablePaginationDefault,
  DynamicTableChanges
} from "../table/table.interfaces";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.css"]
})
export class ListComponent implements OnDestroy {
  public subscriptions: Subscription[] = [];
  public data: any[] = [];
  public loading: boolean;
  public resource: string;
  public modelClass: any;
  public title: string;
  public service: any;
  public headers: DynamicTableHeader[] = [];
  public rowActions: DynamicTableButtonAction[] = [];
  public pagination: DynamicTablePagination = DynamicTablePaginationDefault;
  public sort: string;
  public sortDirection: string = "asc";
  constructor(private router: Router, private injector: Injector) {
    this.subscriptions.push(
      this.router.events
        .pipe(
          filter(
            (event: ActivationEnd) =>
              event instanceof ActivationEnd &&
              event.snapshot.params["resource"] &&
              event.snapshot.params["resource"] !== this.resource
          ),
          map(event => event.snapshot.params["resource"])
        )
        .subscribe(resource => {
          this.resource = resource;
          this.sort = null;
          this.pagination = DynamicTablePaginationDefault;
          this.title = `${this.resource.replace("-", "_")}.list.title`;
          this.initList();
        })
    );
  }

  public async initList() {
    const modelClassModule = await import(
      `src/app/models/admin-system/${this.resource}`
    );
    this.modelClass = modelClassModule.default;
    const headersModule = await import(
      `src/app/metadata/admin-system/table/${this.resource}`
    );
    this.headers = headersModule.default;
    const serviceModule = await import(
      `src/app/services/admin-system/${this.resource}.service`
    );
    this.service = this.injector.get(serviceModule.default);
    this.rowActions = this.service.getRowActions();
    this.loadData();
  }

  public loadData(): void {
    let modelClass = this.modelClass;
    if (this.with()) modelClass = modelClass.option("populate", this.with());
    if (this.sort)
      modelClass = modelClass.orderBy(this.sort, this.sortDirection);
    this.loading = true;
    modelClass
      .findRx(this.pagination.currentPage, this.pagination.itemsPerPage)
      .subscribe(resp => {
        this.pagination = {
          currentPage: resp.currentPage,
          itemsPerPage: resp.itemsPerPage,
          totalItems: resp.totalItems
        };
        this.data = resp.data;
        this.loading = false;
      });
  }

  public with(): string {
    let resource: string = this.resource;
    if (resource.includes("-")) {
      resource = resource.split("-").join("");
    }
    const populateData = {
      users:
        "company,application,userConfigurations.currentStore,userInformation,role",
      companies: "application,country,admin",
      applications: "",
      stores: "country,application,company,storeConfigurations",
      states: "country",
      products: "company",
      vendors: "company",
      brands: "company",
      productcategories: "company",
      producttypes: "company",
      rooms: "company"
    };
    return populateData[resource];
  }

  public goToForm(): void {
    this.router.navigate([`/admin-system/${this.resource}/new`]);
  }

  public DynamicTableChanges(changes: DynamicTableChanges) {
    if (changes.pagination) this.pagination = changes.pagination;
    if (changes.sort) this.sort = changes.sort;
    if (changes.sortDirection) this.sortDirection = changes.sortDirection;
    this.loadData();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}