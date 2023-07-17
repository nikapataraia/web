export class Model{
  model_id : number ;
  man_id : number;
  model_name : string;
  model_group : string;
  sort_order : number;
  cat_man_id : number;
  cat_model_id : number;
  cat_modif_id : number;
  is_car : boolean;
  is_moto : boolean;
  is_spec : boolean;
  show_in_salons : number;
  shown_in_slider : number;

  constructor(  model_id : number ,man_id : number,model_name : string,model_group : string,sort_order : number,cat_man_id : number,cat_model_id : number,
    cat_modif_id : number,is_car : boolean,is_moto : boolean,is_spec : boolean,show_in_salons : number, shown_in_slider : number,){
      this.model_id = model_id;
      this.man_id = man_id;
      this.model_name = model_name;
      this.model_group = model_group;
      this.sort_order = sort_order;
      this.cat_man_id = cat_man_id;
      this.cat_model_id = cat_model_id;
      this.cat_modif_id = cat_modif_id;
      this.is_car = is_car;
      this.is_moto = is_moto;
      this.is_spec = is_spec;
      this.show_in_salons = show_in_salons;
      this.shown_in_slider = shown_in_slider;
  }
}