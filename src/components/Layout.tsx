import './Layout.css';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';

function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <MainContent />
      <Footer />
    </div>
  );
}

export default Layout;
