import React, { useEffect, useState } from 'react'
import "./Winner.css"

const Winner = (props) => {
  const { ticket } = props;
  const [quickSeven, setQuickSeven] = useState("");
  const [topLine, setTopLine] = useState("");
  const [middleLine, setMiddleLine] = useState("");
  const [bottomLine, setBottomLine] = useState("");
  const [firstFullHouse, setFirstFullHouse] = useState("");
  const [secondFullHouse, setSecondFullHouse] = useState("");
  // const [ticketData, setTicketData] = useState([]);

  useEffect(() => {
    setWinnerPrize();
  }, [props]);

  const setWinnerPrize = async () => {
    try {
      // let totalWinner = "";
      ticket.map((ticketItem, ticketIndex) => {
        console.log("ticketItemee", ticketItem.winnerTag, ticketItem.userName);
        if (ticketItem.winnerTag == 'quick_seven') {
          setQuickSeven(ticketItem.userName)
          // totalWinner = totalWinner+1
        }
        if (ticketItem.winnerTag == 'top_line') {
          setTopLine(ticketItem.userName)
          // totalWinner=totalWinner+2
        }
        if (ticketItem.winnerTag == 'middle_line') {
          setMiddleLine(ticketItem.userName)
          // totalWinner=totalWinner+3
        }
        if (ticketItem.winnerTag == 'bottom_line') {
          setBottomLine(ticketItem.userName)
          // totalWinner=totalWinner+4
        }
        if (ticketItem.winnerTag == 'firstFullHouse') {
          setFirstFullHouse(ticketItem.userName)
          // totalWinner=totalWinner+5
        }
        if (ticketItem.winnerTag == 'secondFullHouse') {
          setSecondFullHouse(ticketItem.userName)
          // totalWinner=totalWinner+6
        }

      })
      // if(totalWinner == 6){
      //   alert("GAMEOVER")
      // }
    } catch (e) {
      console.log("errorlog", e);
    }
  }

  return (
    <div className='winnerSectionOuterContainer'>
      {/* <div className='winnerSectionHeadingContainer'>Winner Section{JSON.stringify(ticket)}</div> */}
      <div className='winnerSectionHeadingContainer'>Winner Announcement</div>

      <div className='winnerSectionContainer'>
        <div className='winnerSectionInnerContainer'>
          <p className='winnerSectionContainerTitle'>Quick Seven</p>
          <p className="winnerName">{quickSeven}</p>
        </div>
        <div className='winnerSectionInnerContainer'>
          <p className='winnerSectionContainerTitle'>Top Line</p>
          <p className="winnerName">{topLine}</p>
        </div>
        <div className='winnerSectionInnerContainer'>
          <p className='winnerSectionContainerTitle'>Middle Line</p>
          <p className="winnerName">{middleLine}</p>
        </div>
        <div className='winnerSectionInnerContainer'>
          <p className='winnerSectionContainerTitle'>Bottom Line</p>
          <p className="winnerName">{bottomLine}</p>
        </div>
        <div className='winnerSectionInnerContainer'>
          <p className='winnerSectionContainerTitle'>First Full House</p>
          <p className="winnerName">{firstFullHouse}</p>
        </div>
        <div className='winnerSectionInnerContainer'>
          <p className='winnerSectionContainerTitle'>Second Full House</p>
          <p className="winnerName">{secondFullHouse}</p>
        </div>
      </div>
    </div>
  )
}

export default Winner