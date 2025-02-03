import React from 'react'
import '../Assets/CSS/Home.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {Link} from "react-router-dom";
export default function Home() {
  return (
    <div className="bg-cover d-flex flex-column align-items-center justify-content-center mt-10">
      <main className="container text-center py-1 overlay-content">
        {/* Welcome Section */}
        <section className="text-white mb-2 welcome-section ">
          <h1 className="display-4 fw-bold">Welcome! Let's make healthier snack choices!</h1>
          <p className="lead">Your health insights, diet plans, and barcode scanner are just a tap away</p>
          <div className="bg-white rounded mx-auto w-100 max-w-3xl h-48"></div>
        </section>

        {/* Scan Box - Centered */}
        <section className="scan-box mx-auto p-4 border rounded shadow-lg d-flex flex-column align-items-center">
          <h2 className="h4 fw-bold">Ready to Scan Your Snack?</h2>
          <p>Discover the health impact of any snack with just one scan!</p>
          <div className="scan-button-container mt-3">
            <Link to="/scanQR"><button className="btn btn-warning btn-lg fw-bold">Scan a Barcode</button></Link>
          </div>
        </section>

      </main>
    </div>
  )
}
