import React,{useEffect, useState,useRef} from 'react';
import QrReader from 'react-qr-scanner';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/Header/App';
import { useHistory, useLocation} from 'react-router-dom';
import postData from '../services/postData';
import { IonToast,IonButtons,IonPage,IonContent, IonCardHeader, IonCardContent ,IonCard,IonTitle, IonButton,IonList,IonItem} from '@ionic/react';



const previewStyle = {
    height: '768px',
    width: '1024px',
    display: 'flex',
    'justify-content':'center'
};
const camStyle = {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-50px'
};
const textStyle = {
    fontSize: '1.5rem',
    textAlign: 'center',
    marginTop: '-50px'
};


function QRScanner() {
    const [result, setResult] = useState(null);  //scan result
    const [checkoutResult, setCheckoutResult] = useState(null);
    const [visit, setVisit] = useState(null);
    const [error, setError] = useState(false)
    const [showToast, setShowToast] = useState(false)
    const [sending, setSending] = useState(false)
     
    const history = useHistory();
    const location = useLocation();
    
    const confirmRef = useRef();

    let type;
    if (location.search === "?type=checkout")
        type = 'checkout';
    else if(location.search === "?type=oldbadge")
        type = 'oldbadge';
    else 
        type = 'preregistered';
    console.log(type);

    useEffect(async () => {  //after scan
        if (result !== null) {
            const visit = JSON.parse(result);

            console.log(visit.visitid);
            try {      
                const res = await fetch('http://192.168.0.23:4001/api/visit/'+visit.visitid, []);
                const json = await res.json();
                if (json.result === 'ok') {
                    console.log("VISIT: ",json.visit);
                    setVisit(() => json.visit);
                }
                else
                    setError(true);
                
                    
                
            } catch (err) {
                setError(true);
            }
          
        }
        
    }, [result]);
    
    async function confirm(){ //after get info
        try {      
                       
            if (type === 'checkout') {
                setSending(true);
                const res = await postData('http://192.168.0.23:4001/api/visit/checkout', { qr: result });
                if (res.result !== 'ok') {
                    setError(true);
                }    
                setShowToast(true);
            }else {
                history.push(
                    {
                    pathname: '/agreement',
                    state: {
                        detail: {
                            visitorname:  visit.firstname,
                            company: visit.companyname,
                            email: visit.email,
                            telephone: visit.phonenum,
                            contactname: visit.contactname,
                            contactid: visit.contact,
                            visitid: type === 'preregistered' ? visit._id : ''
                        }
                    }
                });
            } 
            } catch (err) {
            setError(true);
            setShowToast(true);
        }
          
        
        
    }

    return <IonPage>
        <Header text='Please Scan your QR Code' icon={faArrowLeft} action={history.goBack} /> 
        <IonContent >
             <div style = {camStyle} hidden={null!==visit}>
             <QrReader
                 delay={100}
                 style={previewStyle}
                 onError={(err)=>console.error(err)}
                 onScan={(res) => { if(result===null)setResult(() => res)}}/>

            </div>
            <IonCard hidden={null===visit} >
                <IonCardHeader>
                   
                      <IonTitle style={{textAlign:'center'}}>{type?.toUpperCase()}</IonTitle>
                    <hr/>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        <IonItem>
                            Visitor : {visit?.firstname}  
                        </IonItem>
                        
                               <IonItem >
                                   From : {visit?.companyname}  
                               </IonItem>
                               <IonItem>
                                   Email : {visit?.email}  
                               </IonItem>
                               <IonItem>
                                   Telephone : {visit?.phonenum}  
                               </IonItem>                        
                        
                               <IonItem>
                                   Contact : {visit?.contactname}  
                              </IonItem>
                        <div hidden={type !== 'checkout'}>
                                <IonItem>
                                   Checkin Time : { visit?.checkin}  
                               </IonItem>
                        </div>
                        <div hidden={type!=='preregistered'}>
                              <IonItem>
                                  Preregistered Time : { visit?.preregistertime}  
                              </IonItem>
                        </div>
                    </IonList>
                    <IonButtons>
                        <IonButton size='small' expand='block' onClick={()=>history.goBack()}>Back</IonButton>
                        <IonButton size='small' expand='block' disabled={sending} onClick={() => confirm()}>Confirm</IonButton>
                    </IonButtons>

                </IonCardContent>
            </IonCard>
             <IonToast
                isOpen={showToast}
                onDidDismiss={() => history.push('/')}
                message={error ? "Operation fails...":"You checked out successfully."}
                duration={2000}
                position='middle'
            />
        </IonContent>
       
        </IonPage>
}

export default QRScanner;