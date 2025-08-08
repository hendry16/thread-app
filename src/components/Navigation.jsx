import PropTypes from 'prop-types';
import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { MdLeaderboard } from 'react-icons/md';
import IconNavItem from './IconNavItem';

function Navigation({ logout }) {
  return (
    <nav>
      <ul className="flex items-center justify-between gap-4">
        <li>
          <IconNavItem to="/leaderboards" label="Leaderboard" icon={MdLeaderboard} />
        </li>
        <li>
          <IconNavItem onClick={logout} label="Logout" icon={FaSignOutAlt} />
        </li>
      </ul>
    </nav>
  );
}

Navigation.propTypes = {
  logout: PropTypes.func,
};

Navigation.defaultProps = {
  logout: () => {},
};

export default Navigation;
