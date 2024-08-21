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

const Announcement = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [itemValue, setItemValue] = useState('')
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [announcementData, setAnnouncementData] = useState([])
  const [visible, setVisible] = useState(false)
  const [announcementId, setAnnouncementId] = useState('')
  const [announcementTitle, setAnnouncementTitle] = useState('')
  const [announcementMessage, setAnnouncementMessage] = useState('')
  const [announcementStatus, setAnnouncementStatus] = useState('')
  // const [search, setSearch] = useState([]);

  useEffect(() => {
    announcement_list()
  }, [])

  const announcement_list = async () => {
    let result = await getApiCall(base.announcementList)
    console.log('resultresultresult', result)
    setAnnouncementData(result)
    // setSearch(result)
  }

  const save_announcement = async () => {
    if (announcementTitle == '') {
      toast.error('Announcement Title is Mandatory')
    } else if (announcementMessage == '') {
      toast.error('Announcement Message is Mandatory')
    } else if (announcementStatus == '') {
      toast.error('Announcement Status is Mandatory')
    } else {
      let req = {
        announcementTitle: announcementTitle.target.value,
        announcementMessage: announcementMessage.target.value,
        announcementStatus: announcementStatus,
      }
      let result = await postApiCall(base.saveAnnouncement, req)
      if (result.code == 200) {
        setVisible(false)
        announcement_list()
        toast.success('Successfully Created..!')
      }
    }
  }

  const delete_announcement = async (value) => {
    let req = {
      announcementId: value.announcement_id,
      announcementStatus: 'DeActive',
    }
    console.log('iddddAgentreq', req)
    let result = await putApiCall(base.deleteAnnouncement, req)
    console.log('iddddAgentresult', result)
    if (result.code == 200) {
      announcement_list()
      toast.error('Deleted Successfully..!')
    }
  }

  const get_edit_value = async (item) => {
    console.log('itemmm', item)
    setEditModalVisible(true)
    setAnnouncementId(item.announcement_id)
    setAnnouncementTitle(item.announcement_title)
    setAnnouncementMessage(item.announcement_message)
    setAnnouncementStatus(item.announcement_status)
  }

  const edit_announcement = async () => {
    if (announcementTitle == '') {
      toast.error('Announcement Title is Mandatory')
    } else if (announcementMessage == '') {
      toast.error('Announcement Message is Mandatory')
    } else if (announcementStatus == '') {
      toast.error('Announcement Status is Mandatory')
    } else {
      let req = {
        announcementId: announcementId,
        announcementTitle: announcementTitle,
        announcementMessage: announcementMessage,
        announcementStatus: announcementStatus,
      }
      console.log('reqreq', req)
      let result = await putApiCall(base.editAnnouncement, req)
      console.log('resultresult', result)
      if (result.code == 200) {
        setEditModalVisible(false)
        announcement_list()
        toast.success('Updated Successfully..!')
      }
    }
  }

  return (
    <CRow>
      <CCol xs={12} className="mb-4">
        {/* <div className='d-flex justify-content-between'> */}
        {/* <CButton color="primary" onClick={() => { setVisible(true) }} onClose={() => setVisible(false)}>Add</CButton> */}
        {/* <div class="w-25">
            <CFormInput
              type="text"
              id="search"
              placeholder="Search"
              onChange={(e) => {
                setSearch(announcementData.filter(data => data.announcement_title.toLowerCase().includes((e.target.value).toLowerCase())))
              }}
            />
          </div>
        </div> */}
        <ToastContainer />
        {/* <CModal alignment="center" visible={visible} onClose={() => setVisible(false)}>
          <CModalHeader>
            <CModalTitle>Add</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <CForm>
              <div className="mb-3">
                <CFormLabel htmlFor="announcementTitle">Announcement Title</CFormLabel>
                <CFormInput
                  type="text"
                  id="announcementTitle"
                  placeholder="Announcement Title"
                  onChange={(e) => { setAnnouncementTitle(e) }}
                />
                <CFormLabel htmlFor="announcementMessage">Announcement Message</CFormLabel>
                <CFormInput
                  type="text"
                  id="announcementMessage"
                  placeholder="Announcement Message"
                  onChange={(e) => { setAnnouncementMessage(e) }}
                />
                <CFormLabel htmlFor="announcementStatus">Announcement Status</CFormLabel>
                <CFormSelect defaultValue={announcementStatus} id="announcementStatus" onChange={(e) => { setAnnouncementStatus(e.target.value) }}>
                  <option value="" selected disabled>Select Announcement Status</option>
                  <option value="Active">Active</option>
                  <option value="DeActive">DeActive</option>
                </CFormSelect>
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => save_announcement()}>Save</CButton>
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
                {announcementData.map((item, index) => {
                  // console.log("agentlistitemmmm", item);
                  return (
                    <CTableRow key={index}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{item.announcement_title}</CTableDataCell>
                      <CTableDataCell>{item.announcement_message}</CTableDataCell>
                      <CTableDataCell>{item.announcement_status}</CTableDataCell>
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
                                <CFormLabel htmlFor="Announcement Title">
                                  Announcement Title
                                </CFormLabel>
                                <CFormInput
                                  type="text"
                                  id="announcementTitle"
                                  placeholder="Announcement Title"
                                  onChange={(e) => {
                                    setAnnouncementTitle(e.target.value)
                                  }}
                                  // name={name}
                                  defaultValue={announcementTitle}
                                />
                                <CFormLabel htmlFor="email">Announcement Message</CFormLabel>
                                <CFormInput
                                  type="text"
                                  id="announcementMessage"
                                  placeholder="Announcement Message"
                                  onChange={(e) => {
                                    setAnnouncementMessage(e)
                                  }}
                                  defaultValue={announcementMessage}
                                />
                                <CFormLabel htmlFor="announcementStatus">
                                  Announcement Status
                                </CFormLabel>
                                <CFormSelect
                                  defaultValue={announcementStatus}
                                  id="announcementStatus"
                                  onChange={(e) => {
                                    setAnnouncementStatus(e.target.value)
                                  }}
                                >
                                  <option value="" selected disabled>
                                    Select Announcement Status
                                  </option>
                                  <option value="Active">Active</option>
                                  <option value="DeActive">DeActive</option>
                                </CFormSelect>
                              </div>
                            </CForm>
                          </CModalBody>
                          <CModalFooter>
                            <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
                              Cancel
                            </CButton>
                            <CButton color="primary" onClick={() => edit_announcement()}>
                              Update
                            </CButton>
                          </CModalFooter>
                        </CModal>
                        {/* <CButton color="danger" onClick={() => { setItemValue(item); setDeleteModalVisible(true) }}>Delete</CButton>
                      <CModal alignment="center" visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)}>
                        <CModalHeader>
                          <CModalTitle>Do You Want to Delete..</CModalTitle>
                        </CModalHeader>
                        <CModalFooter>
                          <CButton color="secondary" onClick={() => setVisible(false)}>
                            Cancel
                          </CButton>
                          <CButton color="primary" onClick={() => delete_announcement(itemValue)}>Yes., Delete</CButton>
                        </CModalFooter>
                      </CModal> */}
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

export default Announcement
