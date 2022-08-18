import React, { useState } from 'react';
import Navbar from './Navbar';
import SideBar from './SideBar';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setMobileOpen(!mobileOpen);
  };
  const handleDrawerClose = () => {
    setMobileOpen(false);
  };

  return (
    <div>
      <Navbar handleDrawerOpen={handleDrawerOpen} />
      <SideBar
        mobileOpen={mobileOpen}
        handleDrawerOpen={handleDrawerOpen}
        handleDrawerClose={handleDrawerClose}
      />
    </div>
  );
}
