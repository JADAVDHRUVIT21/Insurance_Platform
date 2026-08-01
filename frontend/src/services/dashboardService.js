import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000/api";

const getToken = () => {
  return localStorage.getItem("token");
};

const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

export const getDashboardData = async () => {

  const [
    customers,
    doctors,
    hospitals,
    medicines,
    appointments,
    companies
  ] = await Promise.all([

    axios.get(BASE_URL + "/customers/"),

    axios.get(BASE_URL + "/doctors/"),

    axios.get(BASE_URL + "/hospitals/"),

    axios.get(BASE_URL + "/medicines/"),

    axios.get(BASE_URL + "/appointments/"),

    axios.get(
      BASE_URL + "/companies/",
      authHeaders()
    )

  ]);

  return {

    customers:
      customers.data.customers || [],

    doctors:
      doctors.data.doctors || [],

    hospitals:
      hospitals.data.hospitals || [],

    medicines:
      medicines.data.medicines || [],

    appointments:
      appointments.data.appointments || [],

    companies:
      companies.data.companies || []

  };

};