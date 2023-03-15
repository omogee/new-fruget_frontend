import {React, useState, useEffect} from 'react'
import Search from './search'

function Movieform() {
const [input, setinput]=useState({})
const [movies, setmovies] = useState([])
const [durerr, setdurerr] = useState(false)

useEffect(()=>{
  console.log(input)
},[input])
const change=(e)=>{
  setdurerr(false)
  setinput(prev =>({...prev, [e.target.name]:e.target.value}))
}
const submit=(e)=>{
  e.preventDefault()
  if(input.moviename && input.movieduration && input.movierating){
  const oldinputs = input;
  if(input.movierating > 100){
    return alert("ratings cannot be above 100")
  }
  if(input.movieduration.indexOf("hrs") > -1){
   setmovies(prev=>([...prev, input]))
   setinput({})
  }else if(input.movieduration.indexOf("min") > -1){
    let mduration =input.movieduration
    mduration = parseInt(mduration)
    console.log("mduration",mduration)
    mduration = (mduration/60).toFixed(2)
    console.log("mduration",mduration)
    mduration = mduration+"hrs"
    console.log("mduration",mduration)
   // setinput(prev =>({...prev, movieduration:mduration}))
   oldinputs.movieduration = mduration
    setmovies(prev =>([...prev, oldinputs]))
    setinput({})
  }else{
    setdurerr(true)
  }
}else{
  alert("please enter a valid input every form field")
}
}
  return (
    <div >
    <section>
      <div className='card pa-30'>
        <form  onSubmit={submit}>
          <div className='layout-column mb-15'>
            <label htmlFor='name' className='mb-3'>Movie Name</label>
            <input 
              type='text' 
              id='name'
              name='moviename'
              onChange={change}
              placeholder='Enter Movie Name'
              data-testid='nameInput'
            />
          </div>
          <div className='layout-column mb-15'>
            <label htmlFor='ratings' className='mb-3'>Ratings</label>
            <input 
              type='number' 
              id='ratings'
              onChange={change}
              name='movierating'
              placeholder='Enter Rating on a scale of 1 to 100'
              data-testid='ratingsInput'
            />
          </div>
          <div className='layout-column mb-30'>
            <label htmlFor='duration' className='mb-3'>Duration</label>
            <input 
              type='text' 
              id='duration'
              name='movieduration'
              onChange={change}
              placeholder='Enter duration in hours or minutes'
              data-testid='durationInput'
            />
            <i style={{color:"indianred",display:`${durerr ? "block" : "none"}`}}>
            please specify the time in hours(hrs) or minutes(min) e.g (2.5hrs, 60min)
            </i>
          </div>
          {/* Use this div when time format is invalid */}
          {/* <div 
            className='alert error mb-30'
            data-testid='alert'
          >
            Please specify time in hours or minutes (e.g. 2.5h or 150m)
          </div>  */}
          <div className='layout-row justify-content-end'>
            <button 
              type='submit'
              className='mx-0'
              data-testid='addButton'
            >
              Add Movie
            </button>
          </div>
          </form>
      </div> 
    </section>
    <Search movies={movies} />
    </div>
  )
}

export default Movieform
