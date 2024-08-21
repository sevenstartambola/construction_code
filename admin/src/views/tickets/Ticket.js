import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
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
import { getApiCall, postApiCall, putApiCall } from 'src/services/AppSetting';
import { base } from 'src/constants/Data.constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Ticket = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemValue, setItemValue] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState("");
  const [ticketSerialNumber, setTicketSerialNumber] = useState("");
  const [ticketNumber, setTicketNumber] = useState("");
  const [ticketAmount, setTicketAmount] = useState("");
  const [ticketStatus, setTicketStatus] = useState("");

  useEffect(() => {
    ticket_list();
  }, []);

  const ticket_list = async () => {
    let result = await getApiCall(base.ticketList)
    setTicketData(result)
  }

  const save_ticket = async () => {
    let req = {
      ticketSerialNumber: ticketSerialNumber.target.value,
      ticketNumber: ticketNumber.target.value,
      ticketAmount: ticketAmount.target.value,
      ticketStatus: ticketStatus.target.value
    }
    let result = await postApiCall(base.saveTicket, req)
    if (result.code == 200) {
      setVisible(false);
      toast.success("Successfully Created..!");
    }
  }

  const delete_ticket = async (value) => {
    let req = {
      id: value.ticket_id,
      status: "1"
    }
    let result = await putApiCall(base.deleteTicket, req)
    if (result.code == 200) {
      toast.success("Updated Successfully..!");
      setEditModalVisible(false);
    }
  }

  const get_edit_value = async (item) => {
    setEditModalVisible(true)
    setId(item.ticket_id);
    setTicketSerialNumber(item.ticket_serial_number);
    setTicketNumber(item.ticket_number);
    setTicketAmount(item.ticket_amount);
    setTicketStatus(item.ticket_status);
  }

  const edit_ticket = async () => {
    let req = {
      id: id,
      ticketSerialNumber: ticketSerialNumber,
      ticketNumber: ticketNumber,
      ticketAmount: ticketAmount,
      ticketStatus: ticketStatus,
    }
    let result = await putApiCall(base.editTicket, req)
    if (result.code == 200) {
      toast.error("Deleted Successfully..!");
    }
  }

  return (
    <CRow>
      <CCol xs={12} className='mb-4'>
        <CButton color="primary" onClick={() => { setVisible(true) }} onClose={() => setVisible(false)}>Add</CButton>
        <ToastContainer />
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Add</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="ticketSerialNumber">Ticket Serial Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="ticketSerialNumber"
                  placeholder="Ticket Serial Number"
                  onChange={(e) => { setTicketSerialNumber(e) }}
                />
                <CFormLabel htmlFor="ticketNumber">Ticket Number</CFormLabel>
                <CFormInput
                  type="text"
                  id="ticketNumber"
                  placeholder="Ticket Number"
                  onChange={(e) => { setTicketNumber(e) }}
                />
                <CFormLabel htmlFor="ticketAmount">Ticket Amount</CFormLabel>
                <CFormInput
                  type="text"
                  id="ticketAmount"
                  placeholder="Ticket Amount"
                  onChange={(e) => { setTicketAmount(e) }}
                />
                <CFormLabel htmlFor="ticketStatus">Ticket Status</CFormLabel>
                <CFormInput
                  type="text"
                  id="ticketStatus"
                  placeholder="Ticket Status"
                  onChange={(e) => { setTicketStatus(e) }}
                />
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => save_ticket()}>Save</CButton>
          </CModalFooter>
        </CModal>
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ticket Serial Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ticket Number</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ticket Amount</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ticket Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ticketData.map((item, index) => {
                  return <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.ticket_serial_number}</CTableDataCell>
                    <CTableDataCell>{item.ticket_number}</CTableDataCell>
                    <CTableDataCell>{item.ticket_amount}</CTableDataCell>
                    <CTableDataCell>{item.ticket_status}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" className='me-2' onClick={() => { get_edit_value(item) }}>Edit</CButton>
                      <CModal alignment="center" visible={editModalVisible}>
                        <CModalHeader>
                          <CModalTitle>Edit</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CForm>
                            <div className="mb-3">
                              <CFormLabel htmlFor="ticketSerialNumber">Ticket Serial Number</CFormLabel>
                              <CFormInput
                                type="text"
                                id="ticketSerialNumber"
                                placeholder="Ticket Serial Number"
                                onChange={(e) => { setTicketSerialNumber(e) }}
                                defaultValue={ticketSerialNumber}
                              />
                              <CFormLabel htmlFor="ticketNumber">Ticket Number</CFormLabel>
                              <CFormInput
                                type="text"
                                id="ticketNumber"
                                placeholder="Ticket Number"
                                onChange={(e) => { setTicketNumber(e) }}
                                defaultValue={ticketNumber}
                              />
                              <CFormLabel htmlFor="ticketAmount">Ticket Amount</CFormLabel>
                              <CFormInput
                                type="text"
                                id="ticketAmount"
                                placeholder="Ticket Amount"
                                onChange={(e) => { setTicketAmount(e) }}
                                defaultValue={ticketAmount}
                              />
                              <CFormLabel htmlFor="ticketStatus">Ticket Status</CFormLabel>
                              <CFormInput
                                type="text"
                                id="ticketStatus"
                                placeholder="Ticket Status"
                                onChange={(e) => { setTicketStatus(e) }}
                                defaultValue={ticketStatus}
                              />
                            </div>
                          </CForm>
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
                            Cancel
                          </CButton>
                          <CButton color="primary" onClick={() => edit_ticket()}>Update</CButton>
                        </CModalFooter>
                      </CModal>
                      <CButton color="danger" onClick={() => { setItemValue(item); setDeleteModalVisible(true) }}>Delete</CButton>
                      <CModal alignment="center" visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Do You Want to Delete..</CModalTitle>
                        </CModalHeader>
                        <CModalFooter>
                          <CButton color="secondary" onClick={() => setVisible(false)}>
                            Cancel
                          </CButton>
                          <CButton color="primary" onClick={() => delete_ticket(itemValue)}>Yes., Delete</CButton>
                        </CModalFooter>
                      </CModal>
                    </CTableDataCell>
                  </CTableRow>
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Ticket