
import React, { useEffect, useState ,useRef,useCallback} from 'react';
import {useHistory,useLocation} from 'react-router-dom'
import { IonPage,IonRow, IonGrid, IonContent,IonSearchbar,IonLabel} from "@ionic/react";
import EmployeeCard from '../components/EmployeeCard'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import Header from '../components/Header/App'
import ConfirmDialog from '../components/ConfirmDialog'
import ConfirmAlert from '../components/ConfirmAlert'

function useEmployeeSearch(query, pageNumber) {
    
    const [employees, setEmployees] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [error, setError] = useState(false);
    
    useEffect(() =>
        setEmployees(()=>[])
        , [query]);
     
    useEffect(() => {
    const fetchData = async () => {
        try {
            setError(false);
            if (pageNumber === 1) setHasMore(() => true);
            if (hasMore || pageNumber===1) {
                setIsLoading(() => true);
                const offset = pageNumber * 10 - 10;
                const res = await fetch('http://192.168.0.23:4001/api/employees?search='+query+'&offset='+offset+'&limit=10', []);
                const json = await res.json();
                setEmployees(prevS => [...prevS, ...json.rows]);                
                
                if (parseInt(json.total) === (parseInt(json.totalNotFiltered) + pageNumber * 10 - 10)) {
                    setHasMore(false);                    
                }
                setIsLoading(false);
            }
      } catch (err) {
            setError(true);
      }
    };
    fetchData();
    }, [query, pageNumber]);
    console.log(employees);
    return {employees,isLoading,hasMore,error}
}

function SearchEmployee(){
    const [searchText, setSearchText] = useState(''); 
    const [pageNumber, setPageNumber] = useState(1);
    
    
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    let history = useHistory();
    const location = useLocation();
     //const res = useFetch("https://192.168.0.23:4000/api/employees", {});
    const [showModal, setShowModal] = useState(false);

    const { employees,isLoading,hasMore,error } = useEmployeeSearch(searchText,pageNumber);
    
    const observer = useRef();

    /*autopagination*/
    const lastEmployeeRef = useCallback(node => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect();

        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                const rect = entries[0].boundingClientRect;
                
                if(rect.y > 200) //to be check
                 setPageNumber(prevPN=>prevPN+1);
            }
         },{});
        if (node) observer.current.observe(node);
    },[isLoading,hasMore]);

    function clickHandler(employee) {
        setSelectedEmployee(() => employee);
        setShowModal(true);
    }
    
    function close() {
        setShowModal(false);
    }
    function confirm (){        
        
        setShowModal(false);

        if (location.search === '?buttontype=1') {
            history.push({
                pathname: '/collectclientinfo',
                state: { detail: { contactid: selectedEmployee._id, contactname: selectedEmployee.firstname } }
            });
        }else {
             history.push({
             pathname: '/delivery',
                 state: {
                     detail: {
                         contactid: selectedEmployee._id,
                         contactname: selectedEmployee.firstname,
                         buttontype: location.search === '?buttontype=2'?2:3,
                     }
                 }
        });
        }

    }
    
        return(
            <IonPage> 
                
                <Header text='Please Select contact' icon={faArrowLeft} action={history.goBack}/> 
               <IonContent style={{marginTop:'18rem'}}>
                  
                    <IonSearchbar value={searchText} onIonChange={e => { setSearchText(e.detail.value); setPageNumber(1) }} showCancelButton="focus" style={{ marginTop: '2rem' }}></IonSearchbar>         
                    
                <IonGrid>
                    <IonRow>
                            {employees.map((employee, index) => {
                                if (index === employees.length - 1)
                                    return <EmployeeCard employee={employee} ref={lastEmployeeRef} key={index} clickHandler={clickHandler} />
                                else
                                    return <EmployeeCard employee={employee} key={index} clickHandler={clickHandler} />
                              
                            })
                            }
                            
                    </IonRow>
                    </IonGrid>
                    <IonLabel>{isLoading && 'Loading'}</IonLabel>
                    <IonLabel>{ error && 'Error'}</IonLabel>
                </IonContent>
                        
                <ConfirmDialog isOpen={false} close={close} confirm={confirm} message={'Do you want to visit ' + selectedEmployee?.firstname +'?'}/>
                <ConfirmAlert isOpen={showModal} close={close} confirm={confirm} message={'Do you want to visit ' + selectedEmployee?.firstname +'?'}/>  
                    
            </IonPage>
        );  

}

export default SearchEmployee;