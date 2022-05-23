import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConfig } from '../models/app.config';

@Injectable()
export class AppConfigService {
  private config: AppConfig;
  loaded = false;

  constructor(private http: HttpClient) { }

  loadConfig(): Promise<void> {
    return this.http
      .get<AppConfig>('/assets/config/config.json')
      .toPromise()
      .then(data => {
        this.config = data;
        this.loaded = true;
      });
  }

  getConfig(): AppConfig {
    return this.config;
  }

  getClientConfig() {
    return this.http.get<AppConfig>("/assets/config/config.json");
  }
}
