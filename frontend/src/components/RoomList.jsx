import React from 'react';
import { List, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

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


export default RoomList;