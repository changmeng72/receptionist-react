

//React-signature-canvas/react-signature-pad/ js ..keywords react signature pad canvas

import { IonContent, IonText, IonButton, IonItem,IonPage,IonCard,IonCardContent } from '@ionic/react';
import React, { useState, useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Header from '../components/Header/App';
import Footer from '../components/Footer/App';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory, useLocation } from 'react-router-dom';
import postData from '../services/postData';
function AgreementSign() {
    const [sigCanvas, setSigCanvas] = useState(null);
    const ref = useRef(null);
    const history = useHistory();
    const location = useLocation();

   async function  submit() {
       try {    
           const data = { signature: sigCanvas.toDataURL('png', []), visitor: location.state?.detail };
           console.log(data);
           let json;
           postData("http://192.168.0.23:4001/api/visit", data).then(json => {
           
               if (json.result === 'ok') {
                   history.push({
                       pathname: '/printbadge',
                       state: { detail: json }                       
                   });
                  
               }
           });
        // location.state.detail 
       } catch (err) {
           console.error(err);
       }
    }
    return (
        <IonPage>
            <Header text='On premise security agreement' icon={faArrowLeft} action={history.goBack} />    
           
            <IonContent style={{ width: '80%', left: '10%' }}>
                <IonCard><IonCardContent>
            <IonText  >
                <h1 style={{textAlign:'center'}}>
                    Security agreement</h1>
                <i>
From Wikipedia, the free encyclopedia
 </i><p>
For agreements pertaining to the national security of participating states, see Treaty.
A security agreement, in the law of the United States, is a contract that governs the relationship between the parties to a kind of financial transaction known as a secured transaction. In a secured transaction, the Grantor (typically a borrower but possibly a guarantor or surety) assigns, grants and pledges to the grantee (typically the lender) a security interest in personal property which is referred to as the collateral. Examples of typical collateral are shares of stock, livestock, and vehicles. A security agreement is not used to transfer any interest in real property (land/real estate), only personal property. The document used by lenders to obtain a lien on real property is a mortgage or deed of trust.
</p><p>
The security agreement sets out the various rights the grantee will have with respect to the collateral, which are in addition to all other rights which the lender may have by law, such as those rights contained in Article 9 of the Uniform Commercial Code which has been adopted in some form by each state in the United States. The Security Agreement also addresses issues such as permitted sales or other transactions with the collateral in the ordinary course of the grantor's business and notices that may be required to be given by the grantee to the grantor if certain actions are taken. There are many forms available for purchase from legal supply and banker supply companies, in addition to software that will produce a security agreement according to specific user input.
</p><p>
A security agreement may be oral if the secured party (the lender) has actual physical possession of the collateral. Where the collateral remains in the physical possession of the borrower, or where the collateral is intangible (such as a patent.,[1] accounts receivable, or a promissory note), the security agreement must be in writing in order to satisfy the statute of frauds. The security agreement must be authenticated by the debtor, meaning that it must either bear the debtor's signature, or it must be electronically marked. It must contain a reasonable description of the collateral, and must use words showing an intent to create a security interest (the right to seek repayment of the loan by foreclosing on the collateral). In order for the security agreement to be valid, the borrower must usually have rights in the collateral at the time the agreement is executed. If a borrower pledges as collateral a car owned by a neighbor, and the neighbor does not know of and endorse this pledge, then the security agreement is ineffective. However, a security agreement may specify that it includes after-acquired property. If such a specification is included, then a pledge of "all automobiles owned by borrower" would include the neighbor's car if the borrower were to buy that car from the neighbor.
</p><p>
In order for a security interest to attach to the collateral in the possession of subsequent purchasers, it must be perfected. If the security agreement is for a purchase money security interest in consumer goods, perfection is automatic. Otherwise, the lender must record either the agreement itself, or a UCC-1 financing statement, in an appropriate public venue (usually the state secretary of state or a state business commission under that person's authority). Perfecting the interest creates constructive notice, which is deemed legally sufficient to inform the rest of the world of the lender's rights in the collateral. Where a borrower has used the same property as collateral with respect to multiple security agreements made with different lenders, the first lender to record the interest has the strongest claim to that property.
</p><p>
                    Under Dutch (Netherlands) law, the Dutch Civil Code describes suretyship as an agreement in which a third party undertakes towards a contractual creditor to perform the contractual obligations of a debtor. Such a suretyship agreement is entered into between the surety and the creditor. The debtor of the secured obligation is not required to be a party to such an agreement. It is even thinkable that such a surety agreement is entered into without the knowledge or consent of the debtor. Article 7:850 of the Dutch Civil Code states: 1. A surety agreement is an agreement under which one of the parties ('the surety') has engaged himself towards the other party ('the creditor') to perform an obligation which a third party ('the principal debtor') is or will be due to the creditor. 2. For the validity of a surety agreement it is not required that the principal debtor is aware of the existence of the involved suretyship. 3. The statutory provisions for joint and several obligations apply to a surety agreement as far as the provisions of the present Title do not derogate from them. Regarding the nature of the obligation secured with a suretyship agreement under Dutch law, article 7:854 of the Dutch Civil Code provides: Where the object of the secured obligation of the principal debtor is another performance than the payment of a sum of money, the surety agreement is regarded to be entered into as security for the creditor's debt-claim for damages in money, indebted by the principal debtor when he has not performed his principal obligation to the creditor, unless the surety agreement explicitly provides otherwise. [2]
</p>
            </IonText>
            <SignatureCanvas 
                canvasProps={{ width: 500, height: 200, className: 'sigCanvas', border: '1px solid red' }}
                backgroundColor='rgba(23,45,66,0.4)'
             ref={(ref) => { setSigCanvas(ref) }}/>,
            <IonItem>
            <IonButton color="success" onClick={()=> submit()}>Submit</IonButton>
                <IonButton color="medium" onClick={()=>{sigCanvas.clear()}}>Clear</IonButton>
                    </IonItem>
                </IonCardContent>
                    </IonCard>
            </IonContent>
            <Footer text='Scroll to the end to sign your signature'/>
        </IonPage>);
}

export default AgreementSign;