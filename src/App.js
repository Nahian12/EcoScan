//import {Button, Typography, Card, CardContent } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';



import './App.css';
import MyNavbar from './Components/Layout/MyNavbar';
import MyComponent from './Components/Pages/LitterMap';
import StaffList from './Components/Pages/StaffList';

function App() {
  return (
    <div>
        <MyNavbar />
        {/* <MyComponent />  Litter Map */}
        <StaffList />
    </div>

    
  );
}

export default App;
