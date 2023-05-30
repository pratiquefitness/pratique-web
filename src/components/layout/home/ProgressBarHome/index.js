import React from 'react'
import { Colors } from '../../../assets/colors'
  
const ProgressBarHome = ({bgcolor,progress,height}) => {
     
    const Parentdiv = {
        height: 16,
        width: '100%',
        marginTop: 10,
        padding: 2,
        paddingLeft: 3,
        backgroundColor: Colors.white,
        borderRadius: 40,
      }
      
    const Childdiv = {
        height: 11,
        width: `${progress}%`,
        backgroundColor: bgcolor,
        borderRadius:  40,
        textAlign: 'right'
    }
    
    const progresstext = {
        padding: 10,
        color: 'black',
        fontWeight: 900
    }
        
    return (
    <div style={Parentdiv}>
      <div style={Childdiv}>
        <span style={progresstext}></span>
      </div>
    </div>
    )
}
  
export default ProgressBarHome;