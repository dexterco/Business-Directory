import { createUserWithEmailAndPassword, getAuth,signInWithEmailAndPassword,UserCredential,updateProfile,GoogleAuthProvider,signInWithPopup ,sendPasswordResetEmail} from "firebase/auth";
import firebaseApp from "./config";
const auth = getAuth(firebaseApp);

export const signInWithEmail = async (email:string, password:string) => {
  let result: UserCredential | null = null,
  error: any = null; 
   try {
    result = await signInWithEmailAndPassword(auth,email, password)
    console.log(result);
    
   } catch (e: any) {
     error = e
   }
    return { result, error };
    
};


export const signUpWithEmail = async (email:string, password:string,name:string) => {
  let result: UserCredential | null = null,
  error: any = null; 
   try {
    result = await createUserWithEmailAndPassword(auth,email, password)
    if (result?.user) {
      await updateProfile(result.user, {
        displayName: name,
      });
    }
    console.log(auth.currentUser);
     await auth.signOut()
    
   } catch (e: any) {
     error = e
   }
    return { result, error };
    
};
  
  export const signInWithGoogle = async() => {
    let result: any | null = null,
  error: any = null; 
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt:'select_account'
    })
    try {
      result = await signInWithPopup(auth, provider)
    } catch (e:any) {
        error=e
    }
     
  

  return { result, error };

  };


  export const passwordReset = async (email:string)=>{
    let result: any | null = null,
    error: any = null; 
    try {
      result = await sendPasswordResetEmail(auth,email)
    } catch (e:any) {
        error =e
    }
    return {result,error}     
  }



  
  export const signOut = async() => {
     try {
           await auth.signOut()
     } catch (error) {
           console.log(error);
           
     }
  };