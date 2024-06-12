import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import Layout from '../Layout/Layout';
import { Modal, Button, ListGroup, Form } from 'react-bootstrap';
import supabase from '../../supabase';
import { readLitterData } from './ReadLitterData';

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

  const [map, setMap] = React.useState(null);
  const [litterData, setLitterData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [staff, setStaff] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState('');

  useEffect(() => {
    const fetchLitterData = async () => {
      const data = await readLitterData();
      setLitterData(data);
    };

    fetchLitterData();
  }, []);

  useEffect(() => {
    console.log(litterData); //console.log to log updated litterData
  }, [litterData]);

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  const handleMarkerClick = (litter) => {
    setSelected(litter);
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
      console.log(staff)
    }
  };

  const handleCloseModal = () => setShowModal(false);

  const handleStaffChange = (e) => {
    console.log(e.target.value)
    setSelectedStaff(e.target.value);
  };

  const handleAssign = async () => {
    if (selected) {
      console.log(selected + "hi")
      const { data, error } = await supabase
        .from('litter')
        .update({ assigned_staff: selectedStaff })
        .eq('id', selected.id)
        .select();
//Ekhane 0 diya, thik kora lagbe
      if (error) {
        console.error('Error assigning staff:', error);
      } else {
        console.log(`Assigned ${selectedStaff} to location ${selected.latitude}, ${selected.longitude}`);
        setSelected({ ...selected, assigned_staff: selectedStaff });
        handleCloseModal();
      }
    }
  };

  useEffect(() => {
    if (selected && selected.assigned_staff) {
        setSelectedStaff(selected.assigned_staff);
    } else {
        setSelectedStaff('');
    }
  }, [selected]);

  return isLoaded ? (
    <Layout>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={17}
        onLoad={onLoad}
        onUnmount={onUnmount}
      >
        {litterData.map((litter) => (
          <Marker
            key={litter.id}
            position={{ lat: litter.latitude, lng: litter.longitude }}
            onClick={() => handleMarkerClick(litter)}
          />
        ))}
        {selected && (
          <InfoWindow
            position={{ lat: selected.latitude, lng: selected.longitude }}
            onCloseClick={handleInfoWindowClose}
          >
            <div>
              <h4>Details</h4>
              {selected.litter.split(',').map((item, index) => (
                <p key={index}>{item.trim()}</p>
              ))}
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