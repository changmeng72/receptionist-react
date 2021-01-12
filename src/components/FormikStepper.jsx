import { Formik,Form } from 'formik';
import React, { useState } from 'react';
import { IonButton,IonGrid,IonRow ,IonCol} from '@ionic/react';
import { Stepper, Step, StepLabel } from '@material-ui/core';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useHistory,useLocation} from 'react-router-dom'


export default function FormikStepper({ children, ...props }) {

    const childrenArray = React.Children.toArray(children);
    const [step, setStep] = useState(0);
    const location = useLocation();
    const history = useHistory();

    return (<Formik
         
        validationSchema={childrenArray[step].props.validationSchema}
        {...props}
        onSubmit={(values, helper) => {
            if (step === childrenArray.length - 1)
                props.onSubmit(values, helper);
            else {
                setStep(s => s + 1);
                return false;
            }
        
        }}
    >
        <Form autoComplete='off'>
           
        
            <Stepper alternativeLabel activeStep={step} style={{ paddingLeft: '0px',paddingRight:'0px'}}>
                {childrenArray.map((child) => (
                    <Step key={child.props.label}>
                        <StepLabel>{child.props.label}</StepLabel>
                    </Step>
                )
                )}         
            </Stepper> 
            <IonGrid><IonRow><IonCol size-xs='1'  style={{paddingTop:'1.4rem'}} >
                <IonButton disabled={step === 0 ? true : false} size='small'  onClick={
                () => {
                    if(step>0)
                        setStep((step) => step - 1)                    
                }}>
                Prev</IonButton></IonCol><IonCol>
                    {childrenArray[step]}
                 </IonCol><IonCol size-xs='1' style={{paddingTop:'1.4rem'}}>   
               <IonButton size='small' type='submit' style={{paddingBottom:'0.1rem'}} >
                {step === childrenArray.length - 1 ? 'Proceed' : 'Next'}
            </IonButton></IonCol>
             </IonRow>
          
            <IonRow style={{justifyContent:'center'}}>
           <IonButton size='small' color='success' onClick={()=>history.push({
                pathname: '/qrscan',
                search: 'type=oldbadge',
                state:{detail:location.state.detail}             
                
            })}>
                <FontAwesomeIcon icon={faQrcode} style={{ fontSize: '1rem', marginRight: '0.51rem' }} >
                </FontAwesomeIcon>
                I have a used badge
            </IonButton>
            </IonRow>
           </IonGrid>
                   
                
        </Form>
    </Formik>);
    
}