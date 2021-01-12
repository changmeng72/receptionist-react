import {IonHeader, IonTitle,IonToolbar,IonButton, IonBackButton} from '@ionic/react';
import React  from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
function Header({ text, icon, color, action }) {
  function clickHandler() {
    if (action) {
      try {
        action();
      } catch (err) {
        
      }
    }
  }
  return (
    <IonHeader>
      <IonToolbar color= {color?color:'secondary'}>
       
        
         
           <FontAwesomeIcon icon={icon} style={{ fontSize: '1.5rem',marginLeft:'0.5rem' }} onClick={() => clickHandler()}
          slot='start'
        />
        
        <IonTitle style={{textAlign:'center'}}>{text}</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

export default Header;
