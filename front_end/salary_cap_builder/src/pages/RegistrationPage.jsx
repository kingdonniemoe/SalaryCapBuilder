import React, { useState } from "react";
import Header from "../components/Header";
import RegistrationForm from "../components/RegistrationForm";
import {useOutletContext} from 'react-router-dom'

const RegistrationPage = () => {
  const { user, setUser } = useOutletContext();

  return (
    <>
      <Header />
      <h1>Sign Up</h1>
      <RegistrationForm setUser={setUser} />
    </>
  );
};

export default RegistrationPage;
