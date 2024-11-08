'use client';

import {
  Bars3Icon,
  CalendarDaysIcon,
  HomeIcon,
  MapIcon,
  TruckIcon,
  ArrowRightStartOnRectangleIcon,
  CalendarIcon,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import MenuItem from '@/app/ui/menu-item';
import { logout } from '@/app/login/actions';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="drawer lg:drawer-open">
      <input id="navmenu-drawer" type="checkbox" className="drawer-toggle" checked={menuOpen} readOnly />
      <div className="drawer-content flex flex-col">
        <div className="navbar bg-base-100 lg:hidden">
          <button className="btn btn-ghost drawer-button" onClick={() => setMenuOpen(true)}>
            <Bars3Icon className="w-6" />
          </button>
          <div>Plan your Adventures</div>
        </div>
        <div className="p-3">{children}</div>
      </div>
      <div className="drawer-side">
        <label aria-label="close sidebar" className="drawer-overlay" onClick={() => setMenuOpen(false)}></label>
        <div className="menu bg-base-300 text-base-content min-h-full w-60 py-4 gap-1">
          <div className="flex-grow">
            <MenuItem href="/adventure" full onClick={() => setMenuOpen(false)} icon={HomeIcon}>
              Home
            </MenuItem>
            <MenuItem href="/adventure/events" onClick={() => setMenuOpen(false)} icon={CalendarIcon}>
              Trips &amp; Events
            </MenuItem>
            <MenuItem href="/adventure/places" onClick={() => setMenuOpen(false)} icon={MapIcon}>
              Places
            </MenuItem>
            <MenuItem href="/adventure/equipment" onClick={() => setMenuOpen(false)} icon={TruckIcon}>
              Equipment
            </MenuItem>
            <MenuItem href="/adventure/reservations" onClick={() => setMenuOpen(false)} icon={CalendarDaysIcon}>
              Reservations
            </MenuItem>
            <MenuItem href="/adventure/todos" onClick={() => setMenuOpen(false)} icon={ClipboardDocumentCheckIcon}>
              Todos
            </MenuItem>
          </div>
          <div>
            <MenuItem
              onClick={() => {
                setMenuOpen(false);
                logout();
              }}
              icon={ArrowRightStartOnRectangleIcon}
            >
              Sign Out
            </MenuItem>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
