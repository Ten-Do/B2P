/* REACT DEFAULT SETTINGS */
import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";


/* STYLES */
//import './App.css';
import "./styles/styles.css";


/* COMPONENTS */
import Unipay from './components/Unipay/Unipay';
import Payment from './components/Payment/Payment';


export default function App() {
  const sections = ["UNIPAY", "PAYMENT"];
  const [activeSection, setActiveSection] = useState(sections[0]);

  const setUnipay = () => setActiveSection(sections[0]);
  const setPayment = () => setActiveSection(sections[1]);
  return (
    <div className='main__container'>
      <section className='btns-slider__container'>
      <button onClick={setUnipay}>Unipay</button>
      <button onClick={setPayment}>Payment</button>
      </section>
      <CSSTransition
        classNames="section"
        in={activeSection === sections[0]}
        // timeout={300}
        unmountOnExit
      >
        <Unipay></Unipay>
      </CSSTransition>
      <CSSTransition
        classNames="section"
        in={activeSection === sections[1]}
        // timeout={300}
        unmountOnExit
      >
        <Payment></Payment>
      </CSSTransition>
    </div>
  );
}