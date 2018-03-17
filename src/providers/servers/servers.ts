import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { DatasourceProvider } from '../datasource/datasource';
import 'rxjs/add/operator/map';

import { NavController } from 'ionic-angular';


@Injectable()
export class ServersProvider {

  constructor(public http: Http, public navCtrl: NavController,  public datasource: DatasourceProvider) {}

  getData() {

    return this.http.get('http://localhost/server-side/public/api/data')
      .map(res => res);

  }

  create(item): any {
    // let result: any;
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    let option = new RequestOptions({ headers: headers });

    this.http.post('http://localhost/server-side/public/api/data/create', JSON.stringify(item), option)
      .map(res => res) 
      .subscribe(data => {
        this.datasource.source.push(data.json());
        console.log('tombol diklik');
      });
    // return result;
  }

  update(item): any {
    let result: any;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.put('http://localhost/server-side/public/api/data/update', JSON.stringify(item), { headers: headers })
      .map(res => res)
      .subscribe(data => {
        result = data;
      });

    return result;
  }


  delete(item): any {
    let result: any;
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.delete('http://localhost/server-side/public/api/tbitems/' + item, { headers: headers })
      .map(res => res)
      .subscribe(data => {
        result = data;
      });

    return result;
    
  }

}
