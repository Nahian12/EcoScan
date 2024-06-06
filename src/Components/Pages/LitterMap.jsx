import React, { useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Layout from '../Layout/Layout';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import supabase from '../../supabase';

const containerStyle = {
  width: '100vw',
  height: '92vh'
};

const center = {
  lat: 3.127534,
  lng: 101.650496
};

function MyComponent() {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyBhrHz4b4dw5-HL_rvN2p4wGDCTQQuBql0" //process.env.MY_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMarkerClick = () => {
    setSelected(center);
  };

  const handleInfoWindowClose = () => {
    setSelected(null);
  };

  const handleAssignStaffClick = async () => {
    // Fetch staff from Supabase
    const { data: staff, error } = await supabase
      .from('staff')
      .select('*');

    if (error) {
      console.error('Error fetching staff:', error);
    } else {
      setStaff(staff);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleStaffChange = (e) => {
    setSelectedStaff(e.target.value);
  };

  const handleAssign = () => {
    console.log(`Assigned ${selectedStaff} to location ${center.lat}, ${center.lng}`);
    handleCloseModal();
  };

  return isLoaded ? (
    <Layout>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        <Marker position={center} onClick={handleMarkerClick} />
        {selected && (
          <InfoWindow position={center} onCloseClick={handleInfoWindowClose}>
            <div>
              <h4>Details</h4>
              <p>2 x Plastic Bottles</p>
              <p>5 x Cigarette Buds</p>
              <p>4 x Aluminum Cans</p>
              <button onClick={handleAssignStaffClick}>Assign Staff</button>
            </div>
          </InfoWindow>
        )}
        { /* Child components, such as markers, info windows, etc. */ }
        <></>
      </GoogleMap>

      <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Staff</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Select Staff</Form.Label>
            <Form.Select value={selectedStaff} onChange={handleStaffChange}>
              <option value="">Select a staff member</option>
              {staff.map((member) => (
                <option key={member.id} value={member.text}>
                  {member.text}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleAssign} disabled={!selectedStaff}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>

    </Layout>
  ) : <></>
}

export default React.memo(MyComponent)