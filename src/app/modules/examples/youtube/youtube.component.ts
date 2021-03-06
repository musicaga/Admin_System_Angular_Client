import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import {
  IDynamicTableHeader,
  IDynamicTableButton,
  IDynamicTableItem,
  DynamicTableChanges
} from "src/app/modules/shared-modules/table/table.interfaces";
import { youtubeHeaders } from "src/app/metadata/examples/youtube";
import { YoutubeBaseModel } from "src/app/models/examples/youtube/base-model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-youtube",
  templateUrl: "./youtube.component.html",
  styleUrls: ["./youtube.component.css"]
})
export class YoutubeComponent implements OnInit {
  public title: string = "Youtube";
  public data: IDynamicTableItem[] = [];
  public headers: IDynamicTableHeader[] = youtubeHeaders;
  public loading: boolean = false;
  public rowActions: IDynamicTableButton[] = [];
  public videoSelected: string = null;
  @ViewChild("iframe") iframe: ElementRef;
  constructor() {}

  ngOnInit() {
    this.loadVideos("coldplay");
  }

  public loadVideos(value?: string) {
    this.loading = true;
    YoutubeBaseModel.option("part", "snippet")
      .option("maxResults", "50")
      .option("q", value)
      .findRx()
      .pipe(map(resp => resp.items))
      .subscribe(resp => {
        this.data = resp.filter(video => video.id.kind === "youtube#video");
        this.loading = false;
      });
  }

  public dynamicTableChanges(changes: DynamicTableChanges) {
    if (changes.selectedItem) this.videoSelectedAction(changes.selectedItem);
  }

  public videoSelectedAction(item: any) {
    const url = `https://www.youtube.com/embed/${item.id.videoId}`;
    this.iframe.nativeElement.src = url;
  }
}
