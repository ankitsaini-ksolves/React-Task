import { useState, useCallback, useEffect, useRef } from 'react'

function Password() {
  const [length, setLength] = useState(8)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [charactersAllowed, setCharactersAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const passwordRef = useRef(null)

  const generatePassword =useCallback(()=>{
    let pass=""
    let st = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    if (numbersAllowed) st+= '1234567890'
    if (charactersAllowed) st+= "~!@#$%^&*()_+-="
    for (let index = 0; index <= length; index++) {
      let char = Math.floor(Math.random() * st.length + 1)
      pass += st.charAt(char);
    }
    setPassword(pass)
  },[length, numbersAllowed, charactersAllowed])

  const copyPassword = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password)

  },[password])


  useEffect(()=>{
    generatePassword()
  },[length, numbersAllowed, charactersAllowed, generatePassword])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500'>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} placeholder='Password' className='w-full outline-none py-1 px-3' readOnly ref={passwordRef}></input>
          <button className='bg-blue-700 text-white px-3 py-0.5 shrink-0' onClick={copyPassword}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type='range' min={6} max={50} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
            <label>Lenght: {length}</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type='checkbox' defaultChecked={numbersAllowed} id='numberInput' onChange={()=>{setNumbersAllowed((prev) => !prev)}}></input>
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex item-center gap-x-1'>
            <input type='checkbox' defaultChecked={charactersAllowed} id='CharacterInput' onChange={()=>{setCharactersAllowed((prev) => !prev)}}></input>
            <label htmlFor='numberInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default Password
