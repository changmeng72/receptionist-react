 
   
    import React from 'react';
    import {  IonCard} from '@ionic/react';
  
    import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
     
const styles = {height:'150px',display: 'flex', justifyContent: 'center', alignItems: 'center' };
function EntranceButton({text,icon,onClick}){
    return (
       
        <IonCard button  style={styles} onClick={onClick} >           
           <div style={{textAlign:'center',color:'#3dc2ff'}}>
                <FontAwesomeIcon icon={icon} style={{ fontSize: '4rem' }} color='#3dc2ff' />
              <p>{text}</p>
            </div>
            </IonCard>
       
    );
}

export default EntranceButton;