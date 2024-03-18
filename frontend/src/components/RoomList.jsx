import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';


const RoomList = ({ rooms }) => {

  return (
    <List
      itemLayout="horizontal"
      dataSource={rooms}
      renderItem={room => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar icon={<UserOutlined />} />}
            title={room.name}
            description={`${room.players.length} joueurs`}
          />
        </List.Item>
      )}
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