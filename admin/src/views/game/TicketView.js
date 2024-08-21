import { Link, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCardText,
  CCardTitle,
  CCol,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSwitch,
  CFormTextarea,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableCaption,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { getApiCall, postApiCall, putApiCall } from 'src/services/AppSetting'
import { base } from 'src/constants/Data.constant'
import Toast from 'src/components/toast/Toast'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TicketView = (props) => {
  const [ticket, setTicket] = useState([])
  useEffect(() => {
    ticketCardView()
  }, [props])
  const { id } = useParams()
  console.log('iidd', id)
  const ticketCardView = async () => {
    let req = {
      gameId: id,
    }
    // let result = await getApiCall(base.ticketCardView)
    let result = await postApiCall(base.ticketCardView, req)
    console.log('resultttweww', result)
    try {
      let convertJSON = JSON.parse(result.data[0].ticket_set)
      console.log('convertJSONnn', convertJSON[0].dateSet)
      setTicket(convertJSON)
    } catch (error) {
      console.log('errorjson', error)
    }
  }

  const _render_ticket_card_view = (data) => {
    {
      return data?.map((item, index) => {
        // console.log('card_view_item', item)
        return (
          <CCol sm={6} key={index} className='ticketViewOuterContainer'>
            <CCard>
              <CCardBody>
                <div className='ticketCardInfo'>
                  <div className='ticketCardInfoDetails'>
                    Name: {item.userName != '' ? item.userName : 'Un Sold'}
                  </div>
                  <div className='ticketCardInfoDetails'>
                    Phone Number: {item.userPhone != '' ? item.userPhone : 'N/A'}
                  </div>
                </div>
                <div className='ticketCardInfo'>
                  <div className='ticketCardInfoDetails'>
                    Agent Name: {item.agentId != '' ? item.agentId : 'Un Sold'}
                  </div>
                  <div className='ticketCardInfoDetails'>
                    Ticket Number: {item.ticketUniquieId != '' ? item.ticketUniquieId : 'N/A'}
                  </div>
                </div>
                <div className='ticketNumberOuterContainer'>
                  <div className='ticketNumberInnerContainer'>
                    {item?.dateSet?.map((innerItem, index) => (
                      <div
                        className='ticketNumberText'
                        style={{
                          color: innerItem.number == 0 ? '#fff' : '#000',
                        }}
                        key={index}
                      >
                        {innerItem.number}
                      </div>
                    ))}
                  </div>
                </div>
              </CCardBody>
            </CCard>
          </CCol>
          // <div>test1</div>
        )
      })
    }
  }

  return (
    <CRow>{_render_ticket_card_view(ticket || [])}</CRow>
    // <div style={{ flex: 1, background: 'red' }}></div>
  )
}
// const Styles = {
//   ticket- container: {
//     display: flex,
//     flex-wrap: wrap,
//       justify : content: center,
//         margin : top: 20px,
// }}

//   .ticket {
//     display: flex;
//   flex - direction: column;
//   align - items: center;
//   margin: 10px;
//   padding: 10px;
//   border: 1px solid #ccc;
// }

//   .ticket - cell {
//     width: 40px;
//   height: 40px;
//   display: flex;
//   justify - content: center;
//   align - items: center;
//   border: 1px solid #ccc;
//   margin: 2px;
//   font - weight: bold;
// }}
// </style>

export default TicketView
