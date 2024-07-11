import React from 'react';
import '../Style/AdminDashboard.css'; // Ensure this path is correct

function AdminDashboard() {
  const formData = JSON.parse(localStorage.getItem('formData')) || [];

  return (
    <div className="admin-dashboard">
      <h2 style={{ textAlign: 'center' }}>Admin Page</h2>
      {formData.length ? (
        <div className="table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Product Description</th>
                <th>Variants</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, index) => (
                <tr key={index}>
                  <td>{data.productName}</td>
                  <td>{data.productDescription}</td>
                  <td className="variants-column">
                    {data.variants.map((variant, vIndex) => (
                      <div key={vIndex} className="variant-item">
                        <span className="variant-name">{variant.variantName}</span>: {variant.variantAmount}
                      </div>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="no-data-msg">No data available</p>
      )}
    </div>
  );
}

export default AdminDashboard;

