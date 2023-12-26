import { useEffect, useState } from "react";
import Button from "../btn";
import Link from "next/link";
import { signUpWithEmail } from "@/utils/firebase/handleAuth"; // Import your signUpWithEmail method here
import { useAppSelector } from "@/redux-toolkit/hooks";
import { RootState } from "@/redux-toolkit/store";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const router = useRouter();
  const user = useAppSelector((state: RootState) => state.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSucceess] = useState(false);
  useEffect(()=>{
    console.log(user);
    
      if(user.email !== null){
        router.push('/en/pages/other-pages/user-dashboard');
      }
   },[])
  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);

      // Call your signUpWithEmail method
      const { result, error } = await signUpWithEmail(email, password, name);

      if (error) {
        let msg = error.message;
        const cleanedErrorMessage = msg.replace("Firebase: ", "");
        setError(cleanedErrorMessage);
      } else {
        setSucceess(true)
        setEmail("")
        setName("")
        setPassword("")
        console.log(result); // Optionally log the result
        // Redirect or perform any action after successful registration
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      handleRegister()
    }}>
      {success && <div className="alert alert-success" style={{ marginTop: 10 }}>Account created successfully. Now Login Please</div>}
      {error && <div className="alert alert-danger" style={{ marginTop: 10 }}>{error}</div>}
      <div className="form-group">
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">Email Address</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
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

     <input type="submit" value={loading ? "Please wait..." : "CREATE ACCOUNT"} style={{ marginBottom: 10 }} className="w-100 btn btn-solid" disabled={loading} />
     <div className="divider">
          <h6>or</h6>
        </div>
      

      <div className="button-bottom">
       
        <Link href="/pages/other-pages/login">
          <Button btnClass="w-100 btn btn-solid " name="Login" />
        </Link>
      </div>
    </form>
  );
};

export default RegisterForm;
