import { FormEvent, useState } from "react";
import axios from 'axios';


import '../pages/global.scss'
import { UseVacation } from "../hooks/UseVacation";



export function MainPage(){

    const [employeeVacation, setEmployeeVacation] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [employeeCovering, setEmployeeCovering] = useState("");


    async function handleNewVacation(event: FormEvent) { //use FormEvent when using a form from HTML
        event.preventDefault();
        
        if(employeeVacation === "" || startDate === null ||
            endDate === null|| employeeCovering === ""){
                alert("You may select values for all fields.");
            
        }else{ 
            const today = new Date();
            if(endDate < today){
                alert("You can't select a date prior today.")
            }else if(employeeVacation === employeeCovering){
                alert("You can't select yourself to cover your own queue.")
            }else{
                
                const detailsFromBody= {
                    employeeOnVacation: employeeVacation,
                    periodstartDate: startDate,
                    periodendDate: endDate,
                    employeellCovering: employeeCovering
                }
    
                //console.log("Here is employee name: "+employeeVacation);
                axios.post("http://localhost:4000/api/save", detailsFromBody).then((res)=>{
                    alert("Coverage saved successfully: "+res);
                }).catch((err)=>{
                    alert("Error sending data to Data Base API: "+err);
                }) 
                
            }       
        }
    }


    return(
        <article>
            <section className="leftSec">
                <h1>Program your vacation Coverage</h1>
                <p>The cases will be populated in our Teams Channel</p>
                <br />
                <div className="contForm">
                    <form onSubmit={handleNewVacation}>
                        <label htmlFor="employee">Select who is the lucky guy: </label>
                        <select name="emp" id="emp" onChange={(e) => setEmployeeVacation(e.target.value)}>
                            <option value="">-- Select the Champion --</option>
                            <option value="Gabriel Donada">Gabriel Donada</option>
                            <option value="Robson Gomes">Robson Gomes</option>
                            <option value="Luiz Junior">Luiz Junior</option>

                        </select>
                        <br />
                        <br />

                        <label htmlFor="startDate">Select the Start date: </label>
                        <input type="date" name="sdate" id="sdate" onChange={(e) => setStartDate(new Date(e.target.value))} required/>
                        <br />
                        <br />

                        <label htmlFor="startDate">Select the End date: </label>
                        <input type="date" name="edate" id="edate" onChange={(e) => setEndDate(new Date(e.target.value))} required/>
                        <br />
                        <br />

                        <label htmlFor="employee">Select who will cover: </label>
                        <select name="coveremp" id="coveremp" onChange={(e) => setEmployeeCovering(e.target.value)}>
                            <option value="">-- Choose your fighter --</option>
                            <option value="Gabriel Donada">Gabriel Donada</option>
                            <option value="Robson Gomes">Robson Gomes</option>
                            <option value="Luiz Junior">Luiz Junior</option>
                        </select>
                        <br />
                        <br />

                        <button type="submit">Submit Vacation Coverage</button>
                    </form>
                </div>
            </section>
            <section className="rightSec">

                <div className="vacationsDiv">
                    <h1>List of Coverage:</h1>
                    <UseVacation/>
                </div>

            </section>
        </article>
    );
}