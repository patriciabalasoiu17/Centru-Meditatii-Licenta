// components/Layout.jsx
// import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
import LayoutSidebar from './LayoutSidebar';

const Layout = () => {
  return (
    <div className="flex w-full h-full">
      <LayoutSidebar>
        <Outlet />
      </LayoutSidebar>
    </div>
  );
};

export default Layout;
