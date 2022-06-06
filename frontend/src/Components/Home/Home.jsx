import React from 'react'
import "./home.css"
import icon from "../../icon.png"
import main from "../../main-logo.png"

const Home = () => {
  return (
    <div className='home'>
      <div className='nav'>
     <p> Let's Meet </p>
      </div>
        

        <div className='container'>

          <div className='contain1'>
          <p>Meet, chat, call, and collaborate in just one place</p>
          <h5>Instantly start a video chat for two people with the touch of a button</h5>
          
          <div className='inputs'>
         <div className='input1'> <input id='btn1' placeholder='Enter Name' /> <button id='btn2'>New Meeting </button> </div>
          <div className='input2'> <input id='btn3' placeholder='Enter Meeting Code' /> <input id='btn4' placeholder='Enter Name' /> <button id='btn5'> Join Meeting </button> </div>
          </div>

          </div>
          <div className='contain2'>
              <img src={main} />
          </div>
        </div>
    </div>
  )
}

export default Home