import PropTypes from "prop-types";
import { createContext, useContext, useReducer } from "react";
const initialFilters = {
  categories: [],
  sizes: [],
  price: undefined,
  availability: "",
};

function filterReducer(state, action) {
  switch (action.type) {
    case "editCategories": {
      if (state.categories.find((el) => el === action.payload)) {
        return {
          ...state,
          categories: state.categories.filter(
            (item) => item !== action.payload
          ),
        };
      } else {
        return {
          ...state,
          categories: [...state.categories, action.payload],
        };
      }
    }

    case "editSizes":
      if (state.sizes.find((el) => el === action.payload)) {
        return {
          ...state,
          sizes: state.sizes.filter((item) => item !== action.payload),
        };
      } else
        return {
          ...state,
          sizes: [...state.sizes, action.payload],
        };
    case "editPrice":
      return {
        ...state,
        price: action.payload,
      };
    case "removePrice":
      return {
        ...state,
        price: "",
      };
    case "editAvailability":
      if (!action.payload) {
        return { ...state, availability: "" };
      } else {
        return { ...state, availability: action.payload };
      }
    case "setSpecificFilters":
      console.log(action.payload);
      return {
        ...state,
        categories: [action.payload.category],
        sizes: [action.payload.size],
        price: action.payload.price,
        availability: "In Store",
      };
    case "clearAll":
      return initialFilters;

    default:
      throw new Error("Unknown action type ");
  }
}
export const FiltersContext = createContext();

function FiltersProvider({ children }) {
  const [filters, dispatch] = useReducer(filterReducer, initialFilters);
  return (
    <FiltersContext.Provider value={{ filters, dispatch }}>
      {children}
    </FiltersContext.Provider>
  );
}
function useFilters() {
  const context = useContext(FiltersContext);

  return context;
}
export { FiltersProvider, useFilters };
FiltersProvider.propTypes = {
  children: PropTypes.element,
};
