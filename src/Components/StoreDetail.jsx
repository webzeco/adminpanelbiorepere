import React, { Component, useEffect, useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { Map } from '@mui/icons-material';
import './styles/storeDetail.css';
import { useHistory } from 'react-router-dom';
const AnyReactComponent = ({ url }) => (
  <div>
    <img
      style={{ width: 30, height: 30 }}
      src={
        'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Map_pin_icon_green.svg/800px-Map_pin_icon_green.svg.png'
      }
    ></img>
  </div>
);

const StoreDetail = (props) => {
  const history = useHistory();
  const mapRef = useRef();
  const [store, setStore] = useState({});
  const defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };
  useEffect(() => {
    if (!props?.location?.state?.store) return history.push('Stores');
    setStore(props.location.state.store);
    mapRef.root?.animateToRegion({
      latitude: props.location.state.store?.latitude,
      longitude: props.location.state.store?.longitude,
      latitudeDelta: 0.0059397161733585335,
      longitudeDelta: 0.005845874547958374,
    });
    console.log('Props:', props.location.state.store);
  }, []);

  return (
    <div className="colors">
      {/* map start */}
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          ref={mapRef}
          bootstrapURLKeys={{
            key: 'AIzaSyACQSC1mkF7szb8M5uf-l1fUzs1gqVC6QU',
          }}
          defaultCenter={{
            lat: store.address?.coordinates?.latitude,
            lng: store.address?.coordinates?.longitude,
          }}
          defaultZoom={defaultProps.zoom}
        >
          <AnyReactComponent
            lat={store.address?.coordinates?.latitude}
            lng={store.address?.coordinates?.longitude}
            // text="My Marker"
            url={store.logo?.url}
          />
        </GoogleMapReact>
      </div>
      {/* store content start */}
      <section id="disc" class="container-fluid colors  my-3">
        <div class="container colors">
          <div class="row">
            <div class=" col-lg-4 col-md-12 ">
              <div class="row border-end fixed">
                <div class=" col-12 d-grid gap-3">
                  <a
                    href="#"
                    class="btn-get-started shadow-lg text-center bg-white rounded"
                  >
                    <img src={store.logo?.url} alt="image" />
                  </a>
                  <h1 class="my-4">{store.title}</h1>
                  <div class="d-grid gap-3 contact_links">
                    <a href="#" class="fw-light text-uppercase">
                      <i
                        class="fa fa-map-marker"
                        aria-hidden="true"
                      ></i>
                      {store.website}
                    </a>
                    {store.location}

                    <a href="" class="fw-light ">
                      <i class="fa fa-phone" aria-hidden="true"></i>
                      {store.phone}
                    </a>
                    <a href="" class="fw-light">
                      <i
                        class="fa fa-envelope-o"
                        aria-hidden="true"
                      ></i>
                      organicstore@gmail.com
                    </a>
                  </div>
                  <hr />
                  <button class="btn btn-find-route my-5">
                    Find a Route
                  </button>
                </div>
              </div>
            </div>

            <div class="col-lg-8 col-md-12 colors">
              <h3 className="title">{store.title}</h3>
              <div class="container mb-5 w-100">
                <h1 class="main_heading mb-4">Discription</h1>
                <p class="my-4">{store.description}</p>
                <h3>
                  Type of store :<span>organi store</span>
                </h3>
                <h3>
                  Network :<a href="">BIOCOOP</a>
                </h3>
                <h1 class="main_heading mt-5">Area</h1>
                <p>
                  200 m<sup>2</sup>
                </p>
                <h1 class="main_heading my-4">Spokes</h1>
                <h3>
                  <li>Organic food</li>
                  <li>Organic Cosmetics</li>
                </h3>
                <h3 class="text-dark">
                  Make-up :<span class="text-dark">Eyes</span>
                </h3>
                <h3 class="text-dark">
                  Shaving & Care for men :
                  <span class="text-dark">
                    Accessories, Lotions, after-shave care, Foams,
                    shaving creams
                  </span>
                </h3>
                <h3 class="text-dark">
                  Hair care :
                  <span class="text-dark">
                    Hair accessories, Conditioner, Coloring, Hair
                    oils, Hair lotions, Detanglers, Hair masks,
                    Rhassoul, powders, Shampoos, Gels, Lice treatment,
                    nits
                  </span>
                </h3>
                <h3 class="text-dark">
                  Body care :
                  <span class="text-dark">
                    Scrubs , Body oils , Body milks , Silhouette,
                    Slimming , Hand and nail care , Foot care , Body
                    care creams , Body gels
                  </span>
                </h3>
                <h3 class="text-dark">
                  Face care :
                  <span class="text-dark">
                    Anti-ageing, anti-wrinkles, Eye contour creams,
                    Night creams, Moisturizing/nourishing creams,
                    Make-up removers, Scrubs, Oils, Masks, Cleansers,
                    Oily skin, Combination skin, Normal skin, Serums,
                    lotions, Lip care, Skin care face :others , Day
                    creams , Dry and sensitive skin , Accessories ,
                    Face creams: others
                  </span>
                </h3>
                <h3 class="text-dark">
                  Sun care :
                  <span class="text-dark">
                    After-sun, Sun creams, Sun oils
                  </span>
                </h3>
                <h3 class="text-dark">
                  Soaps :
                  <span class="text-dark">
                    Aleppo soaps, Marseille soaps, Liquid soaps, Solid
                    soaps, Hand soaps
                  </span>
                </h3>
                <h3>
                  <li>Health, Well-being</li>
                  <li>Habitat</li>
                  <li>Pet Shop</li>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StoreDetail;
