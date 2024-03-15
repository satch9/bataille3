import React, {useState} from 'react'
import { Card } from 'antd'
import RoomList from './RoomList'

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
  const [activeTabKey2, setActiveTabKey2] = useState('jeuxDispo');
  let rooms = []

  const onTab2Change = (key) => {
    setActiveTabKey2(key);
  }

  const contentListNoTitle = {
    jeuxDispo: <RoomList rooms={rooms} />,
    creerJeux: <p>app content</p>,
    tableauScore: <p>project content</p>,
  };

  return (
    <>
      <Card
        style={{ width: '100%', marginTop: '20px' }}
        tabList={tabListNoTitle}
        activeTabKey={activeTabKey2}
        onTabChange={onTab2Change}
        tabProps={{
          size: 'middle',
        }}
      >
        {contentListNoTitle[activeTabKey2]}
      </Card>

    </>
  )
}

export default Parametres