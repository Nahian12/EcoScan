//import {Button, Typography, Card, CardContent } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';



import './App.css';
import MyNavbar from './Components/Layout/MyNavbar';
import MyComponent from './Components/Pages/LitterMap';
import LitterList from './Components/Pages/LitterList';

function App() {
  return (
    <div>
        <MyNavbar />
        {/* <MyComponent />  Litter Map */}
        <LitterList />
    </div>

    
  );
}

export default App;
