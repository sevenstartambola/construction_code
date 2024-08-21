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
  CFormSelect,
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
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Disclaimer = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [itemValue, setItemValue] = useState('')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [disclaimerData, setDisclaimerData] = useState([])
  const [visible, setVisible] = useState(false)
  const [disclaimerId, setDisclaimerId] = useState('')
  const [disclaimerTitle, setDisclaimerTitle] = useState('')
  const [disclaimerMessage, setDisclaimerMessage] = useState('')
  const [disclaimerStatus, setDisclaimerStatus] = useState('')

  useEffect(() => {
    disclaimer_list()
  }, [])

  const disclaimer_list = async () => {
    let result = await getApiCall(base.disclaimerList)
    console.log('resultresultresult', result)
    setDisclaimerData(result)
  }

  const get_edit_value = async (item) => {
    console.log('itemmm', item)
    setEditModalVisible(true)
    setDisclaimerId(item.disclaimer_id)
    setDisclaimerTitle(item.disclaimer_title)
    setDisclaimerMessage(item.disclaimer_message)
    setDisclaimerStatus(item.disclaimer_status)
  }

  const edit_disclaimer = async () => {
    if (disclaimerTitle == '') {
      toast.error('Disclaimer Title is Mandatory')
    } else if (disclaimerMessage == '') {
      toast.error('Disclaimer Message is Mandatory')
    } else {
      let req = {
        disclaimerId: disclaimerId,
        disclaimerTitle: disclaimerTitle,
        disclaimerMessage: disclaimerMessage,
        disclaimerStatus: disclaimerStatus,
      }
      console.log('reqreq', req)
      let result = await putApiCall(base.editDisclaimer, req)
      console.log('resultresult', result)
      if (result.code == 200) {
        setEditModalVisible(false)
        disclaimer_list()
        toast.success('Updated Successfully..!')
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12} className="mb-4">
        <ToastContainer />
        {/* <CButton color="primary" onClick={() => { setVisible(true) }} onClose={() => setVisible(false)}>Add</CButton>
        <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Add</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="disclaimerTitle">Disclaimer Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="disclaimerTitle"
                  placeholder="Disclaimer Title"
                  onChange={(e) => { setDisclaimerTitle(e) }}
                />
                <CFormLabel htmlFor="disclaimerMessage">Disclaimer Message</CFormLabel>
                <CFormInput
                  type="text"
                  id="disclaimerMessage"
                  placeholder="Disclaimer Message"
                  onChange={(e) => { setDisclaimerMessage(e) }}
                />
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => save_disclaimer()}>Save</CButton>
          </CModalFooter>
        </CModal> */}
      </CCol>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CTable hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Message</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {disclaimerData.map((item, index) => {
                  console.log('agentlistitemmmm', item)
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.disclaimer_title}</CTableDataCell>
                      <CTableDataCell>{item.disclaimer_message}</CTableDataCell>
                      <CTableDataCell>{item.disclaimer_status}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="warning"
                          className="me-2"
                          onClick={() => {
                            get_edit_value(item)
                          }}
                        >
                          Edit
                        </CButton>
                        <CModal alignment="center" visible={editModalVisible}>
                          <CModalHeader>
                            <CModalTitle>Edit</CModalTitle>
                          </CModalHeader>
                          <CModalBody>
                            <CForm>
                              <div className="mb-3">
                                <CFormLabel htmlFor="Disclaimer Title">Disclaimer Title</CFormLabel>
                                <CFormInput
                                  type="text"
                                  id="disclaimerTitle"
                                  placeholder="Disclaimer Title"
                                  onChange={(e) => {
                                    setDisclaimerTitle(e.target.value)
                                  }}
                                  // name={name}
                                  defaultValue={disclaimerTitle}
                                />
                                <CFormLabel htmlFor="email">Disclaimer Message</CFormLabel>
                                <CFormInput
                                  type="text"
                                  id="disclaimerMessage"
                                  placeholder="Disclaimer Message"
                                  onChange={(e) => {
                                    setDisclaimerMessage(e)
                                  }}
                                  defaultValue={disclaimerMessage}
                                />
                                <CFormLabel htmlFor="disclaimerStatus">Status</CFormLabel>
                                <CFormSelect
                                  defaultValue={disclaimerStatus}
                                  id="disclaimerStatus"
                                  onChange={(e) => {
                                    setDisclaimerStatus(e.target.value)
                                  }}
                                >
                                  <option value="" selected disabled>
                                    Select Status
                                  </option>
                                  <option value="Active">Active</option>
                                  <option value="Deactive">Deactive</option>
                                </CFormSelect>
                              </div>
                            </CForm>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
                              Cancel
                            </CButton>
                            <CButton color="primary" onClick={() => edit_disclaimer()}>
                              Update
                            </CButton>
                          </CModalFooter>
                        </CModal>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Disclaimer
