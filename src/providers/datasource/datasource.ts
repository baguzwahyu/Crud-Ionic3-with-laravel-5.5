import { Injectable } from '@angular/core';

@Injectable()
export class DatasourceProvider {

  public source: any[] = [];
  public tempdata: any = '';

  constructor() {
  }

}
