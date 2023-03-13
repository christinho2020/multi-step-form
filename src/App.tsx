import { useState } from "react"
import { AccountForm } from "./AccountForm"
import { AddressForm } from "./AddressForm"
import { useMultistepForm } from "./useMultistepForm"
import { UserForm } from "./UserForm"

type FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password:"",  
}
const INITIAL_DATA: FormData = {
  firstName: "",
  lastName: "",
  age: "",
  street: "",
  city: "",
  state: "",
  zip: "",
  email: "",
  password:"", 
}
function App() {
  const [data, setData] = useState(INITIAL_DATA)
  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }
  const { steps, currentStepIndex, step, isFirstPage, isLastPage, back, next} = useMultistepForm([
  <UserForm {...data} updateFields={updateFields} />,
  <AddressForm {...data} updateFields={updateFields}/>,
  <AccountForm {...data} updateFields={updateFields}/> 
])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!isLastPage) return next()
    alert("Account Created Successfully!!!")
  }
  return <div style={{
    position: 'relative',
    background: 'gray',
    border: '4px solid black',
    padding: '2rem',
    margin: '1rem',
    borderRadius: '.7rem',
    fontFamily: 'Arial',
    maxWidth: "max-content"
  }}>
    <form onSubmit={onSubmit}>
      <div style={{position: 'absolute', top: '.5rem', right: '.5rem'}}>
        {currentStepIndex + 1} / {steps.length}
      </div>
      {step}
      <div 
      style={{
        marginTop:'1rem', 
        display:'flex', 
        justifyContent: 'flex-end',
        }}>
          {!isFirstPage && <button type='button'onClick={back}>Previous</button>}
          <button type='submit'>{isLastPage ? 'Finish' : 'Next'}</button>
        </div>
    </form>
  </div>
}

export default App