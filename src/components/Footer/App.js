import {IonFooter, IonTitle,IonToolbar} from '@ionic/react';
import React ,{Component} from 'react';
 
function Footer({text}) {
  return (
    <IonFooter>
      <IonToolbar color='primary'>
        <IonTitle>{text}</IonTitle>
      </IonToolbar>
    </IonFooter>
  );
}

export default Footer;
