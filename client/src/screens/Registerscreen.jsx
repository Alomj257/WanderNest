import React, { useState } from 'react';
import Loader from '../components/Loader';
import Error from '../components/Error';
import Success from '../components/Success';
import axios from 'axios';

function Registerscreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState();

  async function register() {
    if (password === cpassword) {
      const user = {
        name,
        email,
        password,
        cpassword,
      };
      try {
        setLoading(true);
        const result = await (await axios.post('/api/users/register', user)).data;
        setLoading(false);
        setSuccess(true);
        setName('');
        setEmail('');
        setPassword('');
        setCpassword('');
      } catch (error) {
        setLoading(false);
        setError(true);
        console.log(error);
      }
    } else {
      console.log('Password not matched');
    }
  }

  return (
    <div>
      {loading && <Loader />}
      <div className='row justify-content-center mt-5'>
        <div className='col-md-5'>
          {success && <Success message='Registration success' />}
          {error && <Error />}
          <div className='bs'>
            <h2>Register Here</h2>
            <input type='text' className='form-control' placeholder='name' value={name} onChange={(e) => setName(e.target.value)} />
            <input type='text' className='form-control' placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input type='password' className='form-control' placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
            <input type='password' className='form-control' placeholder='Confirm password' value={cpassword} onChange={(e) => setCpassword(e.target.value)} />
            <button className='btn btn-primary mt-3' onClick={register}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registerscreen;
