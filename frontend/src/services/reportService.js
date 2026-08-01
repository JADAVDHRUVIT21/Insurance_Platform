import axios from "axios";

const API = `/reports`;

const getToken = () => {
  return localStorage.getItem("token");
};

// Get all reports
export const getReports = async () => {
  const res = await axios.get(API);
  return res.data;
};

// Get a specific report by ID
export const getReport = async (id) => {
  const res = await axios.get(API + "/" + id);
  return res.data;
};

// Generate a new report
export const generateReport = async (reportData) => {
  const res = await axios.post(
    API + "/generate",
    reportData,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Export report as PDF
export const exportReportPDF = async (id) => {
  const res = await axios.get(
    API + "/" + id + "/export/pdf",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      responseType: 'blob'
    }
  );
  return res.data;
};

// Export report as Excel
export const exportReportExcel = async (id) => {
  const res = await axios.get(
    API + "/" + id + "/export/excel",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      },
      responseType: 'blob'
    }
  );
  return res.data;
};

// Delete a report
export const deleteReport = async (id) => {
  const res = await axios.delete(
    API + "/" + id,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Get report statistics
export const getReportStats = async () => {
  const res = await axios.get(
    API + "/stats",
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};

// Get report by type
export const getReportsByType = async (type) => {
  const res = await axios.get(
    API + "/type/" + type,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    }
  );
  return res.data;
};