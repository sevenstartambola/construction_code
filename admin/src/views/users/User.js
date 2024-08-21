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
import { getApiCall, postApiCall, putApiCall } from 'src/services/AppSetting';
import { base } from 'src/constants/Data.constant';
import Toast from 'src/components/toast/Toast';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const User = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemValue, setItemValue] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [usersData, setUserData] = useState([]);
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  useEffect(() => {
    users_list();
  }, []);

  const users_list = async () => {
    let result = await getApiCall(base.usersList)
    setUserData(result)
  }

  const save_user = async () => {
    let req = {
      name: name.target.value,
      email: email.target.value,
      phone: phone.target.value,
      gender: gender
    }
    console.log("saveUserApiCallreq", req);
    let result = await postApiCall(base.saveUser, req)
    console.log("saveUserApiCall", result);
    if (result.code == 200) {
      setVisible(false);
      successToast();
      // <Toast />
    }
  }

  const successToast = () => {
    toast.success('Success !', {
      position: toast.POSITION.TOP_RIGHT
    })
  }

  // const showToasts = () => {
  //   //     toast.success("Successfully Created.!");
  //   //     toast.error("I'm never gonna toast you!");
  //   //     toast.warning("I'm never gonna toast you!");
  //   //     toast.info("I'm never gonna toast you!");
  // }

  const delete_user = async (value) => {
    let req = {
      id: value.users_id,
      status: "1"
    }
    let result = await putApiCall(base.deleteUser, req)
    if (result.code == 200) {
      toast.error("Deleted Successfully..!");
    }
  }

  const get_edit_value = async (item) => {
    // console.log("getEditValueitemmm", item);
    setEditModalVisible(true);
    setId(item.users_id);
    setName(item.users_name);
    setEmail(item.users_email);
    setPhone(item.users_phone);
    setGender(item.users_gender);
  }

  const edit_user = async () => {
    let req = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
    }
    // console.log("reqofedituser", req);
    let result = await putApiCall(base.editUser, req)
    // console.log("resultofedituser", result);
    if (result.code == 200) {
      setEditModalVisible(false);
      successToast();
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
                <CFormLabel htmlFor="name">Name</CFormLabel>
                <CFormInput
                  type="text"
                  id="name"
                  placeholder="User Name"
                  minLength={3}
                  onChange={(e) => { setName(e) }}
                />
                <CFormLabel htmlFor="email">Email address</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="user@example.com"
                  onChange={(e) => { setEmail(e) }}
                />
                <CFormLabel htmlFor="phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="phone"
                  placeholder="User Phone"
                  maxLength={10}
                  onChange={(e) => { setPhone(e) }}
                />
                <CFormLabel htmlFor="gender">Gender</CFormLabel>
                <CFormSelect defaultValue={gender} id="gender" onChange={(e) => { setGender(e.target.value) }}>
                  <option value="" selected disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </CFormSelect>
              </div>
            </CForm>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
              Cancel
            </CButton>
            <CButton color="primary" onClick={() => save_user()}>Save</CButton>
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
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Phone</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Gender</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {usersData.map((item, index) => {
                  console.log("userListtt", item);
                  return <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.users_name}</CTableDataCell>
                    <CTableDataCell>{item.users_email}</CTableDataCell>
                    <CTableDataCell>{item.users_phone}</CTableDataCell>
                    <CTableDataCell>{item.users_gender}</CTableDataCell>
                    <CTableDataCell>{item.users_active_status}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" className='me-2' onClick={() => { get_edit_value(item) }}>Edit</CButton>
                      {/* <CModal alignment="center" visible={editModalVisible} onClose={() => setEditModalVisible(false)}> */}
                      <CModal alignment="center" visible={editModalVisible}>
                        <CModalHeader>
                          <CModalTitle>Edit</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                          <CForm>
                            <div className="mb-3">
                              <CFormLabel htmlFor="name">Name</CFormLabel>
                              <CFormInput
                                type="text"
                                id="name"
                                placeholder="User Name"
                                onChange={(e) => { setName(e) }}
                                defaultValue={name}
                              />
                              <CFormLabel htmlFor="email">Email address</CFormLabel>
                              <CFormInput
                                type="email"
                                id="email"
                                placeholder="user@example.com"
                                onChange={(e) => { setEmail(e) }}
                                defaultValue={email}
                              />
                              <CFormLabel htmlFor="phone">Phone</CFormLabel>
                              <CFormInput
                                type="text"
                                id="phone"
                                placeholder="User Phone"
                                onChange={(e) => { setPhone(e) }}
                                defaultValue={phone}
                              />
                              <CFormLabel htmlFor="gender">Gender</CFormLabel>
                              <CFormSelect defaultValue={gender} id="gender" onChange={(e) => { setGender(e.target.value) }}>
                                <option value="" selected disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                              </CFormSelect>
                            </div>
                          </CForm>
                        </CModalBody>
                        <CModalFooter>
                          <CButton color="secondary" onClick={() => setEditModalVisible(false)}>
                            Cancel
                          </CButton>
                          <CButton color="primary" onClick={() => edit_user()}>Update</CButton>
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
                          <CButton color="primary" onClick={() => delete_user(itemValue)}>Yes., Delete</CButton>
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

export default User