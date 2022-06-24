import './App.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import {maps} from './data/maps';
import {gamemodes} from './data/gamemodes';


function App() {
  const [servers, setServers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://northstar.tf/client/servers')
      let json = await result.json();
      setServers(json)
    }
    fetchData()
  },[])

  return (
    <div className="App">
      
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Players</th>
            <th>Map</th>
            <th>Gamemode</th>
          </tr>
        </thead>
        <tbody>
          {servers.length > 0 && servers.map((server,index)=>
          <tr key={index}>
            <td>{server.hasPassword && <FontAwesomeIcon icon={faLock} />}</td>
            <td>{server.name}</td>
            <td>{server.description}</td> 
            <td>{server.playerCount}/{server.maxPlayers}</td> 
            <td>{maps[server.map] ?? server.map}</td> 
            <td>{gamemodes[server.playlist]?? server.playlist}</td> 
          </tr>
          )}
        </tbody>
      </table>
        
      
    </div>
  );
}

export default App;