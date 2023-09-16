import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Countries from './Countries';
import Navbar from './Navbar';
import UserPanel from './UserPanel';

function App() {
  return (
    <div className="App">
      <div className='container'>
        <div className='row'>
          <div className='col-7'><Navbar /></div>
        </div>
      </div>

      <div className='container-fluid'>
        <div className="row">
          <div className="col-2"><Sidebar /></div>
          <div className="col-7"><Countries /></div>
          <div className="col-3"><UserPanel /></div>
        </div>

       
      </div>
    </div>
  );
}

export default App;