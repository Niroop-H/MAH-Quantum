import { Link } from 'react-router-dom';
import {
  ArrowUpRight,
  Mail,
  MapPin,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer className="site-footer">

      <div className="container footer-main">

        <div className="footer-brand">

          <div className="footer-wordmark">
            MAH <span>QUANTUM</span>
          </div>

          <p>
            Advanced technology, engineering and applied
            research from Bengaluru, India.
          </p>

          <a href="mailto:nirooph@mahquantum.tech">
            <Mail size={15} />
            nirooph@mahquantum.tech
          </a>

          <div className="footer-location">
            <MapPin size={15} />
            Bengaluru Urban, Karnataka, India
          </div>

        </div>


        <div className="footer-column">

          <h4>Company</h4>

          <Link to="/about">
            About
          </Link>

          <Link to="/services">
            Services
          </Link>

          <Link to="/contact">
            Contact
          </Link>

        </div>


        <div className="footer-column">

          <h4>Technology</h4>

          <Link to="/architecture">
            Architecture
          </Link>

          <Link to="/d25">
            D25@1007
          </Link>

          <Link to="/industries">
            Industries
          </Link>

        </div>


        <div className="footer-column">

          <h4>Programs</h4>

          <Link to="/sectors">
            Sectors
          </Link>

          <a
            href="https://research.mahquantum.tech"
            target="_blank"
            rel="noreferrer"
          >
            Research Institute
            <ArrowUpRight size={13} />
          </a>

          <a
            href="https://workspace.mahquantum.tech"
            target="_blank"
            rel="noreferrer"
          >
            Workspace
            <ArrowUpRight size={13} />
          </a>

        </div>

      </div>


      <div className="container footer-bottom">

        <span>
          © {new Date().getFullYear()} MAH Quantum.
          All rights reserved.
        </span>

        <span>
          UEI · P2K2E5T4FE26 · SAM.gov registration active
        </span>

      </div>

    </footer>
  );
}
