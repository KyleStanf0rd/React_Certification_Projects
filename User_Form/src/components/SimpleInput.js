import React from 'react'
import useInput from '../hooks/use-input';

const SimpleInput = () => {
  const { 
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError:nameInputHasError,
    valueChangeHandler: nameChangedHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '')

  //HOW YOU WOULD USE IT FOR AN EMAIL
  // const {
  //   value: enteredEmail,
  //   isValid: enteredEmailValue,
  //   hasError: emailInputHasError,
  //   valueChangeHandler: emailChangeHandler,
  //   inputBlurHandler: emailBlurHandler,
  //   reset: resetEmailInput
  // } = useInput(value => value.includes('@'))

  let formIsValid = false;

  if(enteredNameIsValid){
    formIsValid = true;
  }

  const formSubmissionHandler = event => {
    event.preventDefault()

    if(!enteredNameIsValid){
      return;
    }
    resetNameInput()
  }

  const nameInputClasses = nameInputHasError
  ? 'form-control invalid' 
  : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input 
          type='text' 
          id='name' 
          onChange={nameChangedHandler} 
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className='error-text'>Name must not be empty</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
