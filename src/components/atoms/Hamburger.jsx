import React from 'react';
import HamburgerMenu from '../../../public/hamburger-menu-2.svg';
import Close from '../../../public/close-round.svg';
import s from '../../styles/components/Hamburger.module.scss';
export default function hamburger({ handleClickNavMenu, navbar }) {
  return (
    <div className={s.container}>
      <button onClick={handleClickNavMenu}>
        {navbar ? (
          <img src={Close} alt='open the menu' width={30} />
        ) : (
          <img src={HamburgerMenu} alt='open the menu' width={30} />
        )}
      </button>
    </div>
  );
}
