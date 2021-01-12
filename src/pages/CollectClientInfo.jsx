import { Field} from 'formik';
import { IonContent,IonPage,IonCard,IonCardContent } from '@ionic/react';
import * as Yup from 'yup';
import { TextField } from 'formik-material-ui';
import FormikStepper from '../components/FormikStepper';
import Header from '../components/Header/App';
import { faArrowLeft, faQrcode } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';


function CollectClientInfo() {
    const history = useHistory();
    const location = useLocation();
    console.log(location.state?.detail);
    return (
        <IonPage>
         <Header text='Please Enter Your Information' icon={faArrowLeft} action={history.goBack} /> 
            <IonContent style={{ width: '80%', left: '10%' }}>
                <IonCard style={{ marginTop:'3rem'}}><IonCardContent>
                <FormikStepper
                   
                    initialValues={{
                        visitorname: location.state?location.state.detail.visitorname:'',
                        company: '',
                        email: '',
                        telephone: ''
                    }}
                    onSubmit={(values, helper) => {
                        console.log(values);
                        history.push({                    
                            pathname: '/agreement',
                            state: { detail: { ...values, ...location.state.detail } }
                        });
                    }}           
            >
                
                     
                    <Field name='visitorname' component={TextField} label='Full Name' placeholder='John Smith' fullWidth validationSchema={Yup.object({
                    visitorname: Yup.string().
                        required('Required').
                        min(2, 'Must be 2 or more characters!').
                        max(100, 'No more than 100 charaters!')               
                })}>
                    </Field>
                    
                     
                    <Field name='company' component={TextField} label='Company Name' fullWidth validationSchema={Yup.object({
                    
                    company: Yup.string().min(2, 'Must be 2 or more characters!').
                        max(100, 'No more than 100 charaters!')              
                })}>
                    </Field>
                        
                        
                     <Field  name='email' component={TextField} label='Email Address' fullWidth validationSchema={Yup.object({                     
                    email: Yup.string().email('Invalid email address')             
                })}>
                    </Field>
                       
                        
                     <Field name='telephone' component={TextField} label='Telephone Number' fullWidth validationSchema={Yup.object({                    
                    telephone:Yup.string().min(3,'Must 3 or more digits').max(20,"No more than 20 digits")                
                })}>
                    </Field>
                        
                        
                

            </FormikStepper>
</IonCardContent></IonCard>
            </IonContent>
            </IonPage>
    );
}


export default CollectClientInfo;