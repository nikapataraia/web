export class Manufacturer {
  man_id : string;
  man_name : string;
  is_car : string;
  is_spec : string;
  is_moto : string;
  constructor(  man_id : string , man_name : string,is_car : string,is_spec : string, is_moto : string,){
    this.man_id = man_id;
    this.man_name = man_name;
    this.is_car = is_car;
    this.is_spec = is_spec;
    this.is_moto = is_moto;
  }
}