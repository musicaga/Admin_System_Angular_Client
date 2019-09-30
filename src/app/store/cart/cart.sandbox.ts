import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import * as CartActions from "./cart.actions";
import * as fromRoot from "../index.store";
import { ECartTabActive } from "src/app/inferfaces/admin-system/order";

@Injectable({
  providedIn: "root"
})
export class CartSandbox {
  constructor(protected store: Store<fromRoot.State>) {}
  fetchTabActive(): Observable<ECartTabActive> {
    return this.store.select(fromRoot.getTabActive);
  }
  setTabActive(tab: ECartTabActive): void {
    this.store.dispatch(new CartActions.SetTabActiveAction(tab));
  }
  setItem(): void {
    this.store.dispatch(new CartActions.SetAddItemAction(true));
  }
}
