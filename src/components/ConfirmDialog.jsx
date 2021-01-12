import { IonModal, IonButton, IonContent } from '@ionic/react'
import Header from './Header/App'


function ConfirmDialog({ message, isOpen, header, close, confirm }) {
    
    return (
        <IonModal isOpen={isOpen}  onDidDismiss={close}>
            <Header text={header ? header : 'Please Confirm your choice '} color='success'/>
            <IonContent style={{height:'200px'}}>
               <p><h4>{message}</h4></p>
                
                <IonButton onClick={() => close()} color='medium' size='small'>Close</IonButton>
                <IonButton onClick={() => confirm()} color='success' size='small'>Confirm</IonButton>
           </IonContent>    
            
        </IonModal>
    );
}

export default ConfirmDialog