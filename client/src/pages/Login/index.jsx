import { useState } from "react"
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from "../../redux/actions/userActions"
import api from '../../utils/api'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await api.post('/emp/auth/login', { email, password })
      console.log(data);
      dispatch(login(email, password))
      navigate('/dashboard')
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className="flex h-[100vh]">
      <div className="flex-1 bg-[#157e79]">left</div>
      <div className="flex-1 bg-[#F4F4F4]">
        <div className="flex flex-col items-center justify-center h-screen">
          <h2 className="mb-8 font-semibold text-4xl text-[#464646]">Welcome back,</h2>
          <form className="flex flex-col gap-5 w-[450px]" onSubmit={handleSubmit}>
            <input className="outline-none border border-solid border-black rounded-md h-[40px] bg-transparent" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <input className="outline-none border border-solid border-black rounded-md h-[40px] bg-transparent" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button className="bg-[#5D8A88] rounded-md text-white h-[40px]" type="submit">Sign in</button>
          </form>
          <p className="text-[28]">Forgot your password?</p>
        </div>
      </div>
    </div>
  )
}

export default Login