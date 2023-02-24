import React from "react";
import "./header.scss";
import { Link } from "react-router-dom";
// import "/js/bootstrap.bundle.min";
// import "/css/bootstrap.min.css";

const Header = () => {
  return (
    <div>
      {/* <!-- Navigation --> */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark static-top">
        <div className="container">
          <a className="navbar-brand" href="#">
            <img src="/images/logo192.svg" alt="..." height="36" />
          </a>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link
                  className="listItem active"
                  aria-current="page"
                  to="/"
                  style={{ textDecoration: "none" }}
                >
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="listItem"
                  to="/price"
                  style={{ textDecoration: "none" }}
                >
                  Price
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="listItem "
                  to="/help"
                  style={{ textDecoration: "none" }}
                >
                  Help
                </Link>
              </li>

              <button className="btn loginButton">Login</button>
              {/* <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
