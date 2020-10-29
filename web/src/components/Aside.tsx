import React from 'react';

import '../styles/components/aside.css';
import AsideLogo from '../images/aside-logo.svg';

export default function Aside() {
  return (
    <aside>
      <img src={AsideLogo} alt="Ícone Happy" />

      <div>
        <h1>Pariquera-Açu</h1>
        <h2>São Paulo</h2>
      </div>
    </aside>
  );
}
