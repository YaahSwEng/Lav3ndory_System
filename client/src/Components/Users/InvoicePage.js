import { useLocation } from "react-router-dom";

import "../data/invoice.css";

const InvoicePage = () => {

  // Receive data from RequestTool page

  const location = useLocation();

  const {

    fullname,

    phone,

    requestType,

    selectedTool,

    notes,

  } = location.state || {};

  // If no data exists

  if (!selectedTool) {

    return <h2>No invoice data found</h2>;

  }

  return (
<div className="invoice-page">
<div className="invoice-card">
<h1 className="invoice-title">

          Thank You {fullname}!
</h1>
<p className="invoice-subtitle">

          Your request has been submitted successfully.
</p>
<div className="invoice-tool">
<img

            src={`http://localhost:3001/uploads/${selectedTool.image}`}

            alt={selectedTool.toolname}

            className="invoice-tool-image"

          />
<div>
<h2>{selectedTool.toolname}</h2>
<p>{selectedTool.description}</p>
</div>
</div>
<div className="invoice-details">
<div className="invoice-row">
<span>Customer Name:</span>
<strong>{fullname}</strong>
</div>
<div className="invoice-row">
<span>Phone Number:</span>
<strong>{phone}</strong>
</div>
<div className="invoice-row">
<span>Request Type:</span>
<strong>{requestType}</strong>
</div>
<div className="invoice-row">
<span>Price:</span>
<strong>{selectedTool.price} OMR</strong>
</div>
<div className="invoice-row">
<span>Notes:</span>
<strong>{notes || "No notes"}</strong>
</div>
</div>
</div>
</div>

  );

};

export default InvoicePage;
 