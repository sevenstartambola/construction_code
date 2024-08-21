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
import { getApiCall, postApiCall, putApiCall } from 'src/services/AppSetting';
import { base } from 'src/constants/Data.constant';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Agents = () => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [itemValue, setItemValue] = useState("");
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [agentsData, setAgentsData] = useState([]);
  const [visible, setVisible] = useState(false)
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState([]);

  useEffect(() => {
    agents_list();
  }, []);

  const clearFormData = async () => {
    setName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setGender("");
    setStatus("");
  }
  const agents_list = async () => {
    let result = await getApiCall(base.agentsList)
    setAgentsData(result)
    setSearch(result)
  }

  const save_agent = async () => {
    if (name == "") {
      toast.error("name is mandatory");
    } else if (email == "") {
      toast.error("emmail is mandatory")
    } else if (phone == "") {
      toast.error("phone no. is mandatory")
    } else if (phone.length < 10) {
      toast.error("Phone No. Should be in 10 digits")
    } else if (gender == "") {
      toast.error("Please select a gender")
    } else if (status == "") {
      toast.error("Please select a status")
    } else {
      let req = {
        name: name.target.value,
        email: email.target.value,
        phone: phone.target.value,
        password: password,
        gender: gender,
        status: status,
      }
      // console.log("saveAgentApiCallreq", req);
      let result = await postApiCall(base.saveAgent, req)
      if (result.code == 200) {
        setVisible(false);
        agents_list();
        clearFormData();
        toast.success("Successfully Created..!");
      }
    }
  }

  const delete_agent = async (value) => {
    let req = {
      id: value.agents_id,
      status: "1"
    }
    // console.log("iddddAgentreq", req);
    let result = await putApiCall(base.deleteAgent, req)
    // console.log("iddddAgentresult", result);
    if (result.code == 200) {
      agents_list();
      toast.error("Deleted Successfully..!");
    }
  }

  const get_edit_value = async (item) => {
    setEditModalVisible(true);
    setId(item.agents_id);
    setName(item.agents_name);
    setEmail(item.agents_email);
    setPhone(item.agents_phone);
    setGender(item.agents_gender);
    setStatus(item.agents_active_status);
  }

  const edit_agent = async () => {
    let req = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      gender: gender,
      status: status,
    }
    // console.log("reqreq", req);
    let result = await putApiCall(base.editAgent, req)
    // console.log("resultresult", result);
    if (result.code == 200) {
      setEditModalVisible(false)
      agents_list();
      toast.success("Updated Successfully..!");
    }
  }

  const randomPasswordGenerate = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let newPassword = '';
    for (let i = 0; i < 8; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      newPassword += charset[randomIndex];
    }
    setPassword(newPassword);
    toast.error(newPassword)
    // console.log("newPassworddd", newPassword);
  };


  return (
    <CRow>
      <CCol xs={12} className='mb-4'>
        <div className='d-flex justify-content-between'>
          <CButton color="primary" onClick={() => { setVisible(true) }} onClose={() => setVisible(false)}>Add</CButton>
          <div className="w-25">
            <CFormInput
              type="text"
              id="search"
              placeholder="Search"
              onChange={(e) => {
                setSearch(agentsData.filter(data => data.agents_name.toLowerCase().includes((e.target.value).toLowerCase())))
              }}
            />
          </div>
        </div>
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
                  placeholder="Agent Name"
                  onChange={(e) => { setName(e) }}
                />
                <CFormLabel htmlFor="email">Email address</CFormLabel>
                <CFormInput
                  type="email"
                  id="email"
                  placeholder="agent@example.com"
                  onChange={(e) => { setEmail(e) }}
                />
                <CFormLabel htmlFor="phone">Phone</CFormLabel>
                <CFormInput
                  type="text"
                  id="phone"
                  placeholder="Agent Phone"
                  onChange={(e) => { setPhone(e) }}
                  maxLength={10}
                />
                <CFormLabel htmlFor="password">Password</CFormLabel>
                <div className='d-flex'>
                  <CFormInput
                    type="text"
                    id="password"
                    placeholder="Agent Password"
                    // onChange={(e) => { setPassword(e) }}
                    defaultValue={password}
                    disabled
                  />
                  <CButton className='mx-1' color="secondary" onClick={() => randomPasswordGenerate()}>
                    Generate
                  </CButton>
                </div>
                <CFormLabel htmlFor="gender">Gender</CFormLabel>
                <CFormSelect defaultValue={gender} id="gender" onChange={(e) => { setGender(e.target.value) }}>
                  <option value="" selected disabled>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Others">Others</option>
                </CFormSelect>
                <CFormLabel htmlFor="status">Status</CFormLabel>
                <CFormSelect defaultValue={status} id="status" onChange={(e) => { setStatus(e.target.value) }}>
                  <option value="" selected disabled>Select Status</option>
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
            <CButton color="primary" onClick={() => save_agent()}>Save</CButton>
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
                  <CTableHeaderCell scope="col">Action</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {search.map((item, index) => {
                  return <CTableRow key={index}>
                    <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                    <CTableDataCell>{item.agents_name}</CTableDataCell>
                    <CTableDataCell>{item.agents_email}</CTableDataCell>
                    <CTableDataCell>{item.agents_phone}</CTableDataCell>
                    <CTableDataCell>{item.agents_gender}</CTableDataCell>
                    <CTableDataCell>
                      <CButton color="warning" className='me-2' onClick={() => { get_edit_value(item) }}>Edit</CButton>
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
                                placeholder="Agent Name"
                                onChange={(e) => { setName(e.target.value) }}
                                // name={name}
                                defaultValue={name}
                              />
                              <CFormLabel htmlFor="email">Email address</CFormLabel>
                              <CFormInput
                                type="email"
                                id="email"
                                placeholder="agent@example.com"
                                onChange={(e) => { setEmail(e) }}
                                defaultValue={email}
                              />
                              <CFormLabel htmlFor="phone">Phone</CFormLabel>
                              <CFormInput
                                type="text"
                                id="phone"
                                placeholder="Agent Phone"
                                onChange={(e) => { setPhone(e) }}
                                maxLength={10}
                                defaultValue={phone}
                              />
                              <CFormLabel htmlFor="gender">Gender</CFormLabel>
                              <CFormSelect defaultValue={gender} id="gender" onChange={(e) => { setGender(e.target.value) }}>
                                <option value="" selected disabled>Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Others">Others</option>
                              </CFormSelect>
                              <CFormLabel htmlFor="status">Status</CFormLabel>
                              <CFormSelect defaultValue={status} id="status" onChange={(e) => { setStatus(e.target.value) }}>
                                <option value="" selected disabled>Select Status</option>
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
                          <CButton color="primary" onClick={() => edit_agent()}>Update</CButton>
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
                          <CButton color="primary" onClick={() => delete_agent(itemValue)}>Yes., Delete</CButton>
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
    </CRow >
  )
}

export default Agents
