import { useState } from 'react';
import { List, Avatar, Button, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import ModalGameAvailable from './ModalGameAvailable';


const RoomList = ({ rooms }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleJoin = (room) => {
    // Add code here to handle joining the room
    console.log(`Joining room ${room.name}`);
    setOpen(true);
    setLoading(true);
    
    
    // Add code here to handle joining the room
    /* joinRoom(room).then(() => {
      setLoading(false);
    }); */
  }

  const renderItem = (room) => {
    //console.log("room", room)
    return (
      <List.Item>
        <List.Item.Meta
          avatar={<Avatar icon={<UserOutlined />} />}
          title={room.name}
          description={`Créateur : ${room.creatorName} `}
        />
        <Button onClick={() => handleJoin(room)}>
          Rejoindre &nbsp; {loading && <Spin size="small" />}
        </Button>
        <ModalGameAvailable open={open} setOpen={setOpen} />
      </List.Item>
    )
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={rooms}
      renderItem={renderItem}
    />
  );
};


RoomList.propTypes = {
  rooms: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      numCards: PropTypes.number.isRequired,
      creatorName: PropTypes.string.isRequired,
      roomId: PropTypes.number.isRequired,
      players: PropTypes.arrayOf(PropTypes.object).isRequired,
      lastCards: PropTypes.string,
    })
  ).isRequired,
};

export default RoomList;