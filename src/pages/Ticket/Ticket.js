import React, { useState, useEffect } from "react";
import "./Ticket.css";
import GameInfo from "../GameInfo/GameInfo";
import { getApiCall, postApiCall, putApiCall } from "../../services/AppSetting";
import { base } from "../../constants/Data.constant";

const Ticket = (props) => {
  const { number, gameId, ticket } = props;
  // console.log("ticketprops", ticket);
  // console.log("numberprops", number);
  const [ticket1, setTicket1] = useState([]);

  useEffect(() => {
    const ticketCutHiglight = async () => {
      number?.map((numberData, index) => {
        const filterTicket = ticket.filter((data) => data.userName != ""); //new add
        // console.log("filterTicketlog", filterTicket);
        let aarr = filterTicket;
        aarr?.map((ticketData) => {
          // console.log("sssss", ticketData)
          ticketData?.dateSet?.map((ticketDataNumber, index) => {
            // console.log("ticketDataNumberrrr", ticketDataNumber);
            // console.log("ifcon1", numberData.number, ticketDataNumber.number, numberData.status);
            if (
              numberData.number == ticketDataNumber.number &&
              numberData.status == "true"
            ) {
              // console.log("ifcon", numberData.number, ticketDataNumber.number, numberData.status);
              ticketDataNumber.status = true;
            }
          });
          // console.log("ticketDatasetttypoflh", typeof ticketData)
          // console.log("ticketDatasetttypoflengthhh", ticketData)
          // setTicket(ticketData)
        });
        setTicket1(aarr);
      });
    };
    ticketCutHiglight();
  }, [number]);

  return (
    <div className="ticketSection">
      {ticket1?.length > 0 &&
        ticket1?.map((item, index) => {
          if (item.userName != "") {
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
                    <div className="containerInfoInnerItem">
                      {item.winnerTag}
                    </div>
                  </div>
                  <div className="number-card">
                    {/* {console.log("eeeeewwew1", ticket[0].dateSet)}
              {console.log("eeeeewwew2", JSON.stringify(ticket.dateSet[0]))} */}
                    {/* {ticket?.map((itemData) => { */}
                    {item?.dateSet?.map((item) => {
                      // console.log("itemdatasetitemmnumbetypof", item);
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
                    {/* } */}
                  </div>
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Ticket;
