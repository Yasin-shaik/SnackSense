import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
//import woman from "../Assets/images/woman.jpg";

export default function SnackSense() {
  return (
    <div className="bg-cover d-flex flex-column align-items-center justify-content-center mt-50">
      <main className="container text-center py-5 overlay-content">
        {/* Welcome Section */}
        <section className="text-white mb-5 welcome-section">
          <h1 className="display-4 fw-bold">Welcome, John! Let's make healthier snack choices today!</h1>
          <p className="lead">Your health insights, diet plans, and barcode scanner are just a tap away</p>
          <div className="bg-white rounded mx-auto w-100 max-w-3xl h-48"></div>
        </section>

        {/* Scan Box - Centered */}
        <section className="scan-box mx-auto p-4 border rounded shadow-lg d-flex flex-column align-items-center">
          <h2 className="h4 fw-bold">Ready to Scan Your Snack?</h2>
          <p>Discover the health impact of any snack with just one scan!</p>
          <div className="scan-button-container mt-3">
            <button className="btn btn-warning btn-lg fw-bold">Scan a Barcode</button>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center mt-5 cta-section text-white py-4 rounded">
  <h2 className="h4 fw-bold">Make Every Bite Count!</h2>
  <p>Keep scanning and learning about your food choices. The more you scan, the smarter our recommendations get!</p>
  <div className="d-flex justify-content-center gap-3 mt-3">
    <button className="btn btn-light fw-bold">Scan More Snacks</button>
    {/* <button className="btn btn-light fw-bold">Explore Healthier Alternatives</button> */}
  </div>
</section>

      </main>
    </div>
  );
}
