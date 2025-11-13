
import "../css/pricing.css";
import React from "react";
import { CheckCircle } from "lucide-react";


const offers = [
  {
    title: 'Landing Page',
    price: '$79',
    features: [
      'Modern and responsive design',
      'Optimized for SEO',
      '1-3 sections included',
      'Delivery in 4 days',
    ],
  },
  {
    title: 'Business Website',
    price: '$149',
    features: [
      '5 to 7 professional pages',
      'Contact form and Google Maps',
      'Basic SEO & Analytics',
      'Delivery in 7 days',
    ],
  },
  {
    title: 'E-Commerce Website',
    price: '$299',
    features: [
      'Up to 20 product listings',
      'Payment integration',
      'Admin dashboard included',
      'Delivery in 14-20 days',
    ],
  },
];

export default function Offers() {
  return (
    <section className="offers-section">
      <h2 className="offers-title">Website Creation Packages</h2>
      <div className="offers-grid">
        {offers.map((offer, index) => (
          <div className="offer-card" key={index}>
            <h3 className="offer-title">{offer.title}</h3>
            <p className="offer-price">{offer.price}</p>
            <ul className="offer-features">
              {offer.features.map((feature, idx) => (
                <li key={idx}>
                  <CheckCircle className="icon" size={18} />
                  {feature}
                </li>
              ))}
            </ul>
            <button className="offer-button">Get Started</button>
          </div>
        ))}
      </div>
    </section>
  );
}