/* REACT DEFAULT SETTINGS */
import React, {useState} from 'react';


/* STYLES */
import "./styles/App.scss";


/* COMPONENTS */
import Unipay from './components/Unipay/Unipay';
import Payment from './components/Payment/Payment';


const App = () => {
  const [currentPage, setCurrentPage] = useState("unipay");

  const handleTogglePage = () => {
    setCurrentPage(currentPage === "unipay" ? "payment" : "unipay");
  };
  
  return (
    <div className='main__container'>
      {currentPage === "unipay" ? (
        <Unipay toggle={handleTogglePage} />
      ) : (
        <Payment toggle={handleTogglePage} />
      )}
    </div>
  );
}

export default App;