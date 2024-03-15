import {useState} from 'react'
import { Card } from 'antd'
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
  let rooms = []
  let players =[]

  const onTab2Change = (key) => {
    setActiveTabKey(key);
  }

  const contentListNoTitle = {
    jeuxDispo: <RoomList rooms={rooms} />,
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