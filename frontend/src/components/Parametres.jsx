import { useState, useContext, useEffect } from 'react'
import { Card } from 'antd'
import { SocketContext } from '../context/SocketContext';

import RoomList from './RoomList'
import CreateRoom from './CreateRoom';
import ScoreBoard from './ScoreBoard';

const tabListNoTitle = [
  {
    key: 'jeuxDispo',
    label: 'Jeux disponibles',
  },
  {
    key: 'creerJeux',
    label: 'Créer',
  },
  {
    key: 'tableauScore',
    label: 'Tableau des scores',
  },
];



const Parametres = () => {
  const [activeTabKey, setActiveTabKey] = useState('jeuxDispo');
  const socket = useContext(SocketContext)
  const [roomList, setRoomList] = useState([])
  //const [scoreBoard, setScoreBoard] = useState({})
  
  // On récupère la  liste des salles de jeux à partir du serveur.
  useEffect(() => {
    socket.on("rooms available", (data)=>{
      console.log("received data : ", data)
      setRoomList(data)
    })
      
    return (()=>{socket.off("rooms available")}) //clean up when component is unmounted
  }, [socket])

  let players = []

  const onTab2Change = (key) => {
    setActiveTabKey(key);
  }

  

  const contentListNoTitle = {
    jeuxDispo: <RoomList rooms={roomList} />,
    creerJeux: <CreateRoom />,
    tableauScore: <ScoreBoard players={players} />, // TODO : pass the list of player to this component.
  };

  return (
    <>
      <Card
        style={{ width: '100%', marginTop: '20px' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey]}
      </Card>

    </>
  )
}

export default Parametres