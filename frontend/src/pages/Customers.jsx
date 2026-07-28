import { useEffect, useState } from "react";

import CustomerForm from "../components/CustomerForm";
import CustomerTable from "../components/CustomerTable";

import {
  getCustomers,
  createCustomer,
  deleteCustomer
} from "../services/customerService";

export default function Customers() {

  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();

      setCustomers(res.customers);

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

  const removeCustomer = async (id) => {

    if (!window.confirm("Delete this customer?")) {
      return;
    }

    try {

      await deleteCustomer(id);

      loadCustomers();

      alert("Customer Deleted Successfully");

    } catch (err) {

      console.log(err);

      alert("Unable to Delete Customer");

    }

  };

  const editCustomer = (customer) => {

    alert(
      "Edit Dialog will be added in next step.\n\nCustomer: " +
      customer.full_name
    );

  };

  return (

    <div
      style={{
        padding: "30px"
      }}
    >

      <h1>Customer Management</h1>

      <CustomerForm
        onSave={saveCustomer}
      />

      <CustomerTable
        customers={customers}
        onEdit={editCustomer}
        onDelete={removeCustomer}
      />

    </div>

  );

}