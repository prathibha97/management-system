import React, { useState } from 'react'
import { DocumentUpload, PersonalInfoForm, ProfessionalInfoForm, ReviewNewEmployee } from '../../components'

function Register() {
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [nic, setNic] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = input => e => {
    switch (input) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'nic':
        setNic(e.target.value);
        break;
      case 'gender':
        setGender(e.target.value);
        break;
      case 'dob':
        setDob(e.target.value);
        break;
      case 'street':
        setStreet(e.target.value);
        break;
      case 'city':
        setCity(e.target.value);
        break;
      case 'state':
        setState(e.target.value);
        break;
      case 'zip':
        setZip(e.target.value);
        break;
      default:
        break;
    }
  };

  const values = { firstName, lastName, email, dob, phone, gender, nic, street, city, state, zip };

  switch (step) {
    case 1:
      return (
        <PersonalInfoForm
          nextStep={nextStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 2:
      return (
        <ProfessionalInfoForm
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 3:
      return (
        <DocumentUpload
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 4:
      return (
        <ReviewNewEmployee
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      )
    default:
      return <p>This is a multi-step form built with React.</p>;
  }
}

export default Register