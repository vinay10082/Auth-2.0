import React, {useState} from 'react'
// import { useDispatch } from 'react-redux'
// import { useNavigate } from 'react-router-dom'

// import { signup, login, verifyotp } from '../../actions/auth'
const Auth = () => {

    const [isSignup, setIsSignup] = useState(false)
    const [isVerified, setIsVerified] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otp, setOtp] = useState('')

    // const dispatch = useDispatch()
    // const navigate = useNavigate()


    const handleOTPSubmit = (e) =>{
        e.preventDefault() 
        console.log({otp})
    }

    const handleSwitch = () => {      
        setIsSignup(!isSignup)
        setIsVerified(!isVerified)
        setIsSignup(!isSignup)
        setIsVerified(isVerified)
    }
    const handleResend = () => {
        setIsSignup(!isSignup)
        setIsVerified(!isVerified) 
        setIsSignup(isSignup)
        setIsVerified(!isVerified)
    }
    const handleSignupSubmit = (e) => {
        e.preventDefault()
        setIsSignup(!isSignup)
        setIsVerified(!isVerified) 
        setIsSignup(isSignup)
        setIsVerified(!isVerified) 
console.log({name, email, password})
        }
        const handleLoginSubmit = (e) => {
            e.preventDefault()

    console.log({email, password})
            }
    return (
        <section>
            
                {isSignup && !isVerified && (
                    <div>                    
                        <form onSubmit={handleSignupSubmit}>
    <label htmlFor="name">
        <h4>Name</h4>
        <input type="name" name='name' id='name' onChange={(e) => {setName(e.target.value)}}/>
    </label>
    <label htmlFor="email">
        <h4>Email</h4>
        <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
    </label>
    <label htmlFor="password">
            <h4>Password</h4>
        <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
        <p style={{ color: "#666767", fontSize:"13px"}}>Passwords must contain at least eight<br />characters, including at least 1 letter and 1<br /> number.</p>
    </label>
    <button type='submit' className='auth-btn'>Sign up</button>
                    </form>
                    <p>
                        Already have an account?
                        <button type='button' className='handle-switch-btn' onClick={handleSwitch}>Log in</button>
                    </p>
                    </div>
                )}
                {isVerified && isSignup && (
                    <div>
                        <form onSubmit={handleOTPSubmit}>
                        <label htmlFor='otp'>
                        <h4>Enter Pin</h4>
                        <input type="otp" id='otp' name='otp' onChange={(e) => {setOtp(e.target.value)}}/>
                    <button type='submit' className='auth-btn'>Submit</button>
                    <p>didn't get ?</p>
                    <button type='submit' className='auth-btn'onClick={handleSignupSubmit}>resend otp</button>
                    </label>
        </form>
        </div>
                )}
                 {!isSignup && !isVerified && (
                    <div>
                    <form onSubmit={handleLoginSubmit}>
    <label htmlFor="email">
        <h4>Email</h4>
        <input type="email" name='email' id='email' onChange={(e) => {setEmail(e.target.value)}}/>
    </label>
    <label htmlFor="password">
            <h4>Password</h4>
        <input type="password" name='password' id='password' onChange={(e) => {setPassword(e.target.value)}}/>
        <p style={{ color: "#007ac6", fontSize:'13px'}}>forgot password?</p>
         </label>
    <button type='submit' className='auth-btn'>Login</button>
                    </form>
                    <p>
                        Don't have an account?
                        <button type='button' className='handle-switch-btn' onClick={handleSwitch}>Sign up</button>
                    </p>
                    </div>
                )}
        </section>
    )
}

export default Auth
