import Alert from '@mui/material/Alert';
import axios from "axios";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from "../../app/features/auth/authApiSlice";
import { setCredentials } from "../../app/features/auth/authSlice";
import { setAuthEmail, setAuthPage, setOtp } from "../../app/features/passwordRecovery/passwordRecoverySlice";
import Loader from "../Loader";

function Login({ setPage }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login, { isLoading }] = useLoginMutation()

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const userData = await login({ email, password }).unwrap()
      dispatch(setCredentials({ ...userData }))
      if (password === '123456') {
        navigate('/reset-password')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function navigateToOtp() {
    if (email) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setPage('otp')
      try {
        dispatch(setAuthPage('opt'));
        dispatch(setAuthEmail(email));
        dispatch(setOtp(OTP));
        await axios.post("http://localhost:5000/send_recovery_email", {
          OTP,
          email,
        })
      } catch (err) {
        console.log(err)
      }
      // return alert("Please enter your email");
    }
  }
  if (isLoading) return <Loader />

  return (
    <div className="flex h-[100vh]">
      <div className="flex-1 bg-[#157e79]">left</div>
      <div className="flex-1 bg-[#F4F4F4]">
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="mb-8 font-semibold text-4xl text-[#464646]">Welcome back,</h2>
          {error && <Alert severity="error">{error}</Alert>}
          <form className="flex flex-col gap-5 w-[450px]" onSubmit={handleSubmit}>
            <input className="outline-none border border-solid border-black rounded-md h-[40px] bg-transparent" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="outline-none border border-solid border-black rounded-md h-[40px] bg-transparent" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-[#5D8A88] rounded-md text-white h-[40px]" type="submit">Sign in</button>
          </form>
          <p className="text-[28]">Forgot your password? <Link to="/" onClick={() => navigateToOtp()}>Click here</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Login
