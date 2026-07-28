import { useEffect, useState } from "react";

import CompanyForm from "../components/CompanyForm";
import CompanyTable from "../components/CompanyTable";

import {
  getCompanies,
  createCompany,
  deleteCompany,
} from "../services/companyService";

export default function Companies() {

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    try {
      const res = await getCompanies();

      setCompanies(res.companies);

    } catch (err) {
      console.error(err);
    }
  };

  const saveCompany = async (company) => {

    try {

      await createCompany(company);

      alert("Company Added Successfully");

      loadCompanies();

    } catch (err) {

      console.log(err);

      alert("Unable to add company");

    }

  };

  const removeCompany = async (id) => {

    if (!window.confirm("Delete this company?"))
      return;

    try {

      await deleteCompany(id);

      alert("Company Deleted");

      loadCompanies();

    } catch (err) {

      console.log(err);

      alert("Unable to delete company");

    }

  };

  return (

    <div
      style={{
        padding: "30px",
        background: "#111827",
        minHeight: "100vh"
      }}
    >

      <h1
        style={{
          color: "white",
          marginBottom: "30px"
        }}
      >
        Company Management
      </h1>

      <CompanyForm
        onSave={saveCompany}
      />

      <CompanyTable
        companies={companies}
        onDelete={removeCompany}
      />

    </div>

  );

}