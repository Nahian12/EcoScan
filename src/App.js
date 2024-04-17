import {Button, Typography, Card, CardContent } from '@mui/material';

import './App.css';

function App() {
  return (
    <div >
      <Button variant="text">Text</Button>
      <Button variant="contained">Contained</Button>
      <Button variant="outlined">Outlined</Button>

      <div className="about-container">
            <div className="about-content">
                
                <div className="about-p1">
                    <Typography variant="h5" className="about-heading" style={{ marginTop: '10px' }}>
                        HI
                    </Typography>
                </div>
                <div className="card-container">
                    {/* Card 1 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300, boxShadow: '5px 5px 5px 2px rgba(128, 128, 128, 0.5)' }}>
                        {/* <CardHeader /> */}
                    </Card>

                    {/* Card 2 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300, boxShadow: '5px 5px 5px 2px rgba(128, 128, 128, 0.5)', }} >
                    </Card>

                    {/* Card 3 */}
                    <Card className="about-card" style={{ backgroundColor: '#27592d', width: 300,  boxShadow: '5px 5px 5px 2px rgba(128, 128, 128, 0.5)' }}>
                        {/* <CardHeader /> */}
                        
                    </Card>
                </div>
            </div>
        </div>
    </div>

    
  );
}

export default App;
