import axios from "axios";

export abstract class ApiBase {
  private base_url = "https://olegegoism.pythonanywhere.com";
  private base_url_self_api = "http://localhost:5173";
  public handle = "";
  public axios;

  constructor(handle_ = "", selfApi = false) {
    this.handle = (selfApi ? this.base_url_self_api : this.base_url) + handle_;

    this.axios = axios.create({
      withCredentials: true,
      baseURL: this.handle,
      responseType: "json",
      headers: { "Content-Type": "application/json" },
      // params: {}
    });
  }
}
