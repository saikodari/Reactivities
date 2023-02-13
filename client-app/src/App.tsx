import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { Header, List } from 'semantic-ui-react';
import ListItem from 'semantic-ui-react/dist/commonjs/elements/List/ListItem';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';


function App() {
  const [activities,setActivities] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then(response =>{    
      setActivities(response.data);
    })
  },[])
  return (
    <div>
      <Header as='h2' icon='users' content='Reactivities' />      
      <List>
        {activities.map((activity:any)=>(
          <ListItem key={activity.id}>
            {activity.title}
          </ListItem>
        ))}
      </List>    
    </div>
  );
}

export default App;
