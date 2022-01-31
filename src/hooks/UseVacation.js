import axios from "axios";
import moment from "moment";
//import moment from "moment";
import { useEffect, useRef, useState } from "react";

import trashimg from "../assets/images/trash.png"
import '../pages/vacationPeriod.scss'



export function UseVacation (){
    const[vacations, setVacations] = useState([]);
    const isInitialMount = useRef(true);
    
    
    useEffect(() =>{
        
        axios.get('http://localhost:4000/api/getCoverage').then( (res) =>{
            
            setVacations(res.data);

            //console.log("vactest: "+ JSON.stringify(vacations))
            //console.log(res.data);
        }).catch((err)=>{
            alert("Error extracting the data from API: "+err);
        })

    },  /*[]*/ )

    
    //console.log("out: "+vacations)

    /**const getApi = async () => {
            try {
                const res = await axios.get('http://localhost:4000/api/getCoverage')
                setVacations(res.data);      
            }catch(error) {
                console.log(error)
            }                
        }
        getApi() */

        

    return (
        <div>
            {vacations.map( (vac) => {
                return(
                    <div className="vacationDIV">
                        
                        <div>
                            <p>{vac?.convering} is covering {vac?.underCover}</p>
                            <p>from {moment(vac?.startdate).format("L") } to { moment(vac?.enddate).format("L") }</p>
                        </div>
                        <div className="cancelVAc">
                            <form method="POST" action={"http://localhost:4000/api/update/"+vac?._id}>

                                <button type="submit">
                                    <img src={trashimg} alt="Click here to delete vacation coverage"/>                            
                                </button>
                            </form>
                        </div>
                        

                    </div>
                )
            })}
        </div>
    )

}