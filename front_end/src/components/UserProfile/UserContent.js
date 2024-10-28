import React from 'react';
import UserAccount from './UserAccount';
import UserChats from './UserChats';
import UserRatings from './UserRatings';

const UserContent = ({ activeMenuItem }) => {
  return (
    <div>
      {activeMenuItem === 'Profile' && <UserAccount/>}
      {activeMenuItem === 'Chats' && <UserChats />}
      {activeMenuItem === 'Ratings' && <UserRatings />}
    </div>
  );
};

export default UserContent;
