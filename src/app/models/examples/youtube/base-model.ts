import { Model } from "src/app/axioquent/index";
import { AxiosRequestConfig } from "axios";

export class YoutubeBaseModel extends Model {
  public baseUrl(): string {
    return "https://www.googleapis.com/youtube/v3/search";
  }
}

YoutubeBaseModel.getAxiosInstance().interceptors.request.use(request => {
  request.url += "&id=7lCDEYXw3mM&key=AIzaSyBQDrfTg_vB26R4IwvCEuB1AwTWoW9scrE";
  return request;
});
