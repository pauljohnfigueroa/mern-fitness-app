import { useState } from 'react'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async e => {
    e.preventDefault()
    console.log(email, password)
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label>Email</label>
      <input type="email" onChange={e => setEmail(e.target.value)} value={email} />
      <label>Password</label>
      <input type="password" onChange={e => setPassword(e.target.value)} value={password} />
      <button>Sign Up</button>
    </form>
  )
}

export default Signup
