import React, { useState } from 'react'
import { DocumentUpload, PersonalInfoForm, ProfessionalInfoForm, ReviewNewEmployee, SalaryStructure } from '../../components'
import encodePDFToBase64 from '../../utils/encodePDFToBase64'

function Register() {
  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthDate, setBirthDate] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('123456')
  const [phone, setPhone] = useState('')
  const [gender, setGender] = useState('')
  const [nic, setNic] = useState('')
  const [street, setStreet] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zip, setZip] = useState('')
  const [empNo, setEmpNo] = useState('')
  const [dateOfAppointment, setDateOfAppointment] = useState('')
  const [designation, setDesignation] = useState('')
  const [workType, setWorkType] = useState('')
  const [department, setDepartment] = useState('')
  const [leaveAllocation, setLeaveAllocation] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [idCardPath, setIdCardPath] = useState(null)
  const [bankPassPath, setBankPassPath] = useState(null)
  const [resumePath, setResumePath] = useState(null)
  const [effectiveDate, setEffectiveDate] = useState('')
  const [paymentModel, setPaymentModel] = useState('')
  const [basicSalary, setBasicSalary] = useState(0)
  const [pf, setPf] = useState(false)
  const [bank, setBank] = useState('')
  const [accNo, setAccNo] = useState('')
  const [advance, setAdvance] = useState(false)
  const [maxAdvance, setMaxAdvance] = useState(0)
  const [noOfAdvances, setNoOfAdvances] = useState(0)

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleIdInputChange = (e) => {
    const file = e.target.files[0];
    encodePDFToBase64(file)
      .then((base64) => {
        setIdCardPath(base64);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleBankPassInputChange = (e) => {
    const file = e.target.files[0];
    encodePDFToBase64(file)
      .then((base64) => {
        setBankPassPath(base64);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleResumeInputChange = (e) => {
    const file = e.target.files[0];
    encodePDFToBase64(file)
      .then((base64) => {
        setResumePath(base64);
      })
      .catch((error) => {
        console.error(error);
      });
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
      case 'dateOfAppointment':
        setDateOfAppointment(e.target.value);
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
      case 'effectiveDate':
        setEffectiveDate(e.target.value);
        break;
      case 'paymentModel':
        setPaymentModel(e.target.value);
        break;
      case 'basicSalary':
        setBasicSalary(e.target.value);
        break;
      case 'pf':
        setPf(e.target.value);
        break;
      case 'bank':
        setBank(e.target.value);
        break;
      case 'accNo':
        setAccNo(e.target.value);
        break;
      case 'advance':
        setAdvance(e.target.value);
        break;
      case 'maxAdvance':
        setMaxAdvance(e.target.value);
        break;
      case 'noOfAdvances':
        setNoOfAdvances(e.target.value);
        break;
      case 'admin':
        setIsAdmin(e.target.checked);
        break;
      case 'idCardPath':
        handleIdInputChange(e);
        break;
      case 'bankPassPath':
        handleBankPassInputChange(e);
        break;
      case 'resumePath':
        handleResumeInputChange(e);
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

  const values = { firstName, lastName, email, password, birthDate, phone, gender, nic, street, city, state, zip, empNo, dateOfAppointment, designation, workType, department, leaveAllocation, isAdmin, idCardPath, bankPassPath, resumePath, effectiveDate, paymentModel, basicSalary, pf, bank, accNo, advance, maxAdvance, noOfAdvances };
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
        <SalaryStructure
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 4:
      return (
        <DocumentUpload
          nextStep={nextStep}
          prevStep={prevStep}
          handleChange={handleChange}
          values={values}
        />
      )
    case 5:
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