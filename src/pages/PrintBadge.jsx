
import {IonPage, IonContent,IonCard, IonList, IonItem, IonLabel,IonButton,IonImg ,IonGrid,IonRow,IonCol,IonLoading, IonItemDivider} from '@ionic/react';
import Header from '../components/Header/App';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import { useState } from 'react';

function PrintBadge() {
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const history = useHistory();

    return (
        <IonPage>
            <Header text='Print Your Badge' icon={faHome} action={()=>history.push('/')} />
            <IonContent sytle={{
                width: '80% !important',
                 PaddingTop:'8rem' 
            }} >
                <IonGrid><IonRow style={{justifyContent:'center'}}><IonCol size-md='5' size-xs='12' size-sm='8' size-xl='3' >
                <IonCard sytle={{left:'20%' ,right:'20%'}}>
                    <IonImg src={"https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=" +
                            JSON.stringify({ checkintime: location.state?.detail.checkin, visitid: location.state?.detail.visitid })} style={{ width: '200px', margin: 'auto', paddingTop: '3rem' ,paddingBottom:'1rem'}}
                            onIonImgDidLoad ={()=>setLoading(false)}
                        />

                        <IonList style={{ margin: 'auto' }}>
                            <IonItemDivider />
                        <IonItem>
                            <IonLabel style={{fontSize:'1rem'}}> Name : <strong>{location.state?.detail.firstname}</strong></IonLabel>
                        </IonItem>
                        <IonItem>
                                <IonLabel style={{ fontSize: '1rem' }}> Contact Name:<strong>{location.state?.detail.contactname}</strong></IonLabel>
                        </IonItem>
                        <IonItem>
                                <IonLabel style={{ fontSize: '1rem' }}> Checkin Time: <strong>{location.state?.detail.checkin}</strong></IonLabel>
                        </IonItem>
                           
                        
                    </IonList>
                            <IonButton   expand="block" onClick={()=>{history.push('/')}}>SKIP</IonButton>
                         

                    </IonCard>
                </IonCol></IonRow></IonGrid>
                
                <IonLoading 

                  isOpen={loading}
                  message={'Please Wait ,Badge is under generation... '}
                  duration={5000}
                /> 
            </IonContent>
        </IonPage>
    );
}
export default PrintBadge;