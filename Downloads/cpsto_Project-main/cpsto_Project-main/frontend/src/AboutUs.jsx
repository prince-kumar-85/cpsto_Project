import React from "react";
import "./aboutus.css";

export default function AboutUs() {
  return (
    <div className="about-us-wrapper">
      <div className="main-header">
        <h1>About HydroTrim</h1>
        <p className="subtitle">
          An innovative, affordable digital platform designed to fight
          water-borne diseases.
        </p>
      </div>

      <div className="about-section">
        <p>
          <strong>HydroTrim</strong> is an innovative, affordable digital platform designed to fight
          water-borne diseases in rural and semi-urban communities. Our mission is to equip health
          workers with simple yet powerful mobile and web applications—accessible even offline—to
          ensure rapid case reporting, timely detection, and immediate intervention.
        </p>
        <p>
          With the support of smart analytics, HydroTrim not only tracks and flags potential outbreaks,
          but also delivers instant alerts and intuitive hotspot visualizations, empowering
          communities and authorities to respond faster and smarter.
        </p>
        <p>
          Our ultimate goal is clear: reduce the spread of water-borne diseases, save lives,
          and build resilient, healthier communities through real-time, technology-driven health monitoring.
        </p>
      </div>

      <div className="about-section">
        <h2>Why HydroTrim?</h2>
        <p>
          Water-borne diseases remain one of the most persistent threats to vulnerable populations.
          Traditional systems often fail due to delayed reporting, poor connectivity, and limited resources.
        </p>
        <p>
          HydroTrim bridges this gap by combining <strong>technology, data, and local knowledge</strong>
          into one accessible platform. By making disease tracking more efficient, we turn prevention
          into a powerful tool for healthier living.
        </p>
        <p>
          Because we believe: <em>prevention is better than cure, and informed communities are stronger communities.</em>
        </p>
      </div>

      <div className="about-section">
        <h2>Our Approach</h2>
        <p>
          HydroTrim places communities at the heart of the solution. Health workers and volunteers
          can quickly log cases, monitor trends, and share insights, enabling faster interventions
          and coordinated action.
        </p>
        <p>
          Automated analytics detect hidden patterns in data, flagging potential outbreaks before
          they escalate, while instant notifications ensure communities and authorities are kept
          in the loop at all times.
        </p>
        <p>
          Built for low-resource settings, HydroTrim is lightweight, works on low-end devices,
          and remains functional even without internet connectivity.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Vision</h2>
        <p>
          To create a future where water-borne diseases are no longer a threat to vulnerable communities.
          HydroTrim envisions healthier populations, stronger health systems, and resilient communities
          empowered by technology, data, and collaboration.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Impact</h2>
        <p>
          HydroTrim is already transforming community health by enabling rapid case reporting,
          delivering actionable insights, empowering local health workers, and strengthening the
          entire disease surveillance ecosystem. The result: quicker responses, fewer outbreaks,
          and healthier lives.
        </p>
      </div>

      <div className="about-section">
        <h2>Our Team</h2>
        <p>
          Our dedicated team is made up of public health professionals, software developers,
          and community engagement specialists. Together with local health authorities, we
          design practical, scalable, and impactful solutions that bring real change.
        </p>
      </div>

      <div className="about-section">
        <h2>Partnerships & Support</h2>
        <p>
          HydroTrim collaborates with NGOs, government bodies, and healthcare organizations
          to expand its reach and maximize impact. Through these partnerships, health workers
          gain access to resources, training, and real-time support when it matters most.
        </p>
      </div>

      <div className="about-section">
        <h2>Future Plans</h2>
        <p>
          Looking forward, HydroTrim aims to expand its footprint to more rural and semi-urban
          communities, introduce advanced <strong>predictive outbreak modeling</strong>, support
          multiple languages for inclusivity, and integrate a broader range of community health
          services into the platform.
        </p>
      </div>
    </div>
  );
}
