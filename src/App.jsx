import './App.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faSpinner, faPlay, faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import {maps} from './data/maps';
import {gamemodes} from './data/gamemodes';
import styled from 'styled-components';
import Communities from './Components/Community';
import {
  GetSortOrder,
  checkPassword,
  description,
  filterServers,
  discordUser,
} from './lib/funcs'

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

const Row = styled.tr`
  cursor: pointer;
  ${props => props.active?"height: 100px":""}
`;

function App() {
  const [servers, setServers] = useState([]);
  const [active, setActive] = useState("");
  const [filter, setFilter] = useState("");
  const [filterDirection, setFilterDirection] = useState("asc");

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
  },[filter])

  const updateFilters = (filterName) => {
    if (filter === filterName ) {
      if (filterDirection === "asc"){
        setFilter(filterName);
        setFilterDirection("dec");
      }
      else {
        setFilter("");
        setFilterDirection("asc");
      }
    }
    else {
      setFilter(filterName);
    }
  }

  const makeActive = (index) => {
    if (active === index) {
      setActive("");
    }
    else {
      setActive(index)
    }
  };

  const filterIcon = (name) => {
    if (filter===name) {
      let icon = filterDirection==="asc"?
      <FontAwesomeIcon icon={faArrowDown} />
      :<FontAwesomeIcon icon={faArrowUp} />
      return icon;
    }
  };

  return (
    <div className="App">

      {servers.length <= 0 &&
      <Spinner>
        <FontAwesomeIcon size="2x" icon={faSpinner} />
        fetching servers...
      </Spinner>
      }
      
      {servers && servers.length > 0 && <StyledTable>
        <thead>
          <tr>
            <th onClick={() => updateFilters("hasPassword")}> {filterIcon("hasPassword")}</th>
            <th onClick={() => updateFilters("name")}>Name {filterIcon("name")}</th>
            <th>User</th>
            <th onClick={() => updateFilters("description")}>Description {filterIcon("description")}</th>
            <th onClick={() => updateFilters("playerCount")}>Players {filterIcon("playerCount")}</th>
            <th onClick={() => updateFilters("map")}>Map {filterIcon("map")}</th>
            <th onClick={() => updateFilters("playlist")}>Gamemode {filterIcon("playlist")}</th>
            <th>Community</th>
            <th>Join</th>
          </tr>
        </thead>
        <tbody>
          {(filterServers(filter, filterDirection, servers)).map((server,index)=> {
            let isActive = (active === index);
            return (
              <Row active={isActive} key={index} onClick={() => makeActive(index)}>
                <td className='password'>{server.hasPassword && <FontAwesomeIcon icon={faLock} />}</td>
                <td className='server'>{server.name}</td>
                <td className='user'>{discordUser(server.description)}</td>
                <td className='description'>{description(server.description, isActive)}</td> 
                <td className='players'>{server.playerCount}/{server.maxPlayers}</td> 
                <td className='map'>{maps[server.map] ?? server.map}</td> 
                <td className='mode'>{gamemodes[server.playlist]?? server.playlist}</td>
                <td className='communities'><Communities desc={server.description} /></td>
                <td className='join'>
                  <a 
                    href={`northstar://server@${server.id}`}
                    onClick={(e) => checkPassword(e,server.hasPassword)}
                  ><FontAwesomeIcon icon={faPlay} /></a>
                </td>

              </Row>
            );
          }
          )}
        </tbody>
      </StyledTable>}
      
    </div>
  );
}

export default App;