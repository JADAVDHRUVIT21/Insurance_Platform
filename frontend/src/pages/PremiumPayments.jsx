import { useState, useEffect } from "react";

import {
  getPayments,
  createPayment,
  updatePayment,
  deletePayment
} from "../services/paymentService";

import PaymentCard from "../components/PaymentCard";
import PaymentTable from "../components/PaymentTable";
import PaymentForm from "../components/PaymentForm";
import EditPaymentDialog from "../components/EditPaymentDialog";
import DeletePaymentDialog from "../components/DeletePaymentDialog";

export default function PremiumPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [deletingPayment, setDeletingPayment] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);

      const data = await getPayments();

      console.log("Payment API Response:", data);

      let paymentList = [];

      if (Array.isArray(data)) {
        paymentList = data;
      } else if (Array.isArray(data.payments)) {
        paymentList = data.payments;
      } else if (Array.isArray(data.data)) {
        paymentList = data.data;
      } else if (Array.isArray(data.results)) {
        paymentList = data.results;
      }

      setPayments(paymentList);
      setError("");
    } catch (err) {
      console.error(err);
      setPayments([]);
      setError("Failed to load payments.");
    } finally {
      setLoading(false);
    }
  };

  const totalPayments = payments.length;

  const totalAmount = payments.reduce(
    (sum, p) => sum + Number(p.amount || p.payment_amount || 0),
    0
  );

  const paidCount = payments.filter(
    (p) => p.status === "Paid"
  ).length;

  const pendingCount = payments.filter(
    (p) => p.status === "Pending"
  ).length;

  const handleCreate = async (formData) => {
    try {
      await createPayment(formData);
      await fetchPayments();
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to create payment.");
    }
  };

  const handleUpdate = async (id, formData) => {
    try {
      await updatePayment(id, formData);
      await fetchPayments();
      setEditingPayment(null);
    } catch (err) {
      console.error(err);
      alert("Failed to update payment.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deletePayment(id);
      await fetchPayments();
      setDeletingPayment(null);
    } catch (err) {
      console.error(err);
      alert("Failed to delete payment.");
    }
  };

  if (loading) {
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "50px"
        }}
      >
        Loading Payments...
      </h2>
    );
  }

  return (
    <div style={{ padding: "25px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "25px"
        }}
      >
        <h1 style={{ color: "white" }}>
          Premium Payments
        </h1>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "Close" : "Add Payment"}
        </button>
      </div>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <PaymentCard
        totalPayments={totalPayments}
        totalAmount={totalAmount}
        paidCount={paidCount}
        pendingCount={pendingCount}
      />

      {showAddForm && (
        <PaymentForm
          onSubmit={handleCreate}
          buttonText="Save Payment"
        />
      )}

      <PaymentTable
        payments={payments}
        onEdit={setEditingPayment}
        onDelete={setDeletingPayment}
      />

      <EditPaymentDialog
        open={!!editingPayment}
        payment={editingPayment}
        onClose={() => setEditingPayment(null)}
        onUpdate={handleUpdate}
      />

      <DeletePaymentDialog
        open={!!deletingPayment}
        payment={deletingPayment}
        onClose={() => setDeletingPayment(null)}
        onConfirm={handleDelete}
      />
    </div>
  );
}