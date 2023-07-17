import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";
import { MultiSelect } from "react-multi-select-component";
import "./App.css";
import { Cat } from "./domain/cat";
import { Meta } from "./domain/meta";
export interface ISidebarProps {
  meta: Meta | undefined;
  selectedicon: number;
  handleIconChange: (icon: number) => void;
  selectedManufacturers: Array<{ label: string; value: number }>;
  setSelectedManufacturers: (
    manufacturers: Array<{ label: string; value: number }>
  ) => void;
  manufacturers: Array<{
    man_id: string;
    is_car: string;
    is_spec: string;
    is_moto: string;
  }>;
  carphoto: string;
  truckphoto: string;
  motophoto: string;
  handleRentOptionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filteredManufacturers: Array<{ man_name: string; man_id: string }>;
  handleManufacturersChange: (
    manufacturers: Array<{ label: string; value: number }>
  ) => void;
  cat_lst: Cat[];
  selectedCategories: Array<{ label: string; value: number }>;
  handleCategoriesChange: (
    categories: Array<{ label: string; value: number }>
  ) => void;
  currency: string;
  toggleCurrency: () => void;
  handleMinPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleMaxPriceChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearchButtonClick: () => void;
  filteredCount: number;
}

export default function Sidebar({
  selectedicon,
  handleIconChange,
  selectedManufacturers,
  setSelectedManufacturers,
  manufacturers,
  carphoto,
  truckphoto,
  motophoto,
  handleRentOptionChange,
  filteredManufacturers,
  handleManufacturersChange,
  cat_lst,
  selectedCategories,
  handleCategoriesChange,
  currency,
  toggleCurrency,
  handleMinPriceChange,
  handleMaxPriceChange,
  handleSearchButtonClick,
  filteredCount,
  meta,
}: ISidebarProps) {
  return (
    <div className="sidebar">
      <div className="button-container">
        <button
          className={`radioButton ${selectedicon === 0 ? "selected" : ""}`}
          onClick={() => {
            handleIconChange(0);
            if (
              selectedManufacturers.some(
                (manufacturer) =>
                  !manufacturers.find(
                    (man) =>
                      man.man_id === String(manufacturer.value) &&
                      man.is_car === "1"
                  )
              )
            ) {
              setSelectedManufacturers([]);
            }
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: carphoto }} />
        </button>
        <button
          className={`radioButton ${selectedicon === 1 ? "selected" : ""}`}
          onClick={() => {
            handleIconChange(1);
            if (
              selectedManufacturers.some(
                (manufacturer) =>
                  !manufacturers.find(
                    (man) =>
                      man.man_id === String(manufacturer.value) &&
                      man.is_spec === "1"
                  )
              )
            ) {
              setSelectedManufacturers([]);
            }
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: truckphoto }} />
        </button>

        <button
          className={`radioButton ${selectedicon === 2 ? "selected" : ""}`}
          onClick={() => {
            handleIconChange(2);
            if (
              selectedManufacturers.some(
                (manufacturer) =>
                  !manufacturers.find(
                    (man) =>
                      man.man_id === String(manufacturer.value) &&
                      man.is_moto === "1"
                  )
              )
            ) {
              setSelectedManufacturers([]);
            }
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: motophoto }} />
        </button>
      </div>
      <div className="sort_stats">
        <p className="sort_text">გარიგების ტიპი</p>
        <select className="dropdown sellType" onChange={handleRentOptionChange}>
        <option selected>ყველანაირი</option>
          <option>იყიდება</option>
          <option>ქირავდება</option>
        </select>
        <p className="sort_text">მწარმოებელი</p>
        <MultiSelect
          options={filteredManufacturers.map((manufacturer) => ({
            label: manufacturer.man_name,
            value: manufacturer.man_id,
          }))}
          value={selectedManufacturers}
          onChange={handleManufacturersChange}
          labelledBy="Select manufacturers"
          overrideStrings={{
            selectSomeItems: "ყველა მწარმოებელი",
          }}
        />

        <p className="sort_text">კატეგორია</p>

        <MultiSelect
          options={cat_lst
            .filter((cat) => cat.category_type === selectedicon)
            .map((cat) => ({
              label: cat.seo_title,
              value: cat.category_id,
            }))}
          value={selectedCategories}
          onChange={handleCategoriesChange}
          labelledBy="Select categories"
          overrideStrings={{
            selectSomeItems: "ყველა კატეგორია",
          }}
        />
      </div>
      <div className="switch-container">
        <p>ფასი</p>
        <button
          className={`switch ${currency === "usd" ? "toggled" : ""}`}
          onClick={toggleCurrency}
        >
          <div className="toggleMoney"></div>
          <p className="curIcon">₾</p>

          <p className="curIcon">$</p>
        </button>
      </div>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <InputGroup className="mb-3 d-flex align-items-center">
          <FormControl
            className="mr-2"
            placeholder="დან"
            onChange={handleMinPriceChange}
          />
          <span>-</span>
          <FormControl
            placeholder="მდე"
            className="ml-2"
            onChange={handleMaxPriceChange}
          />
        </InputGroup>
        <div className="mb-3"></div>
      </div>
      <button className="searchBar" onClick={handleSearchButtonClick}>
        ძებნა <p>{meta?.total} products found</p>
      </button>
    </div>
  );
}
