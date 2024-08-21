import React, { useState, useEffect } from 'react'
import {
  CRow,
  CCol,
  CForm,
  CButton,
  CFormInput,
  CFormLabel,
  CModalBody,
  CModalTitle,
  CFormSelect,
} from '@coreui/react'
import { useParams } from 'react-router-dom'
import { base } from 'src/constants/Data.constant'
import { postApiCall, putApiCall } from 'src/services/AppSetting'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Profile = () => {
  const { id } = useParams()
  const [agentsDetails, setAgentsDetails] = useState([])
  const [agentsTransaction, setAgentsTransaction] = useState([])
  const [transactionAmount, setTransactionAmount] = useState('')
  const [transactionRemarks, setTransactionRemarks] = useState('')
  const [transactionType, setTransactionType] = useState('')

  useEffect(() => {
    agents_details()
    agents_transection_list()
  }, [])

  const agents_details = async () => {
    try {
      let body = {
        agent_id: id,
      }
      let result = await postApiCall(base.agentDetails, body)
      setTransactionAmount('')
      setAgentsDetails(result.data[0])
    } catch (e) {}
  }

  const agents_transection_list = async () => {
    try {
      let body = {
        agentId: id,
      }
      let result = await postApiCall(base.agentCreditDebitTransacationList, body)
      if (result.code == 200) {
        const filtered = result.data.filter(
          (item) => item.type_cr_dr === 'Credit' || item.type_cr_dr === 'Debit'
        )
        setAgentsTransaction(filtered)
      }
    } catch (e) {}
  }

  const accept_requested_amount = async (value) => {
    if (Number(value.amount) > Number(agentsDetails.wallet)) {
      toast.error('Insufficient balance')
    } else {
      const agentId = localStorage.getItem('agentLoginId')
      let req = {
        agentId: agentId,
        requestedAmount: value.amount,
      }
      let result = await postApiCall(base.deductMoneyFromAgentWallet, req)
      if (result.code == 200) {
        let body = {
          status: 'Approved',
          updatedAt: new Date(),
          id: value.payment_id,
        }
        let result = await putApiCall(base.acceptTransactionRequest, body)
        if (result.code == 200) {
          agents_transection_list()
          agents_details()
          toast.success('Update Successfully.!')
        }
      }
    }
  }

  const clearFormInput = async () => {
    setTransactionType('')
    setTransactionAmount('')
    setTransactionRemarks('')
  }

  return (
    <>
      <CRow className="wallent-agent">
        <CCol xs={12} sm={6}>
          <CModalTitle>{agentsDetails.agents_name}</CModalTitle>
          <CModalTitle>{agentsDetails.agents_email}</CModalTitle>
          <CModalTitle>{agentsDetails.agents_gender}</CModalTitle>
        </CCol>
        <CCol xs={12} sm={6}>
          <div className="wallet-amount">
            <CModalTitle>Wallet Balance : </CModalTitle>
            <CModalTitle> {agentsDetails.wallet}</CModalTitle>
          </div>
        </CCol>
        <CModalTitle>Transaction History </CModalTitle>
        {agentsTransaction?.map((item, index) => {
          return (
            <CRow className="transection" key={index}>
              <CRow className="trans-inner">
                <CCol xs={12} sm={6}>
                  <CModalTitle>#id : {item.payment_id}</CModalTitle>
                  <CModalTitle>Amount : {item.amount}</CModalTitle>
                  <CModalTitle>Agent Remark Date : {item.remarks}</CModalTitle>
                </CCol>
                <CCol xs={12} sm={6}>
                  <CModalTitle>Requested Date : {item.create_at}</CModalTitle>
                  <CModalTitle>Transaction Type : {item.type_cr_dr}</CModalTitle>
                  <CModalTitle>Status : {item.status}</CModalTitle>
                  {/* <CRow className="button-style"> */}
                  <CRow className="accept-button-style">
                    {item.status == 'Pending' && (
                      <CButton
                        onClick={() => {
                          accept_requested_amount(item)
                        }}
                      >
                        Acceptt
                      </CButton>
                    )}
                  </CRow>
                </CCol>
                <CCol></CCol>
              </CRow>
            </CRow>
          )
        })}
      </CRow>
    </>
  )
}
export default Profile
