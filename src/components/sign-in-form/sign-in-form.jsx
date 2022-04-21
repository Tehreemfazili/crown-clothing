import { useState, useContext } from "react";
// to track the fields to make the form valid
import {
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase";
import Button from "../button/button";
import { UserContext } from "../context/user-context";
// { } as we get back the object
import FormInput from "../form-input/form-input";
import "./sign-in-form.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // formFields is the object of defaultFormFields not the string
  const { email, password } = formFields; // destructuring the object, so we can use the names directly
  //  we can also use formFields.email instead

  const { setCurrentUser } = useContext(UserContext);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = signInAuthUserWithEmailAndPassword(email, password);
      setCurrentUser(user);
    } catch (error) {
      console.log("error creating the user", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
    // ... a spread syntax
    // here it spreads the opject ang target the appropraite input to update
    // only update the appropriate field by using the square brackets
  };

  return (
    <div className="sign-up-container">
      <h2> Already have an account</h2>
      <span> Sign in with your email and password</span>
      <form on onSubmit={handleSubmit}>
        {/* the onSubmit will run when the submit button is clicked it returns a call back function */}

        <FormInput
          label="Email "
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label=" Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        {/* we added name in the input fields for that the handlechange function can be generic and we can directly target events by name */}
        {/* by adding names and using in the halderChnge function we can identify which input field is firing and which input field to update */}
        {/* name should be same as in the object */}
        {/*  */}
        <div className="buttons-container">
          <Button type="submit">SIGN IN</Button>
          <Button type="button" buttonType="google" onClick={logGoogleUser}>
            GOOGLE SIGN IN
          </Button>
          {/* added type button because when on click both the bitton gets triggered as they are bydefault of type submit */}
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
