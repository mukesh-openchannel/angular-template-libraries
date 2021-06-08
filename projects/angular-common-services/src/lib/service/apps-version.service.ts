import {Injectable} from '@angular/core';
import {HttpRequestService} from './http-request-services';
import {Observable} from 'rxjs';
import {Page} from '../model/api/page.model';
import {AppVersionResponse, UpdateAppVersionModel} from '../model/api/app-data-model';
import {OcHttpParams} from '../model/api/http-params-encoder-model';
import { OcApiPaths } from '../config/api-version.model';


@Injectable({
  providedIn: 'root'
})
export class AppVersionService {

  private APPS_URL;

  constructor(private httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {
    this.APPS_URL = apiPaths.appsVersions
  }

  getAppsVersionsBySearchText(pageNumber: number, limit: number,
                              sort: string, query: string,
                              searchText: string, searchTextByFields: string[]): Observable<Page<AppVersionResponse>> {

    const mainUrl = `${this.APPS_URL}/versions/textSearch`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('sort', sort)
      .append('query', query)
      .append('fields', JSON.stringify(searchTextByFields))
      .appendRequiredParam('searchText', searchText, '');

    return this.httpRequest.get(mainUrl, { params });
  }

  getAppsVersions(pageNumber: number, limit: number, sort: any, query: string): Observable<Page<AppVersionResponse>> {

    const mainUrl = `${this.APPS_URL}/versions`;

    const params = new OcHttpParams()
      .append('pageNumber', String(pageNumber))
      .append('limit', String(limit))
      .append('sort', sort)
      .append('query', query);

    return this.httpRequest.get(mainUrl, { params });
  }

  /**
   * returns an empty response on success and response with
   *  'code' and 'message' on error
   */
  deleteAppVersion(appId: string, version: number): Observable<any> {
    const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}`;
    return this.httpRequest.delete(mainUrl);
  }

  getAppByVersion(appId: string, version: number): Observable<AppVersionResponse> {
    const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}`;
    return this.httpRequest.get(mainUrl);
  }

  updateAppByVersion(appId: string, version: number, updateAppVersionModel: UpdateAppVersionModel): Observable<AppVersionResponse> {
    const mainUrl = `${this.APPS_URL}/${appId}/versions/${version}`;
    return this.httpRequest.post(mainUrl, updateAppVersionModel);
  }
}
