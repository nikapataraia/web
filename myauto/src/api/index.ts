import { OptionType,PeriodType } from "../interfaces";

export const mansApiBaseUrl = "https://static.my.ge/myauto/js/mans.json"; // api1
export const modelsApiBaseUrl = "https://api2.myauto.ge/ka/getManModels"; // api2
export const catsApiBaseUrl = "https://api2.myauto.ge/ka/cats/get"; // api3
export const productsApiBaseUrl = "https://api2.myauto.ge/ka/products"; // api4

export const generateProductApiUrl = (
  cats?: OptionType[],
  mans?: OptionType[],
  rent?: boolean,
  rent_chosen?:boolean,
  minPrice?: number,
  maxPrice?: number,
  page?: number,
  SortOrder?: OptionType[],
  period?: PeriodType[],
 
) => {
  let url = new URL(productsApiBaseUrl);
  if (period) {


    url.searchParams.append(
      "Period",
      period.map((c) => String(c.value)).join(",")
    );
    // period.map((c) => console.log(c.value + "narutoooooooooooooo"));
  }
  if (SortOrder) {

    url.searchParams.append(
      "SortOrder",
      SortOrder.map((c) => Number(c.value)).join(",")
    );
  }
  if (cats) {
    // If API accepts a list of categories, join them into a string
    url.searchParams.append("Cats", cats.map((c) => c.value).join(","));
  }
  if (mans) {
    url.searchParams.append("Mans", mans.map((m) => m.value).join(","));
  }
  // if (selectedicon !== null) {
  //   url.searchParams.append("API_QUERY_PARAMETER", selectedicon.toString());
  // }
  if(rent_chosen){
    url.searchParams.append("ForRent", rent ? "1" : "0");
  }

  if (minPrice) {
    url.searchParams.append("PriceFrom", minPrice.toString());
  }
  if (maxPrice) {
    url.searchParams.append("PriceTo", maxPrice.toString());
  }
  if (page) {
    url.searchParams.append("Page", page.toString());
  }
  return url.toString();
};
