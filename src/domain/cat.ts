export class Cat{
  category_id : number;
  category_type : number;
  has_icon : number;
  title : string;
  seo_title : string;
  vehicle_types : number[];
  constructor(category_id : number,category_type : number,has_icon : number,title : string,seo_title : string,vehicle_types : number[]){
    this.category_id = category_id;
    this.category_type = category_type;
    this.has_icon = has_icon;
    this.title = title;
    this.seo_title = seo_title;
    this.vehicle_types = vehicle_types;
  }
}