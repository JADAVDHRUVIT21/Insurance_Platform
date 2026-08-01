import { useEffect, useState } from "react";

import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";
import EditCustomerDialog from "../components/EditCustomerDialog";

import {
  getCustomers,
  createCustomer,
  updateCustomer,
  deleteCustomer
} from "../services/customerService";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.customers || []);
    } catch (err) {
      console.log(err);
    }
  };

  const saveCustomer = async (customer) => {
    try {
      await createCustomer(customer);
      loadCustomers();
      alert("Customer Added Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to Add Customer");
    }
  };

  const updateSelectedCustomer = async (customer) => {
    try {
      await updateCustomer(customer.id, customer);
      setSelectedCustomer(null);
      loadCustomers();
      alert("Customer Updated Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to Update Customer");
    }
  };

  const removeCustomer = async (id) => {
    if (!window.confirm("Delete this customer?")) return;

    try {
      await deleteCustomer(id);
      loadCustomers();
      alert("Customer Deleted Successfully");
    } catch (err) {
      console.log(err);
      alert("Unable to Delete Customer");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1 style={{ color: "white", marginBottom: 25 }}>
        Customer Management
      </h1>

      <CustomerForm onSave={saveCustomer} />

      <CustomerTable
        customers={customers}
        onEdit={setSelectedCustomer}
        onDelete={removeCustomer}
      />

      {selectedCustomer && (
        <EditCustomerDialog
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
          onSave={updateSelectedCustomer}
        />
      )}
    </div>
  );
}