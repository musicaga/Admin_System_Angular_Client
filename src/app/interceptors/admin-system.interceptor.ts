import { Injectable } from "@angular/core";
import { AppSettingsSandbox } from "../store/app-settings/app-settings.sandbox";
import { AdminSystemBaseModel } from "../models/admin-system/base-model/base-model";

@Injectable({
  providedIn: "root"
})
export class AdminSystemInterceptor {
  private request: number = 0;
  private response: number = 0;
  constructor(private appSettingsSandbox: AppSettingsSandbox) {
    this.initInterceptor();
  }

  private initInterceptor() {
    // AdminSystemBaseModel.getInstance().interceptors.request.use(
    //   request => {
    //     console.log("admin");
    //     if (["put", "post"].includes(request.method)) {
    //       this.appSettingsSandbox.addLoandig({
    //         id: `admin-system-${this.request}`,
    //         request
    //       });
    //       this.request++;
    //     }
    //     return request;
    //   }
    // );
    // AdminSystemBaseModel.getInstance().interceptors.response.use(
    //   response => {
    //     if (["put", "post"].includes(response.config.method)) {
    //       this.appSettingsSandbox.removeLoandig(
    //         `admin-system-${this.response}`
    //       );
    //       this.response++;
    //     }
    //     return response;
    //   }
    // );
  }
}
