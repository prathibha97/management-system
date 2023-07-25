import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectEmployee } from '../../app/features/employees/employeeSelector'
import { DocumentUpload, PersonalInfoForm, ProfessionalInfoForm, ReviewNewEmployee, SalaryStructure } from '../../components'

function EditEmployee() {

  const employee = useSelector(selectEmployee)

  const [step, setStep] = useState(1)
  const [firstName, setFirstName] = useState(employee.name.first)
  const [lastName, setLastName] = useState(employee.name.first)
  const [birthDate, setBirthDate] = useState(employee.birthDate)
  const [email, setEmail] = useState(employee.email)
  const [password, setPassword] = useState('123456')
  const [phone, setPhone] = useState(employee.phone)
  const [gender, setGender] = useState(employee.gender)
  const [nic, setNic] = useState(employee.nic)
  const [street, setStreet] = useState(employee.address.street)
  const [city, setCity] = useState(employee.address.city)
  const [state, setState] = useState(employee.address.state)
  const [zip, setZip] = useState(employee.address.zip)
  const [empNo, setEmpNo] = useState(employee.empNo)
  const [dateOfAppointment, setDateOfAppointment] = useState(employee.dateOfAppointment)
  const [designation, setDesignation] = useState(employee.designation._id)
  const [workType, setWorkType] = useState(employee.workType)
  const [department, setDepartment] = useState(employee.department._id)
  const [leaveAllocation, setLeaveAllocation] = useState([])
  const [role, setRole] = useState(employee.role)
  const [idCardPath, setIdCardPath] = useState(null)
  const [bankPassPath, setBankPassPath] = useState(null)
  const [resumePath, setResumePath] = useState(null)
  const [effectiveDate, setEffectiveDate] = useState(employee.effectiveDate)
  const [paymentModel, setPaymentModel] = useState(employee.paymentModel)
  const [bank, setBank] = useState(employee.bank)
  const [accNo, setAccNo] = useState(employee.accountNo)


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
      case 'bank':
        setBank(e.target.value);
        break;
      case 'accNo':
        setAccNo(e.target.value);
        break;
      case 'role':
        setRole(e.target.value);
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

  const values = { firstName, lastName, email, password, birthDate, phone, gender, nic, street, city, state, zip, empNo, dateOfAppointment, designation, workType, department, leaveAllocation, role, idCardPath, bankPassPath, resumePath, effectiveDate, paymentModel, bank, accNo };
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

export default EditEmployee