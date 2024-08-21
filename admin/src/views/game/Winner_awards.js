import { Link, useParams, useRoutes } from 'react-router-dom'
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

const Winner_awards = (props) => {
  console.log('iiddprops', props)
  const [ticket, setTicket] = useState([])
  const [quickSevenPrize, setQuickSevenPrize] = useState('')
  const [topLinePrize, setTopLinePrize] = useState('')
  const [middleLinePrize, setMiddleLinePrize] = useState('')
  const [bottomLinePrize, setBottomLinePrize] = useState('')
  const [firstFullHousePrize, setFirstFullHousePrize] = useState('')
  const [secondFullHousePrize, setSecondFullHousePrize] = useState('')
  // const [allData, setAllData] = useState([])
  const [allData, setAllData] = useState('')
  useEffect(() => {
    ticketCardView()
  }, [props])
  const { id } = useParams()
  console.log('iidd', id)
  // const route = useRoutes()
  // const user = route?.params?.user

  const ticketCardView = async () => {
    let req = {
      gameId: id,
    }
    // let result = await getApiCall(base.ticketCardView)
    let result = await postApiCall(base.ticketCardView, req)
    console.log('resultttweww', result)
    setQuickSevenPrize(result.data[0].quick_seven_prize)
    setTopLinePrize(result.data[0].top_line_prize)
    setMiddleLinePrize(result.data[0].middle_line_prize)
    setBottomLinePrize(result.data[0].bottom_line_prize)
    setFirstFullHousePrize(result.data[0].first_full_house_prize)
    setSecondFullHousePrize(result.data[0].second_full_house_prize)
    // console.log('resultttweww', JSON.parse(result.data[0].ticket_set))
    // let test = result?.data[0]?.ticket_set
    // console.log('testtest', test)
    // const filteredData = test?.filter((item) => item.winnerTag !== '')
    // const filteredData = test?.filter((item) => console.log('itemmmmtest', item))
    // console.log('resultttwewwdata', filteredData)
    //
    const data = result.data[0]
    console.log('datadatataaa', data)
    setAllData(result.data[0])
    try {
      let convertJSON = JSON.parse(result.data[0].ticket_set)
      console.log('convertJSONconvertJSONconvertJSON', convertJSON)
      const filteredData = convertJSON.filter((item) => item.winnerTag !== '')
      console.log('filteredDataasa', filteredData)

      //   convertJSON.map((itemForWinnerTag, indexForWinnerTag) => {
      //     console.log('itemForWinnerTaggggg', itemForWinnerTag)
      //   })
      //   console.log('convertJSONnn', convertJSON[0].dateSet)
      setTicket(filteredData)
    } catch (error) {
      //   console.log('errorjson', error)
    }
  }

  const _render_ticket_card_view = (data) => {
    console.log('card_view_ite_data', data)
    // if (data && data.length == 0) {
    // } else {
    return data?.map((item, index) => {
      // console.log('allDataItem', allDataItem)
      console.log('card_view_item', item)
      return (
        // <CCol sm={6} style={{ margin: '10px 0' }} key={index}>
        //   <CCard>
        //     <CCardBody>
        //       <div
        //         style={{
        //           flex: 1,
        //           display: 'flex',
        //           flexDirection: 'row',
        //           justifyContent: 'space-between',
        //         }}
        //       >
        //         <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        //           Name: {item.userName != '' ? item.userName : 'Un Sold'}
        //         </div>
        //         <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        //           Phone Number: {item.userPhone != '' ? item.userPhone : 'N/A'}
        //         </div>
        //       </div>
        //       <div
        //         style={{
        //           flex: 1,
        //           display: 'flex',
        //           flexDirection: 'row',
        //           justifyContent: 'space-between',
        //         }}
        //       >
        //         <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        //           Agent Name: {item.agentId != '' ? item.agentId : 'Un Sold'}
        //         </div>
        //         <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        //           Ticket Number: {item.ticketUniquieId != '' ? item.ticketUniquieId : 'N/A'}
        //         </div>
        //       </div>
        //       <div
        //         style={{
        //           flex: 1,
        //           display: 'flex',
        //           flexDirection: 'row',
        //           justifyContent: 'space-between',
        //         }}
        //       >
        //         <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        //           Game Winner Name: {item.agentId != '' ? item.agentId : 'Un Sold'}
        //         </div>
        //         <div style={{ textAlign: 'center', fontWeight: 'bold' }}>
        //           Game Winner Prize: {item.ticketUniquieId != '' ? item.ticketUniquieId : 'N/A'}
        //         </div>
        //       </div>
        //       <div
        //         style={{
        //           display: 'flex',
        //           justifyContent: 'center',
        //         }}
        //       >
        //         <div
        //           style={{
        //             display: 'flex',
        //             flexWrap: 'wrap',
        //             flexDirection: 'row',
        //             justifyContent: 'center',
        //             alignItems: 'center',
        //             margin: '10px',
        //           }}
        //         >
        //           {item?.dateSet?.map((innerItem, index) => (
        //             <div
        //               style={{
        //                 width: '50px',
        //                 height: '50px',
        //                 display: 'flex',
        //                 justifyContent: 'center',
        //                 alignItems: 'center',
        //                 border: '1px solid #ccc',
        //                 fontWeight: 'bold',
        //                 // color: innerItem.number == 0 ? '#fff' : '',
        //               }}
        //               key={index}
        //             >
        //               {innerItem.number}
        //             </div>
        //           ))}
        //         </div>
        //       </div>
        //     </CCardBody>
        //   </CCard>
        // </CCol>
        // <div>test1</div>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardBody>
              <CTable hover responsive>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">#</CTableHeaderCell>
                    {/* <CTableHeaderCell scope="col">Game Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Game Date/Time</CTableHeaderCell> */}
                    <CTableHeaderCell scope="col">Winner Name</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Winner Phone</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Winner Tag</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Winner Prize</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {/* {gameData.map((item, index) => {
                    console.log('gameListttt', item)
                    return ( */}
                  {/* <CTableRow key={index}> */}
                  <CTableRow>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.userName}</CTableDataCell>
                    <CTableDataCell>{item.userPhone}</CTableDataCell>
                    <CTableDataCell>{item.winnerTag}</CTableDataCell>
                    <CTableDataCell>
                      {item.winnerTag === 'bottom_line'
                        ? bottomLinePrize
                        : item.winnerTag === 'top_line'
                        ? topLinePrize
                        : item.winnerTag === 'quick_seven'
                        ? quickSevenPrize
                        : item.winnerTag === 'middle_line'
                        ? middleLinePrize
                        : item.winnerTag === 'firstFullHouse'
                        ? firstFullHousePrize
                        : item.winnerTag === 'secondFullHouse'
                        ? secondFullHousePrize
                        : null}
                    </CTableDataCell>
                    {/* <CTableDataCell>{item.game_maximum_ticket_sell}</CTableDataCell>
                          <CTableDataCell>{item.game_amount}</CTableDataCell>
                          <CTableDataCell>{item.game_status}</CTableDataCell> */}
                  </CTableRow>
                  {/* )
                  })} */}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      )
    })
    // } else {
    //   // Handle the case where data is empty or undefined
    //   console.log('Data is empty or undefined. Cannot render ticket card view.')
    //   return (
    //     <div>
    //       {/* Display a message or placeholder when there is no data */}
    //       No tickets available.
    //     </div>
    //   )
    // }
  }

  return (
    <CRow>{_render_ticket_card_view(ticket || [])}</CRow>
    // <CRow>{_render_ticket_card_view(allData || [])}</CRow>
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

export default Winner_awards
