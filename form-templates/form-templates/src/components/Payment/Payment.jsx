import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";

import Footer from '../Footer/Footer';

import PaymentStyles from './Payment.module.scss';

export default function Payment() {
    return(
        <>
        <h1>Payment</h1>
        <Footer />
        </>
    );
}