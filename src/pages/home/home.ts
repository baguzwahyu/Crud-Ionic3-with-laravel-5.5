import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';
import { ServersProvider } from '../../providers/servers/servers'; // service for crud with server side
import { DatasourceProvider } from '../../providers/datasource/datasource'; // to store data for view
import { ShowmakananPage } from '../../pages/showmakanan/showmakanan';
import { MinumanPage } from '../../pages/minuman/minuman';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ServersProvider]
})
export class HomePage {

	public items: any;
  public toggle: boolean = false;
  public pastname: string;

  
  constructor(
   public navCtrl: NavController,
   public db: ServersProvider,
   public navparam: NavParams,
   public datasource: DatasourceProvider) {
      this.db.getData().subscribe(data =>{
          this.datasource.source = data.json();  
      });
  }

  createItem(newitem){
    var component = this.navCtrl.getActive().instance;
    
      let i = { 'name': newitem.value };
      this.db.create(i);
      this.navCtrl.setRoot('MinumanPage');
    // if (component.ionViewDidLoad) {
    //   component.ionViewDidLoad();
    // }
    
  }

  deleteItem(item){
    var component = this.navCtrl.getActive().instance;

    let result = this.db.delete(item);
    let index = this.datasource.source.indexOf(item);
    this.datasource.source.splice(index,1);
    console.log("id: " + item);	
    if (component.ionViewDidLoad){
      component.ionViewDidLoad();
    }

  }

  editItem(item){
    this.toggle = true;
    this.pastname = item.name;
    this.datasource.tempdata = item;
  }

  updateItem(name){
    let i = { "id": this.datasource.tempdata.id,"name": name.value };
    let result = this.db.update(i);
    let index = this.datasource.source.indexOf(this.datasource.tempdata);
    this.datasource.source[index] = i;
    console.log(result);
    this.toggle = false;
  }
}