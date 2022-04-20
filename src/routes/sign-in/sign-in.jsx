import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import SignUpForm from "../../components/sign-up-form/sign-up-form";
import SignInForm from "../../components/sign-in-form/sign-in-form";
import "./sign-in.scss";
const SignIn = () => {
  return (
    <div className="authentication-container">
      {/* <button onClick={logGoogleUser}>Sign in with google</button> */}
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default SignIn;
