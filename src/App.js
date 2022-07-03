import './App.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner } from '@fortawesome/free-solid-svg-icons';
import {maps} from './data/maps';
import {gamemodes} from './data/gamemodes';
import styled from 'styled-components';
import Communities from './Components/Community';

const StyledTable = styled.table`
  tr:nth-child(odd) {
    background: #ccc;
  }

  .password svg {
    padding: 10px;
  }

  .communities {
    text-align: center;
  }
`;

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-size: 20px;
  svg {
    animation: spin 1s linear infinite;
    margin-bottom: 10px;
  }
  @keyframes spin {
      from {transform: rotate(0deg)}
      to {transform: rotate(360deg)}
    }
`;


function App() {
  const [servers, setServers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://northstar.tf/client/servers')
      let json = await result.json();
      setServers(json)
    }
    setInterval(() => {
      fetchData()
    }, 1000*30)
    fetchData()
  },[])

  const checkPassword = (e, password) => {
    if (password) {
      e.preventDefault()
      alert("hi")
    }
  }

  return (
    <div className="App">

      {servers.length <= 0 &&
      <Spinner>
        {console.log("here")}
        <FontAwesomeIcon size="2x" icon={faSpinner} />
        fetching servers...
      </Spinner>
      }
      
      {servers && servers.length > 0 && <StyledTable>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Description</th>
            <th>Players</th>
            <th>Map</th>
            <th>Gamemode</th>
            <th>Community</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          {servers.map((server,index)=>
          <tr key={index}>
            <td className='password'>{server.hasPassword && <FontAwesomeIcon icon={faLock} />}</td>
            <td className='server'>{server.name}</td>
            <td className='description'>{server.description}</td> 
            <td className='players'>{server.playerCount}/{server.maxPlayers}</td> 
            <td className='map'>{maps[server.map] ?? server.map}</td> 
            <td className='mode'>{gamemodes[server.playlist]?? server.playlist}</td>
            <td className='communities'><Communities desc={server.description} /></td>
            <td className='join'>
              <a 
                href={`northstar://server@${server.id}`}
                onClick={(e) => checkPassword(e,server.hasPassword)}
              >Join</a>
            </td>

          </tr>
          )}
        </tbody>
      </StyledTable>}
      
    </div>
  );
}

export default App;