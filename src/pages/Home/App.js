import {
  IonPage,
  IonGrid,
  IonRow,
  IonCol,
  IonContent
  } from '@ionic/react';
  import React from 'react';
  
  import { faUsers,faMap,faTruck,faQrcode,faSignOutAlt,faTimes } from '@fortawesome/free-solid-svg-icons'
  import EntranceButton from '../../components/EntranceButton'
  import Header from '../../components/Header/App'
import { Plugins } from '@capacitor/core';
import { useHistory } from 'react-router-dom';
  
function App() {
  const history = useHistory();
  return (
    <IonPage>
      <Header text='Welcome to ABC ' icon={faTimes} action={Plugins.App.exitApp}/>
    <IonContent >
       <IonGrid style={{marginTop:'2rem'}}>
           <IonRow>
                 <IonCol size-sm='6' size-xs='12'>
              <EntranceButton text='Here for an appointment?' icon={faUsers} onClick={ ()=> history.push({pathname:'/searchemployee',search:'buttontype=1'})} /> 
                 </IonCol>
                 <IonCol size-sm='6' size-xs='12'>
                 <EntranceButton text='Document Dropoff' icon = {faMap} onClick={ ()=> history.push({pathname:'/searchemployee',search:'buttontype=2'})} />            
                 </IonCol>
           </IonRow>
           <IonRow>
                 <IonCol size-sm='6' size-xs='12'>
                 <EntranceButton text='Delivery' icon = {faTruck} onClick={ ()=> history.push({pathname:'/searchemployee',search:'buttontype=3'})}  /> 
                 </IonCol>
                 <IonCol size-sm='6' size-xs='12'>
                 <EntranceButton text='Preregisted visit' icon = {faQrcode} onClick={ ()=> history.push({pathname:'/qrscan',search:'type=preregistered'})} />            
                 </IonCol>
           </IonRow>
           <IonRow>
                <IonCol>
                   <EntranceButton text='Checkout' icon = {faSignOutAlt}  onClick={ ()=> history.push({pathname:'/qrscan',search:'type=checkout'})} /> 
                </IonCol>
           </IonRow>
        </IonGrid>     
     
      </IonContent>
    </IonPage>
  );
}

export default App;
