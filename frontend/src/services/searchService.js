import axios from "axios";

const API = `/search`;

const getToken = () => {
  return localStorage.getItem("token");
};

// Global search across all modules
export const globalSearch = async (query, filters = {}) => {
  const res = await axios.get(
    API + "/global",
    {
      params: {
        q: query,
        ...filters
      },
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Search in specific module
export const searchInModule = async (module, query, filters = {}) => {
  const res = await axios.get(
    API + "/module/" + module,
    {
      params: {
        q: query,
        ...filters
      },
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Advanced search with multiple filters
export const advancedSearch = async (searchParams) => {
  const res = await axios.post(
    API + "/advanced",
    searchParams,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Get search suggestions
export const getSearchSuggestions = async (query) => {
  const res = await axios.get(
    API + "/suggestions",
    {
      params: { q: query },
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Save search history
export const saveSearchHistory = async (searchData) => {
  const res = await axios.post(
    API + "/history",
    searchData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Get search history
export const getSearchHistory = async () => {
  const res = await axios.get(
    API + "/history",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Clear search history
export const clearSearchHistory = async () => {
  const res = await axios.delete(
    API + "/history",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};