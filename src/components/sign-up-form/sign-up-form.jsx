import { useState } from "react";
// to track the fields to make the form valid
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import FormInput from "../form-input/form-input";
import "./sign-up-form.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  // formFields is the object of defaultFormFields not the string
  const { displayName, email, password, confirmPassword } = formFields;
  // destructuring the object, so we can use the names directly
  //  we can also use formFields.email instead

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
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
      <h2> I do not have an account</h2>
      <span> Sign up with your email and password</span>
      <form on onSubmit={handleSubmit}>
        {/* the onSubmit will run when the submit button is clicked it returns a call back function */}

        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

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

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        {/* we added name in the input fields for that the handlechange function can be generic and we can directly target events by name */}
        {/* by adding names and using in the halderChnge function we can identify which input field is firing and which input field to update */}
        {/* name should be same as in the object */}
        {/*  */}
        <button type="submit"> Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
