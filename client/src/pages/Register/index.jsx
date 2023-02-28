import React, { useState } from 'react'
import { DocumentUpload, PersonalInfoForm, ProfessionalInfoForm, ReviewNewEmployee } from '../../components'

function Register() {
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [nic, setNic] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [empNo, setEmpNo] = useState('')
  const [designation, setDesignation] = useState('')
  const [workType, setWorkType] = useState('')
  const [department, setDepartment] = useState('')
  const [leaveAllocation, setLeaveAllocation] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [idCardPath, setIdCardPath] = useState(null)
  const [bankPassPath, setBankPassPath] = useState(null)
  const [resumePath, setResumePath] = useState(null)

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
      case 'password':
        setPassword(e.target.value);
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
        setBirthDate(e.target.value);
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
      case 'empNo':
        setEmpNo(e.target.value);
        break;
      case 'designation':
        setDesignation(e.target.value);
        break;
      case 'workType':
        setWorkType(e.target.value);
        break;
      case 'department':
        setDepartment(e.target.value);
        break;
      case 'leaveAllocation':
        setLeaveAllocation(e.target.value);
        break;
      case 'admin':
        setIsAdmin(e.target.checked);
        break;
      case 'idCardPath':
        setIdCardPath(e.target.files[0]);
        break;
      case 'bankPassPath':
        setBankPassPath(e.target.files[0]);
        break;
      case 'resumePath':
        setResumePath(e.target.files[0]);
        break;
      default:
        break;
    }

    if (input === 'workType') {
      const selectedLeaveTypes = e.target.value;
      setLeaveAllocation(prevAllocation => ({
        ...prevAllocation,
        [input]: selectedLeaveTypes
      }));
    }
  };


  const values = { firstName, lastName, email, password, birthDate, phone, gender, nic, street, city, state, zip, empNo, designation, workType, department, leaveAllocation, isAdmin, idCardPath, bankPassPath, resumePath };
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