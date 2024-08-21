import React, { useState, useEffect } from "react";
import "./Ticket.css";
import GameInfo from "../GameInfo/GameInfo";
import { getApiCall, postApiCall, putApiCall } from "../../services/AppSetting";
import { base } from "../../constants/Data.constant";


const PrevTicket = () => {
    const [prevTicket, setPrevTicket] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [gameInNameList, setGameInNameList] = useState([]);

    const handleSelectChange = (event)=>{
        setSelectedOption(event.target.value);
        getGameDetailsForUser(event.target.value)
    }

    // useEffect(() => {
    //     const ticketCutHiglight = async () => {
    //     number?.map((numberData, index) => {
    //         const filterTicket = ticket.filter((data) => data.userName != ""); //new add
    //         // console.log("filterTicketlog", filterTicket);
    //         let aarr = filterTicket;
    //         aarr?.map((ticketData) => {
    //         // console.log("sssss", ticketData)
    //         ticketData?.dateSet?.map((ticketDataNumber, index) => {
    //             // console.log("ticketDataNumberrrr", ticketDataNumber);
    //             // console.log("ifcon1", numberData.number, ticketDataNumber.number, numberData.status);
    //             if (
    //             numberData.number == ticketDataNumber.number &&
    //             numberData.status == "true"
    //             ) {
    //             // console.log("ifcon", numberData.number, ticketDataNumber.number, numberData.status);
    //             ticketDataNumber.status = true;
    //             }
    //         }); 
    //         });
    //         setPrevTicket(aarr);
    //     });
    //     };
    //     ticketCutHiglight();
    // }, [number]);

    useEffect(() => { 
        gameInName_list();
    }, []);
 
    
  const gameInName_list = async () => {
    try {
        let result1 = await getApiCall(base.getGameIdAndGameNameForUser)
        if(result1.length>0){
            setGameInNameList(result1)
        }
    } catch (error) {}
  }

    const getGameDetailsForUser =async (gameNameSelected)=>{
        let req={ 
            gameName:gameNameSelected
        }
        let result = await postApiCall(base.getGameDetailsForUser, req)
        try {
            let convertJSON = JSON.parse(result.data[0].ticket_set);
            console.log("convertJSONNNNN",convertJSON);
            setPrevTicket(convertJSON)
          } catch (error) {
        } 
    }

    return (
        <div className="ticketSection">
        <div className="prevGameDetails"> 
            <div class="dropdown">
                <div class="dropdown-content">
                <select id="gameNameList" name="gameNameList" value={selectedOption} onChange={handleSelectChange}>
                    <option value="">{selectedOption==""? "Select Game Name" : selectedOption}</option>
                    {gameInNameList?.map((item,index)=>(
                        <option key={index} value={item.game_name}>
                            {item.game_name}
                        </option>
                    ))} 
                </select>
              </div>
            </div>
          </div>
        {prevTicket?.length > 0 &&
            prevTicket?.map((item, index) => {
            console.log("itemuserswinnertag", item.winnerTag);
                return (
                    <div className="outerContainer">
                        <div className="container mx-auto mt-8">
                        <div className="containerInfo">
                            <div className="containerInfoFirstInnerItem">
                            <div className="containerInfoInnerItemSerial">
                                {item.id}
                            </div>
                            <div className="containerInfoInnerItem">
                                {item.userName}
                                {item.userPhone}
                            </div>
                            </div>
                            {/* <div className="containerInfoInnerItem">{item.winnerTag},{item.winnerPrize}</div> */}
                            {item.winnerTag == "" ? (<></>) : (
                                <div className="containerInfoInnerItem">
                                    {item.winnerTag}
                                </div>
                            )}
                            <div className="containerInfoInnerItem">
                            {item.userName == "" ? "UNSOLD":"SOLD"}
                            </div>
                        </div>
                        <div className="number-card"> 
                            {item?.dateSet?.map((item) => {
                            return (
                                <div
                                className="number"
                                style={{
                                    background: item.status == true ? "red" : "#fff",
                                    color: item.status == true ? "#fff" : "#000",
                                    borderRadius: item.status == true && "100%", 
                                }}
                                >
                                {item.number}
                                {item.status}
                                </div>
                            );
                            })}
                        </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default PrevTicket