  import { useEffect, useState } from "react";

  import CompanyCard from "../components/CompanyCard";
  import CompanyForm from "../components/CompanyForm";
  import CompanyTable from "../components/CompanyTable";
  import EditCompanyDialog from "../components/EditCompanyDialog";
  import DeleteCompanyDialog from "../components/DeleteCompanyDialog";

  import {
    getCompanies,
    createCompany,
    updateCompany,
    deleteCompany
  } from "../services/companyService";

  export default function Companies() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);

    const [editingCompany, setEditingCompany] = useState(null);
    const [deletingCompany, setDeletingCompany] = useState(null);

    const [error, setError] = useState("");

    useEffect(() => {
      fetchCompanies();
    }, []);

    const fetchCompanies = async () => {
      try {
        setLoading(true);

        const res = await getCompanies();

        setCompanies(res.companies || []);

        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load companies.");
      } finally {
        setLoading(false);
      }
    };

    const handleCreate = async (data) => {
      try {
        await createCompany(data);
        await fetchCompanies();
        setShowAddForm(false);
      } catch (err) {
        console.error(err);
        alert("Unable to create company.");
      }
    };

    const handleUpdate = async (data) => {
      try {
        await updateCompany(editingCompany.id, data);
        await fetchCompanies();
        setEditingCompany(null);
      } catch (err) {
        console.error(err);
        alert("Unable to update company.");
      }
    };

    const handleDelete = async (id) => {
      try {
        await deleteCompany(id);
        await fetchCompanies();
        setDeletingCompany(null);
      } catch (err) {
        console.error(err);
        alert("Unable to delete company.");
      }
    };

    if (loading) {
      return (
        <div
          style={{
            color: "white",
            textAlign: "center",
            padding: "50px"
          }}
        >
          Loading Companies...
        </div>
      );
    }

    return (
      <div style={{ padding: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px"
          }}
        >
          <h1 style={{ color: "white" }}>
            🏢 Company Management
          </h1>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              background: "#2563eb",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              cursor: "pointer"
            }}
          >
            {showAddForm ? "Cancel" : "+ Add Company"}
          </button>
        </div>

        {error && (
          <div
            style={{
              background: "#7f1d1d",
              color: "#fecaca",
              padding: "15px",
              borderRadius: "8px",
              marginBottom: "20px"
            }}
          >
            {error}
          </div>
        )}

        <CompanyCard
          totalCompanies={companies.length}
        />

        {showAddForm && (
          <CompanyForm
            onSubmit={handleCreate}
            buttonText="Add Company"
          />
        )}

        <CompanyTable
          companies={companies}
          onEdit={setEditingCompany}
          onDelete={setDeletingCompany}
        />

        <EditCompanyDialog
          open={!!editingCompany}
          company={editingCompany}
          onClose={() => setEditingCompany(null)}
          onUpdate={handleUpdate}
        />

        <DeleteCompanyDialog
          open={!!deletingCompany}
          company={deletingCompany}
          onClose={() => setDeletingCompany(null)}
          onConfirm={handleDelete}
        />
      </div>
    );
  }