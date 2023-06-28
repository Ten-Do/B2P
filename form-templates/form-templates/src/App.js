/* REACT DEFAULT SETTINGS */
import React, {useState} from 'react';
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
//import { useForm } from "react-hook-form";


/* STYLES */
//import './App.css';
import "./styles/styles.css";


/* COMPONENTS */
//import Header from "./components/Header/Header";
import Unipay from './components/Unipay/Unipay';
import Payment from './components/Payment/Payment';


export default function App() {
  const sections = ["UNIPAY", "PAYMENT"];
  const [activeSection, setActiveSection] = useState(sections[0]);

  const setUnipay = () => setActiveSection(sections[0]);
  const setPayment = () => setActiveSection(sections[1]);
  return (
    <div className='main__container'>
      <button onClick={setUnipay}>Unipay</button>
      <button onClick={setPayment}>Payment</button>
      <CSSTransition
        classNames="section"
        in={activeSection === sections[0]}
        timeout={300}
        unmountOnExit
      >
        <Unipay></Unipay>
      </CSSTransition>
      <CSSTransition
        classNames="section"
        in={activeSection === sections[1]}
        timeout={300}
        unmountOnExit
      >
        <Payment></Payment>
      </CSSTransition>
    </div>
  );
  // const { register, handleSubmit } = useForm();
  // const [data, setData] = useState("");

  // return (
  //   <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
  //     <Header />
  //     <input {...register("firstName")} placeholder="First name" />
  //     <select {...register("category", { required: true })}>
  //       <option value="">Select...</option>
  //       <option value="A">Option A</option>
  //       <option value="B">Option B</option>
  //     </select>
  //     <textarea {...register("aboutYou")} placeholder="About you" />
  //     <p>{data}</p>
  //     <input type="submit" />
  //   </form>
  // );
}