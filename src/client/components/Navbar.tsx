import * as React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FunctionComponent = (props) => {
  return (
    <nav className="navbar ">
      <div className="navbar-brand">
        <a className="navbar-item" href="http://bulma.io">
          <img
            src="http://bulma.io/images/bulma-logo.png"
            alt="Bulma: a modern CSS framework based on Flexbox"
            width="112"
            height="28"
          />
        </a>

        <a
          className="navbar-item is-hidden-desktop"
          href="https://github.com/jgthms/bulma"
          target="_blank"
        >
          <span className="icon">
            <i className="fa fa-github"></i>
          </span>
        </a>

        <a
          className="navbar-item is-hidden-desktop"
          href="https://twitter.com/jgthms"
          target="_blank"
        >
          <span className="icon">
            <i className="fa fa-twitter"></i>
          </span>
        </a>

        <div className="navbar-burger burger" data-target="navMenubd-example">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenubd-example" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">
            Dashboard
          </Link>

          <Link to="/import" className="navbar-item">
            Import
          </Link>

          <div className="navbar-item has-dropdown is-hoverable">
            <a
              className="navbar-link  is-active"
              href="/documentation/overview/start/"
            >
              Docs
            </a>
            <div className="navbar-dropdown ">
              <a className="navbar-item " href="/documentation/overview/start/">
                Overview
              </a>

              <a
                className="navbar-item is-active"
                href="http://bulma.io/documentation/components/breadcrumb/"
              >
                Components
              </a>

              <hr className="navbar-divider" />
              <div className="navbar-item">
                <div>
                  <p className="is-size-6-desktop">
                    <strong className="has-text-info">0.5.1</strong>
                  </p>

                  <small>
                    <a className="bd-view-all-versions" href="/versions">
                      View all versions
                    </a>
                  </small>
                </div>
              </div>
            </div>
          </div>
          <div className="navbar-item has-dropdown is-hoverable is-mega">
            <div className="navbar-link flex">
              Blog 
            </div>
            <div id="blogDropdown" className="navbar-dropdown">
              <div className="container is-fluid">
                <div className="columns">
                  <div className="column">
                    <h1 className="title is-6 is-mega-menu-title">
                      Sub Menu Title
                    </h1>
                    <a className="navbar-item" href="/2017/08/03/list-of-tags/">
                      <div className="navbar-content">
                        <p>
                          <small className="has-text-info">03 Aug 2017</small>
                        </p>
                        <p>New feature: list of tags</p>
                      </div>
                    </a>
                    <a className="navbar-item" href="/2017/08/03/list-of-tags/">
                      <div className="navbar-content">
                        <p>
                          <small className="has-text-info">03 Aug 2017</small>
                        </p>
                        <p>New feature: list of tags</p>
                      </div>
                    </a>
                    <a className="navbar-item" href="/2017/08/03/list-of-tags/">
                      <div className="navbar-content">
                        <p>
                          <small className="has-text-info">03 Aug 2017</small>
                        </p>
                        <p>New feature: list of tags</p>
                      </div>
                    </a>
                  </div>
                  <div className="column">
                    <h1 className="title is-6 is-mega-menu-title">
                      Sub Menu Title
                    </h1>

                    <a
                      className="navbar-item "
                      href="http://bulma.io/documentation/columns/basics/"
                    >
                      Columns
                    </a>
                  </div>
                  <div className="column">
                    <h1 className="title is-6 is-mega-menu-title">
                      Sub Menu Title
                    </h1>

                    <a className="navbar-item" href="/2017/08/03/list-of-tags/">
                      <div className="navbar-content">
                        <p>
                          <small className="has-text-info">03 Aug 2017</small>
                        </p>
                        <p>New feature: list of tags</p>
                      </div>
                    </a>
                  </div>
                  <div className="column">
                    <h1 className="title is-6 is-mega-menu-title">
                      Sub Menu Title
                    </h1>
                    <a
                      className="navbar-item "
                      href="/documentation/overview/start/"
                    >
                      Overview
                    </a>
                  </div>
                </div>
              </div>

              <hr className="navbar-divider" />
              <div className="navbar-item">
                <div className="navbar-content">
                  <div className="level is-mobile">
                    <div className="level-left">
                      <div className="level-item">
                        <strong>Stay up to date!</strong>
                      </div>
                    </div>
                    <div className="level-right">
                      <div className="level-item">
                        <a
                          className="button bd-is-rss is-small"
                          href="http://bulma.io/atom.xml"
                        >
                          <span className="icon is-small">
                            <i className="fa fa-rss"></i>
                          </span>
                          <span>Subscribe</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="navbar-end">
          <a
            className="navbar-item is-hidden-desktop-only"
            href="https://github.com/jgthms/bulma"
            target="_blank"
          ></a>
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control"></p>
              <p className="control">Settings</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
