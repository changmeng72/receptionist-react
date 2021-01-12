 
import { IonCol, IonCard, IonCardContent, IonList,IonItem } from '@ionic/react';
import React from 'react';
import InitialAvatar from './InitialAvatar';
  
     

const EmployeeCard = React.forwardRef(({ employee, clickHandler }, ref) => {
    return (
        <IonCol size-md='3' size-sm='4' size-xl='2'>
            <IonCard button onClick={() => clickHandler(employee)} ref={ref}>
            
                <InitialAvatar src={ employee.photo ? ('http://192.168.0.23:4001/staff/image/' + employee._id + "_thumbnail.png") : ('')} name={employee.firstname} num= {2} />
                <IonCardContent>
                    <IonList>
                        <IonItem><strong>{employee.firstname}</strong></IonItem> 
                    <IonItem style={{fontSize:'0.7rem'}}><i>{employee.position}</i></IonItem>
                        <IonItem style={{ fontSize: '0.7rem' }}>{employee.department}</IonItem> 
                    </IonList>
                    
                </IonCardContent>
            </IonCard>
        </IonCol>
    );
});

export default EmployeeCard;