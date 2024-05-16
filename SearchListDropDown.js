import PropTypes from "prop-types";

/**
 * ListDropDown component renders a list drop-down with autocomplete functionality.
 * @param {object} props - Component props.
 * @param {Array} props.suggestions - The array of suggestions to be rendered.
 * @param {React.ComponentType} props.startAdornment - The start adornment component to be rendered for each suggestion item.
 * @param {Function} props.handleClick - The function to handle click events on suggestion items.
 * @param {string} [props.classes=""] - Additional CSS classes to apply to the component.
 * @returns {JSX.Element} - The rendered ListDropDown component.
 */
const ListDropDown = ({ suggestions, startAdornment: StartAdornment, handleClick, classes = "" }) => {
  /**
   * Handles click event on a suggestion item.
   * @param {any} item - The clicked suggestion item.
   */
  const handleClickItem = (item) => {
    handleClick(item);
  };

  return (
    <>
      {suggestions && (
        <ul className={`z-10 max-h-[27vh] shadow-sm ${classes}`}>
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="flex cursor-pointer items-center justify-start border-b-[1.5px] border-gray-100 px-2 py-3 hover:bg-slate-100"
              onClick={() => handleClickItem(item)}
            >
              {StartAdornment && (
                <span className="mr-2 h-6 w-6 rounded-full">
                  <StartAdornment width={8} height={8} sizes="100vw" isPriority={false} />
                </span>
              )}
              {typeof item === "object" ? Object.values(item) : item}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

ListDropDown.propTypes = {
  suggestions: PropTypes.array.isRequired,
  startAdornment: PropTypes.elementType,
  classes: PropTypes.string,
  handleClick: PropTypes.func.isRequired,
};

export default ListDropDown;



_________________________________________________________________________________________________________________________________________________________



"use client";
import React, { useEffect, useState } from "react";
import ListDropDown from "../../../components/molecules/listDropDown";
import Typography from "../../../components/atoms/typography";
import TextField from "../../../components/atoms/textField";
import CustomImage from "../../../components/atoms/customImage";

/**
 * Home component renders the home page content.
 * @returns {JSX.Element} Home component JSX
 */
const Home = () => {
  const [search, setSearch] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [cities, setCities] = useState([]);
  const [pincodes, setPincodes] = useState([]);

  const googleSuggestions = [
    "New York",
    "New Delhi",
    "Los Angeles",
    "Chicago",
    "Houston",
    "Asansol",
    "Rourkela",
    "Nanded",
    "Kolhapur",
    "Ajmer",
    "Abids",
    "Akola",
    "Gulbarga",
    "Jamnagar",
    "Pan Nagar",
    "ande",
    "anfli",
  ];

  useEffect(() => {
    /** */
    const fetchCities = async () => {
      try {
        const response = await fetch("https://atcdel.fnp.com/chocolate/v1/global/static/pincode/11");
        if (response.ok) {
          const data = await response.json();
          setPincodes(data);
        } else {
          // console.error("Failed to fetch pincodes");
        }
      } catch (error) {
        // console.error("Error fetching pincodes:", error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    /** */
    const fetchCities = async () => {
      try {
        const response = await fetch("https://atcdel.fnp.com/tiffany/v1/cities/country/GBR");
        if (response.ok) {
          const data = await response.json();
          setCities(data.data);
        } else {
          // console.error("Failed to fetch cities");
        }
      } catch (error) {
        // console.error("Error fetching cities:", error);
      }
    };

    fetchCities();
  }, []);

  /**
   * Handles the change event when the input value changes.
   * @param {Event} e - The input change event.
   */
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value?.length >= 2) {
      let filtered;
      if (typeof pincodes === "object" && value.match(/^[0-9]+$/)) {
        filtered = pincodes.filter((item) => {
          const key = Object.keys(item)[0];
          return key.toLowerCase().startsWith(value.toLowerCase());
        });
        filtered = filtered.map((item) => {
          const key = Object.keys(item)[0];
          return `${key}, ${item[key]}`;
        });
      }
      if (Array.isArray(cities) && value.match(/[A-Za-z]/)) {
        filtered = cities
          .filter((city) => {
            return city.cityName.toLowerCase().startsWith(value.toLowerCase());
          })
          .map((city) => `${city.cityName}`);
      }
      if (typeof googleSuggestions[0] === "string" && value.match(/[A-Za-z0-9]/)) {
        const stringFiltered = googleSuggestions.filter((item) => item.toLowerCase().includes(value.toLowerCase()));
        filtered = filtered ? filtered.concat(stringFiltered) : stringFiltered;
      }
      setFilteredSuggestions(filtered.slice(0, 5));
    } else {
      setFilteredSuggestions([]);
    }
  };

  /** */
  const onHandleListClick = (item) => {
    setSearch(item);
    setFilteredSuggestions([]);
  };

  return (
    <div className="mx-auto mt-36 w-[20rem]">
      <Typography variant="h5" Tag="h1" classes="text-base">
        Gift Receiver’s Location
      </Typography>
      <TextField
        type="text"
        placeholder="Enter Receiver’s pincode, location, area"
        isRequired={true}
        variant="primary"
        id="list_drop_down"
        inputValue={search}
        onChange={handleInputChange}
        classes="border border-2 border-gray-300 rounded-md px-2 py-2 focus:border-gray-400"
      />
      <ListDropDown
        suggestions={filteredSuggestions}
        handleClick={onHandleListClick}
        startAdornment={(props) => <CustomImage src="/icons/location-Icon.svg" alt="Location-Icon" {...props} />}
      />
    </div>
  );
};

export default Home;

