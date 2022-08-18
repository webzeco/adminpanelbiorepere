import React from 'react';
import { Link } from 'react-router-dom';
import './styles/welcome.css';

export default function Intro() {
  return (
    <div>
      <nav class="navbar bg-nav">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="/images/logo.png"
              alt="logo here "
              height="110"
              class="d-inline-block align-text-top"
            />
          </a>

          <Link
            class="btn login-btn px-3"
            rel="stylesheet"
            to="/login"
            title="Sign In"
          >
            Login
          </Link>
        </div>
      </nav>
      <div class="container-fluid  main-banner pb-5 mb-5">
        <div class="row">
          <div class="col-lg-7 col-md-12 pt-5">
            <div class="content text-start px-5">
              <h1 class="text-white">
                All them products and services organic
              </h1>
              <h4>All them products and services organic</h4>
            </div>
            <div id="Download">
              <h1 class="py-5 text-center">Download Our App</h1>
              <div class=" d-flex justify-content-center gap-5  boxes_div">
                <div class="box1">
                  <img
                    src="/images/android.png"
                    height="30px"
                    width="30px"
                  />
                  <a href="#"> Android</a>
                </div>
                <div class="box2">
                  <img
                    src="/images/apple-logo.png"
                    height="30px"
                    width="30px"
                  />
                  <a href="#"> iPhone</a>
                </div>
              </div>
            </div>
          </div>
          <div class="col-lg-8">
            <img
              class="leaf"
              src="/images/leaf.png"
              alt="leaf here "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
