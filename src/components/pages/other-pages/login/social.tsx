import Img from "@/utils/BackgroundImageRatio";
import { signInWithGoogle } from "@/utils/firebase/handleAuth";
import { FC, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux-toolkit/hooks";
import {  setUser } from "@/redux-toolkit/reducers/user";
import { RootState } from "@/redux-toolkit/store";
import { useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
interface ILoginPageProps {
  title: string;
}

const SocialContent: FC<ILoginPageProps> = ({ title }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [error, setError] = useState<string | null>(null);

  const handleGoogleLogin = async () => {
    try {
       
      const { result, error } = await signInWithGoogle();

      if (error) {
        // Handle error
        console.error("Google login error:", error);
        setError("An error occurred during Google login. Please try again.");
      } else {
        console.log("..........................");
        console.log(result.user);
        
        let uid = (result?.user.uid)?.toString();
        let name = result?.user.displayName;
        let email = (result?.user.email)?.toString();

        const userPayload = {
          uid: uid,
          displayName: name,
          email: email,
        };

        // Dispatch action to update user in Redux store
         dispatch(setUser(userPayload));

        // Log user details
        console.log(user);

        // Clear any previous errors
        setError(null);
        router.push('/en/pages/other-pages/user-dashboard');
      }
    } catch (error) {
      // Handle unexpected error
      console.error("An unexpected error occurred during Google login:", error);
      setError("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <div className="login-with">
      <h6>{title} with</h6>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="login-social row">
        <div className="col">
          <a className="boxes" onClick={handleGoogleLogin} target="_blank">
            <Img src="/assets/images/icon/social/google.png" className="img-fluid" alt="" />
            <h6>google</h6>
          </a>
        </div>
      </div>
      <div className="divider">
        <h6>OR</h6>
      </div>
    </div>
  );
};

export default SocialContent;
