
import { useEffect, useState } from 'react';
import postData from '../services/postData'
import { useLocation,useHistory } from 'react-router-dom';
import { IonPage,IonImg,IonCardContent,IonLoading,IonContent,IonCard, IonCardHeader, IonCardTitle,IonButton,IonGrid,IonRow, IonCol } from '@ionic/react';
import Header from '../components/Header/App';
import { faHome } from '@fortawesome/free-solid-svg-icons';


export default function Delivery() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState(false);
    const location = useLocation();
    const history = useHistory();


    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = { contactid: location.state.detail.contactid, contactname: location.state.detail.contactname, buttontype: location.state.detail.buttontype };
                postData("https://192.168.0.23:4000/api/delivery", data).then(json => {
                   // 
                   // if (json.result === 'ok')
                        setResult(()=>true);
                     setLoading(() => false);
                })
                
      } catch (err) {
            
      }
    };
    fetchData();
        
    }, []);

    useEffect(() => {
        
        
    }, [result]);
    

    return (
        <IonPage>
            <Header text='Register and Notification' icon={faHome} action={()=>history.push('/')} />
            <IonContent sytle={{
                minwidth: '250px !important', PaddingTop:'8rem' 
            }} >
                <IonGrid>
                    <IonRow style={{justifyContent:'center'}}>
                        <IonCol size-sm ='4'>

                <IonCard >
                    <IonImg src="http://192.168.0.23:4001/image/mail-animation.gif" alt="sending notification" style={{ fillObject:'cover'}}/> 
                    <IonCardHeader>
                        <IonCardTitle>{location.state.detail.buttontype == 2 ? 'Deliver a Document' : 'Deliver a Package'}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        
                            {result ?
                           ('Your delivery has been registered and a notification has been sent to ' + location.state.detail.contactname) :
                            'We are trying to send a notification to ' + location.state.detail.contactname
                        }
                    </IonCardContent>
                    <IonButton size='small' expand='block' disabled={loading} onClick={()=>{history.push('/')}} style={{marginBottom:'3rem'}}>Home</IonButton>
                 
                    </IonCard>
                </IonCol>
                </IonRow>
                </IonGrid>
            </IonContent>
            <IonLoading 

                  isOpen={loading}
                  message={'Please Wait ,we are sending notification to ' + location.state.detail.contactname + '...'}
                  duration={5000}
                /> 
        </IonPage>
    );
}