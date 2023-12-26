import { FC, useEffect, useState } from "react";
import Button from "../btn";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { passwordReset, signInWithEmail } from "@/utils/firebase/handleAuth";
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hooks";
import { RootState } from "@/redux-toolkit/store";
import { setUser } from "@/redux-toolkit/reducers/user";

const LoginForm: FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch()
  const user = useAppSelector((state: RootState) => state.user);
  const [email, setEmail] = useState(""); // State variable for email
  const [password, setPassword] = useState(""); // State variable for password
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetEmailSucceess, setResetEmailSuccess] = useState(false);
  const [resetEmailError, setResetEmailError] = useState(false);
  const [resetEmailMsg, setResetEmailMsg] = useState('');
 useEffect(()=>{
  console.log(user);
  
    if(user.email !== null){
      router.push('/en/pages/other-pages/user-dashboard');
    }
 },[])
  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);

      const { result, error } = await signInWithEmail(email, password);

      if (error) {
        let msg  = error.message
        const cleanedErrorMessage = msg.replace("Firebase: ", "");
        setError(cleanedErrorMessage)
      } else {
        let uid = (result?.user.uid)?.toString()
        let name = result?.user.displayName
        let email = (result?.user.email)?.toString()
        const userPayload = {
          uid: uid,
          displayName: name,
          email: email,
        };
        dispatch(setUser(userPayload));
        console.log(user);
        router.push('/en/pages/other-pages/user-dashboard');
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if(resetEmail.length == 0){
        
    }else{
      const { result, error } = await passwordReset(resetEmail)
      if (error) {
          setResetEmailMsg(error.message)
          setResetEmailError(true)
          setResetEmailSuccess(false)
      }else{
      setResetEmail('')
      setResetEmailSuccess(true)
      setResetEmailError(false)
      setResetModalOpen(false);
      }
    }

    // After sending the reset email, close the modal
    
  };

  return (
    
    <form
      onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        handleLogin();
      }}
    >
      {error && (
        <div className="alert alert-danger" style={{ marginTop: 10 }}>
          {error}
        </div>
      )}
      
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">User name or Email address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <small id="emailHelp" className="form-text text-muted">
          We'll never share your email with anyone else.
        </small>
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
      </div>
      <div className="form-group">
        <label
          className="form-check-label"
          onClick={() => setResetModalOpen(true)}
          style={{ cursor: 'pointer', color: 'blue' }}
        >
          Forget Password? Reset
        </label>
      </div>
      {resetEmailError && (
        <div className="alert alert-danger" style={{ marginTop: 10 }}>
          {resetEmailMsg}
        </div>
      )}
      {resetEmailSucceess && (
        <div className="alert alert-success" style={{ marginTop: 10 }}>
          Email Sent! Please check your inbox        </div>
      )}
      {isResetModalOpen && (
        <div className="form-group">
          <div className="form-group">
            <h3>Reset Password</h3>
            <p>Please enter your email to receive a password reset link.</p>
            <input type="email" className="form-control" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} placeholder="Enter your email" />
            <button className="w-100 btn btn-solid" style={{marginBottom:10,marginTop:10}} onClick={handleResetPassword}>Send Reset Link</button>
            <button className="w-100 btn btn-solid"  onClick={() => setResetModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <input type="submit" value={loading ? "Please wait..." : "Login"} style={{ marginBottom: 10 }} className="w-100 btn btn-solid" disabled={loading} />

      
      <div className="divider">
          <h6>or</h6>
        </div>
      <div className="button-bottom">
        <Link href="/en/pages/other-pages/register">
          <Button btnClass="w-100 btn btn-solid " name="Create account"  />
        </Link>
      </div>
    
    </form>
  );
};

export default LoginForm;