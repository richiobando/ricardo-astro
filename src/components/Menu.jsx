import React, { useState } from 'react';
import Hamburger from './atoms/Hamburger.jsx';
import s from '../styles/components/Navbar.module.scss';

export default function Navbar({ sections }) {
  const [navbar, setNavbar] = useState(false);
  const handleClickNavMenu = () => setNavbar(!navbar);
  return (
    <ul className={!navbar ? s.hidden : ''}>
      {sections.map((section) => (
        <li className='text' key={section.name}>
          <a
            href={`${section.link}`}
            onClick={handleClickNavMenu}
            target={section.external ? 'blank' : ''}
          >
            {section.name}
          </a>
        </li>
      ))}
      <Hamburger handleClickNavMenu={handleClickNavMenu} navbar={navbar} />
    </ul>
  );
}
