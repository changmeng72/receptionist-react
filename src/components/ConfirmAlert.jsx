import {IonAlert} from '@ionic/react'

function ConfirmAlert({ isOpen, header, message, close, confirm }) {
    return (<>
        <IonAlert
          isOpen={isOpen}
          onDidDismiss={() => close()}
          cssClass='my-custom-class'
          header={header?header:'Please Confirm your choice '}
          message={message}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                close();
              }
            },
            {
              text: 'Confirm',
              handler: () => {
                  confirm();
              }
            }
          ]}
        />  
    </>);
}

export default ConfirmAlert;