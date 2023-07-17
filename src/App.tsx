import { useState, useEffect, useMemo } from "react";
import autologo from "./assets/myauto.png";
import "./App.css";
import { Manufacturer } from "./domain/manufacturer";
import { Cat } from "./domain/cat";
import { Product } from "./domain/product";
import { Model } from "./domain/model";
import Vehicle_container from "./vehicle_container";
import { Meta } from "./domain/meta";
import Sidebar from "./sidebar";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import carphoto from "./assets/carphoto";
import truckphoto from "./assets/truckphoto";
import motophoto from "./assets/motophoto";
import { MultiSelect } from "react-multi-select-component";
import { InputGroup, FormControl } from "react-bootstrap";
import { OptionType,PeriodType} from "./interfaces";
import {
  catsApiBaseUrl,
  generateProductApiUrl,
  mansApiBaseUrl,
  modelsApiBaseUrl,
  productsApiBaseUrl,
} from "./api";
function App() {
  // GENERATION
  const [selectedSortOrder, setSelectedSortOrder] = useState<OptionType[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType[]>([]);  
  const [manufacturers, setmanufacturers] = useState<Manufacturer[]>([]);
  const [models, setmodels] = useState<Model[]>([]);
  const [cat_lst, setcat_lst] = useState<Cat[]>([]);
  const [product_lst, setproduct_lst] = useState<Product[]>([]);
  const [loading, setloading] = useState(false);
  const [meta, setmeta] = useState<Meta | undefined>();
  const [page, setPage] = useState(1);
  const [loaded_pages, set_loaded_pages] = useState<[Product[], number][]>([]);
  const [modelstorage , setmodelstorage] = useState<[Model[] , number][]>([])
  // GENERATION


  const doeverythingformans = (id : number) =>{
    const existingModelData = modelstorage.find(([_, storedId]) => storedId === id);
    if(existingModelData){
      return;
    }
    const apiUrl = "https://api2.myauto.ge/ka/getManModels?man_id=" + String(id);

    fetch(apiUrl)
    .then((response) => response.json())
    .then((fetchedModels) => {
      setmodelstorage((prevModelStorage) => [...prevModelStorage, [fetchedModels.data, id]]);
     })
     .catch((error) => {
       console.error(error);
     });
  }

  // filtration
  const [currency, setCurrency] = useState("Dollars");
  const [selectedicon, setselectedicon] = useState<number>(0);

  const [selectedRentOption, setSelectedRentOption] = useState<boolean>(false);
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [filteredCount, setFilteredCount] = useState<number>(0);
  const [selectedManufacturers, setSelectedManufacturers] = useState<
    OptionType[]
  >([]);
  const [selectedCategories, setSelectedCategories] = useState<OptionType[]>(
    []
  );
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);





  // windows width handlers
  const isWindowWide = () => {
    return window.innerWidth > 1100;
  };
  const [sidebarOpen, setSidebarOpen] = useState(isWindowWide());
  const [windowWide, setWindowWide] = useState(isWindowWide());

  const iswindowwidefortransform = () => {
    return window.innerWidth < 800
  }
  const [isless800, setisless800] = useState(false);
  useEffect(() => {
    const updateIsLess800 = () => {
      setisless800(iswindowwidefortransform());
    };
    updateIsLess800();
    window.addEventListener('resize', updateIsLess800);
    return () => {
      window.removeEventListener('resize', updateIsLess800);
    };
  }, []);

  // --------------



  // Init Data
  useEffect(() => {
    fetchManufacturers();
    fetchModels();
    fetchCatList();
    fetchProductList(productsApiBaseUrl);
  }, []);

  function handleSearchButtonClick() {
    setPage(1); // Reset the page
    const filteredApi = generateProductApiUrl(
      selectedCategories,
      selectedManufacturers,
      selectedRentOption,
      rent_chosen,
      minPrice,
      maxPrice,
      1,
      selectedSortOrder,
      selectedPeriod
    );


    fetchProductList(filteredApi);
  }

  // Manqana - Traqtori - Moto
  function handleIconChange(newIcon: number) {
    setselectedicon(newIcon);
    setSelectedManufacturers([]);
    setSelectedCategories([]);
  }

  function handlePageChange(newPage: number) {
    // If new page is not in range of 1 and last_page dont update the state
    if (newPage < 0 || newPage > (meta?.last_page ?? Number.MAX_SAFE_INTEGER))
      return;

    setPage(newPage);
    const filteredApi = generateProductApiUrl(
      selectedCategories,
      selectedManufacturers,
      selectedRentOption,
      rent_chosen,
      minPrice,
      maxPrice,
      newPage,
      selectedSortOrder,
      selectedPeriod
    );

    fetchProductList(filteredApi);

    // Scroll to the top
    window.scrollTo(0, 0);
  }

  // filtrasion
  const fetchManufacturers = async () => {
    try {
      const response = await fetch(mansApiBaseUrl);
      const data = await response.json();
      setmanufacturers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await fetch(modelsApiBaseUrl);
      const data = await response.json();

      setmodels(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCatList = async () => {
    try {
      const response = await fetch(catsApiBaseUrl);
      const data = await response.json();

      setcat_lst(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  async function fetchProductList(api: string) {
    setloading(true);

    try {
      const response = await fetch(api);
      const data = await response.json();
      setmeta(data.data.meta);
      setproduct_lst(data.data.items);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  }

  useEffect(() => {
    setloading(false);
  }, [manufacturers, models, cat_lst, product_lst]);

  // GENERATING PRODUCTS, 15-PER PAGE

  const addpagetolist = (page_prod: Product[], page_num: number) => {
    if (!loaded_pages.some((tup) => tup[1] === page_num)) {
      set_loaded_pages((prevPages) => [...prevPages, [page_prod, page_num]]);
    }
  };

  // -----------------------------------------------------------------------------------------

  // Filtraion
  useEffect(() => {
    function handleResize() {
      setWindowWide(isWindowWide());
      if (!isWindowWide()) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    }

    window.addEventListener("resize", handleResize);

   
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const [rent_chosen, setrent_chosen] = useState(false);

  const handleRentOptionChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setrent_chosen(event.target.value === "ყველანაირი" ? false : true)
    setSelectedRentOption(event.target.value === "იყიდება" ? false : true);
  };
  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "gel" ? "usd" : "gel"));
  };
  const handleManufacturersChange = (selectedList: OptionType[]) => {
    setSelectedManufacturers(selectedList);
  };

  const handleCategoriesChange = (selectedList: OptionType[]) => {
    setSelectedCategories(selectedList);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(event.target.value ? Number(event.target.value) : undefined);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(event.target.value ? Number(event.target.value) : undefined);
  };
  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedList = Array.from(event.target.selectedOptions).map(
      (option) => ({
        label: option.label,
        value: option.value,
      })
    );
    setSelectedPeriod(selectedList);
  };

  const handleSortOrderChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedList = Array.from(event.target.selectedOptions).map(
      (option) => ({
        label: option.label,
        value: Number(option.value),
      })
    );
    setSelectedSortOrder(selectedList);
  };
  const filteredManufacturers = useMemo(() => {
    let filteredManufacturers: Manufacturer[] = [];

    if (selectedicon === 0) {
      filteredManufacturers = manufacturers.filter(
        (manufacturer) => manufacturer.is_car === "1"
      );
    } else if (selectedicon === 1) {
      filteredManufacturers = manufacturers.filter(
        (manufacturer) => manufacturer.is_spec === "1"
      );
    } else if (selectedicon === 2) {
      filteredManufacturers = manufacturers.filter(
        (manufacturer) => manufacturer.is_moto === "1"
      );
    } else {
      filteredManufacturers = manufacturers;
    }

    return filteredManufacturers;
  }, [selectedicon, manufacturers]);

  // -----------------------------------------------------------------------------------------

  const useless = (
    <div className="container useless">
      მთავარი{" > "}ძიება{" > "} <span>იყიდება</span>
    </div>
  );
  console.log(product_lst)

  return (
    <div>
      <header className="bg-light">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <a className="navbar-brand" href="#">
              <img src={autologo} alt="myauto" className="header-logo" />
            </a>
          </div>
        </nav>
      </header>

      <div>{isWindowWide() ? useless : null}</div>

      <div>
      <div className="sidebarcontainer">
          <button className="sidebar-toggle" onClick={toggleSidebar}>
            ფილტრი
          </button>
          <div className="leftdrop">
          <select
            className="dropdown sortPeriod drops smol"
            onChange={handlePeriodChange}>
            <option value="" >ყველა</option>
            <option value="1h">1h</option>
            <option value="2h">2h</option>
            <option value="3h">3h</option>
            <option value="1d">1d</option>
            <option value="2d">2d</option>
            <option value="3d">3d</option>
            <option value="1w">1w</option>
            <option value="2w">2w</option>
            <option value="3w">3w</option>
          </select>
          <select
            className="dropdown sortdates drops" onChange={handleSortOrderChange}>
            <option value="1">თარიღი კლებადი</option>
            <option value="2">თარიღი ზრდადი</option>
            <option value="3">ფასი კლებადი</option>
            <option value="4">ფასი ზრდადი</option>
            <option value="5">გარბენი კლებადი</option>
            <option value="6">გარბენი ზრდადი</option>
          </select>
          </div>
          {sidebarOpen && (
            <div className="zoomsidebar">
              <Sidebar
              meta={meta}
                selectedicon={selectedicon}
                handleIconChange={handleIconChange}
                selectedManufacturers={selectedManufacturers}
                setSelectedManufacturers={setSelectedManufacturers}
                manufacturers={manufacturers}
                carphoto={carphoto}
                truckphoto={truckphoto}
                motophoto={motophoto}
                handleRentOptionChange={handleRentOptionChange}
                filteredManufacturers={filteredManufacturers}
                handleManufacturersChange={handleManufacturersChange}
                cat_lst={cat_lst}
                selectedCategories={selectedCategories}
                handleCategoriesChange={handleCategoriesChange}
                currency={currency}
                toggleCurrency={toggleCurrency}
                handleMinPriceChange={handleMinPriceChange}
                handleMaxPriceChange={handleMaxPriceChange}
                handleSearchButtonClick={handleSearchButtonClick}
                filteredCount={filteredCount}
              />
              <button className="backbutton" onClick={toggleSidebar}>
                უკან
              </button>
            </div>
          )}
        </div>

        {loading ? (
          <h1 className="vehicle_container">Loading...</h1>
        ) : (
          <Vehicle_container
            addpagetolist={addpagetolist}
            product_lst={product_lst}
            models={modelstorage}
            cat_lst={cat_lst}
            manufacturers={manufacturers}
            page={page}
            handlePageChange={handlePageChange}
            isusd = {currency === "usd"}
            doeverythingformans={doeverythingformans}
            smallwindow = {isless800}
          />
        )}
      </div>
    </div>
  );
}

export default App;
