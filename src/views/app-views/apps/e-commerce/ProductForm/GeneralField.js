import React, { useEffect, useMemo, useState } from "react";
import { Input, Row, Col, Card, Form, message, Button, Select, Checkbox } from "antd";
import axios from "axios";
import Flex from "components/shared-components/Flex";
import Loading from "components/shared-components/Loading";
import { AUTH_TOKEN } from "redux/constants/Auth";
import { BASE_URL } from "redux/store/baseUrl";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    overflowY: 'auto',
    height: '750px',
    padding: '0px',
    border: '0px'
  },
};

const DomainBillingFormModal = ({ isModalOpen, setIsModalOpen, handleOk, DomainName, isLoading }) => {

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [formData, setFormData] = useState({
    AdminContact: {
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      ContactType: '',
      CountryCode: '',
      Email: '',
      ExtraParams: { Name: '', Value: '' },
      Fax: '',
      FirstName: '',
      LastName: '',
      OrganizationName: '',
      PhoneNumber: '',
      State: '',
      ZipCode: '',
    },
    RegistrantContact: {
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      ContactType: '',
      CountryCode: '',
      Email: '',
      ExtraParams: { Name: '', Value: '' },
      Fax: '',
      FirstName: '',
      LastName: '',
      OrganizationName: '',
      PhoneNumber: '',
      State: '',
      ZipCode: '',
    },
    TechContact: {
      AddressLine1: '',
      AddressLine2: '',
      City: '',
      ContactType: '',
      CountryCode: '',
      Email: '',
      ExtraParams: { Name: '', Value: '' },
      Fax: '',
      FirstName: '',
      LastName: '',
      OrganizationName: '',
      PhoneNumber: '',
      State: '',
      ZipCode: '',
    },
    AutoRenew: true,
    DomainName,
    DurationInYears: 1,
    IdnLangCode: '',
    PrivacyProtectAdminContact: false,
    PrivacyProtectRegistrantContact: false,
    PrivacyProtectTechContact: false
  })

  const savedFormData = useMemo(() => localStorage.getItem('user_domain_billing_data') ? JSON.parse(localStorage.getItem('user_domain_billing_data')) : formData, [formData])

  const handleSubmit = () => {
    localStorage.setItem('user_domain_billing_data', JSON.stringify(formData))
   handleOk(formData)
  }

  return (
    <Modal contentLabel="Basic Modal" style={customStyles} isOpen={isModalOpen} onRequestClose={handleSubmit} c>
      <Card title="Add biliing info">
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout={'vertical'}
          //form={form}
          initialValues={{ layout: 'vertical' }}
          //  onValuesChange={onFormLayoutChange}
          style={{ maxWidth: 600 }}
        >
          <h4>AdminContact</h4>
          <Form.Item label="Address Line1">
            <Input defaultValue={savedFormData['AdminContact']['AddressLine1']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, AddressLine1: e.target.value } })} />
          </Form.Item>
          <Form.Item label="City">
            <Input defaultValue={savedFormData['AdminContact']['City']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, City: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Contact Type">
            <Input defaultValue={savedFormData['AdminContact']['ContactType']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, ContactType: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Country Code">
            <Input defaultValue={savedFormData['AdminContact']['CountryCode']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, CountryCode: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Address Line2">
            <Input defaultValue={savedFormData['AdminContact']['AddressLine1']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, AddressLine2: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Email">
            <Input defaultValue={savedFormData['AdminContact']['Email']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, Email: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Extra Params">
            <Form.Item label="Name">
              <Input defaultValue={savedFormData['AdminContact']['ExtraParams']['Name']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, ExtraParams: { ...formData.AdminContact.ExtraParams, Name: e.target.value } } })} />
            </Form.Item>
            <Form.Item label="Value">
              <Input defaultValue={savedFormData['AdminContact']['ExtraParams']['Value']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, ExtraParams: { ...formData.AdminContact.ExtraParams, Value: e.target.value } } })} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Fax">
            <Input defaultValue={savedFormData['AdminContact']['Fax']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, Fax: e.target.value } })} />
          </Form.Item>
          <Form.Item label="First Name">
            <Input defaultValue={savedFormData['AdminContact']['FirstName']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, FirstName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input defaultValue={savedFormData['AdminContact']['LastName']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, LastName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Organization Name">
            <Input defaultValue={savedFormData['AdminContact']['OrganizationName']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, OrganizationName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input defaultValue={savedFormData['AdminContact']['PhoneNumber']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, PhoneNumber: e.target.value } })} />
          </Form.Item>
          <Form.Item label="State">
            <Input defaultValue={savedFormData['AdminContact']['State']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, State: e.target.value } })} />
          </Form.Item>
          <Form.Item label="ZipCode">
            <Input defaultValue={savedFormData['AdminContact']['ZipCode']} onChange={(e) => setFormData({ ...formData, AdminContact: { ...formData.AdminContact, ZipCode: e.target.value } })} />
          </Form.Item>

          <h4>Registrant Contact</h4>

          <Form.Item label="Address Line1">
            <Input defaultValue={savedFormData['RegistrantContact']['AddressLine1']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, AddressLine1: e.target.value } })} />
          </Form.Item>
          <Form.Item label="City">
            <Input defaultValue={savedFormData['RegistrantContact']['City']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, City: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Contact Type">
            <Input defaultValue={savedFormData['RegistrantContact']['ContactType']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, ContactType: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Country Code">
            <Input defaultValue={savedFormData['RegistrantContact']['CountryCode']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, CountryCode: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Address Line2">
            <Input defaultValue={savedFormData['RegistrantContact']['AddressLine1']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, AddressLine2: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Email">
            <Input defaultValue={savedFormData['RegistrantContact']['Email']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, Email: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Extra Params">
            <Form.Item label="Name">
              <Input defaultValue={savedFormData['RegistrantContact']['ExtraParams']['Name']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, ExtraParams: { ...formData.AdminContact.ExtraParams, Name: e.target.value } } })} />
            </Form.Item>
            <Form.Item label="Value">
              <Input defaultValue={savedFormData['RegistrantContact']['ExtraParams']['Value']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, ExtraParams: { ...formData.AdminContact.ExtraParams, Value: e.target.value } } })} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Fax">
            <Input defaultValue={savedFormData['RegistrantContact']['Fax']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, Fax: e.target.value } })} />
          </Form.Item>
          <Form.Item label="First Name">
            <Input defaultValue={savedFormData['RegistrantContact']['FirstName']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, FirstName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input defaultValue={savedFormData['RegistrantContact']['LastName']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, LastName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Organization Name">
            <Input defaultValue={savedFormData['RegistrantContact']['OrganizationName']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, OrganizationName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input defaultValue={savedFormData['RegistrantContact']['PhoneNumber']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, PhoneNumber: e.target.value } })} />
          </Form.Item>
          <Form.Item label="State">
            <Input defaultValue={savedFormData['RegistrantContact']['State']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, State: e.target.value } })} />
          </Form.Item>
          <Form.Item label="ZipCode">
            <Input defaultValue={savedFormData['RegistrantContact']['ZipCode']} onChange={(e) => setFormData({ ...formData, RegistrantContact: { ...formData.RegistrantContact, ZipCode: e.target.value } })} />
          </Form.Item>

          <h4>Tech Contact</h4>
          <Form.Item label="Address Line1">
            <Input defaultValue={savedFormData['TechContact']['AddressLine1']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, AddressLine1: e.target.value } })} />
          </Form.Item>
          <Form.Item label="City">
            <Input defaultValue={savedFormData['TechContact']['City']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, City: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Contact Type">
            <Input defaultValue={savedFormData['TechContact']['ContactType']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, ContactType: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Country Code">
            <Input defaultValue={savedFormData['TechContact']['CountryCode']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, CountryCode: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Address Line2">
            <Input defaultValue={savedFormData['TechContact']['AddressLine1']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, AddressLine2: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Email">
            <Input defaultValue={savedFormData['TechContact']['Email']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, Email: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Extra Params">
            <Form.Item label="Name">
              <Input defaultValue={savedFormData['TechContact']['ExtraParams']['Name']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, ExtraParams: { ...formData.AdminContact.ExtraParams, Name: e.target.value } } })} />
            </Form.Item>
            <Form.Item label="Value">
              <Input defaultValue={savedFormData['TechContact']['ExtraParams']['Value']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, ExtraParams: { ...formData.AdminContact.ExtraParams, Value: e.target.value } } })} />
            </Form.Item>
          </Form.Item>
          <Form.Item label="Fax">
            <Input defaultValue={savedFormData['TechContact']['Fax']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, Fax: e.target.value } })} />
          </Form.Item>
          <Form.Item label="First Name">
            <Input defaultValue={savedFormData['TechContact']['FirstName']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, FirstName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Last Name">
            <Input defaultValue={savedFormData['TechContact']['LastName']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, LastName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Organization Name">
            <Input defaultValue={savedFormData['TechContact']['OrganizationName']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, OrganizationName: e.target.value } })} />
          </Form.Item>
          <Form.Item label="Phone Number">
            <Input defaultValue={savedFormData['TechContact']['PhoneNumber']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, PhoneNumber: e.target.value } })} />
          </Form.Item>
          <Form.Item label="State">
            <Input defaultValue={savedFormData['TechContact']['State']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, State: e.target.value } })} />
          </Form.Item>
          <Form.Item label="ZipCode">
            <Input defaultValue={savedFormData['TechContact']['ZipCode']} onChange={(e) => setFormData({ ...formData, TechContact: { ...formData.TechContact, ZipCode: e.target.value } })} />
          </Form.Item>
          <Checkbox>Auto Renew</Checkbox>
          <Form.Item label="Domain Name">
            <Input defaultValue={savedFormData['DomainName']} onChange={(e) => setFormData({ ...formData, DomainName: e.target.value })} />
          </Form.Item>
          <Form.Item label="Duration In Years">
            <Input defaultValue={savedFormData['DurationInYears']} onChange={(e) => setFormData({ ...formData, DurationInYears: e.target.value })} />
          </Form.Item>
          <Form.Item label="Idn Lang Code">
            <Input defaultValue={savedFormData['IdnLangCode']} onChange={(e) => setFormData({ ...formData, IdnLangCode: e.target.value })} />
          </Form.Item>
          <Checkbox>Privacy Protect Admin Contact</Checkbox>
          <Checkbox>Privacy Protect Registrant Contact</Checkbox>
          <Checkbox>Privacy Protect Tech Contact</Checkbox>

        </Form>
        <div style={{marginTop:'10px'}}>
          <Button style={{ width: '100px', marginTop: '10px',marginRight:'10px' }} loading={isLoading} type="primary" block onClick={handleSubmit}>Submit</Button>
          <Button style={{ width: '100px', marginTop: '10px' }} block onClick={handleCancel}>Cancel</Button>
          </div>
        
      </Card>
    </Modal>
  );
};

const SelectAfter = ({ setDomain }) => {
  return (
    <Input defaultValue="com" style={{ width: 80, marginLeft: 10, marginBottom: 10 }} onChange={(e) => setDomain(e.target.value)} />
  )
};

const DomainPrice = (props) => {

  const [price, setPrice] = useState(null)

  useEffect(() => {
    axios.post(`${BASE_URL}/domain/get-domains-suggestions-and-price`, {
      search: '', domainName: props.domainName, price: true
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      }
    }).then((res) => {
      setPrice(res.data)
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  return (price ? <h2>{`${price.Price} ${price.Currency}`}</h2> : <Loading align={'left'} />)
}

const BuyDomain = (props) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [status, setStatus] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onBuy = (formData) => {
    setSubmitLoading(true);
    axios.post(`${BASE_URL}/domain/register-domain`, formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      }
    })
      .then((res) => {
        if (res.data.error) {
          setSubmitLoading(false);
          message.error(res.data.message);
        } else {
          axios.post(`${BASE_URL}/domain`, {
            name: props.domainName
          }, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
            }
          }).then((values) => {
            setSubmitLoading(false);
            setIsModalOpen(false)
            message.success(`Domain ${props.domainName} is added to domain list`);
          })
            .catch((info) => {
              setSubmitLoading(false);
              console.log("info", info);
            })
          res.data.message ? message.success(res.data.message) : message.success(`Domain ${res.data.DomainName} is in ${res.data.Status}`);
          setStatus(res.data.status)
        }
      })
      .catch((info, ww) => {
        setSubmitLoading(false);
        console.log("info", info);
        info.data.message ? message.success(info.data.message) : message.error("Failed");
        message.error("Failed");
      });
  }

  return (<>
    <DomainBillingFormModal
      isModalOpen={isModalOpen} isLoading={submitLoading}
      setIsModalOpen={setIsModalOpen} handleOk={onBuy} DomainName={props.domainName} />
    <Button loading={submitLoading} type="primary" color="green" onClick={() => setIsModalOpen(true)}>{status ? status : 'Buy'}</Button>
  </>)
}

const GeneralField = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [domainName, setDomainName] = useState('com')
  const [domainSuggestionList, setDomainSuggestionList] = useState([])
  const [seachedDamainAvailability, setIsSearchedDomainAvailability] = useState('')
  const [isSeachedLoading, setSeachedIsLoading] = useState(false)
  const [searchedDoamin, setSearchedDomain] = useState('')

  const onSearch = (val) => {
    setIsLoading(true)
    setSeachedIsLoading(true)
    setSearchedDomain(`${search}.${domainName}`)
    axios.post(`${BASE_URL}/domain/search-domain`, {
      search, domainName
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
      }
    }).then((res) => {
      setIsSearchedDomainAvailability(res.data)
      setSeachedIsLoading(false)
      axios.post(`${BASE_URL}/domain/get-domains-suggestions-and-price`, {
        search, domainName, price: false
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(AUTH_TOKEN)}`,
        }
      }).then((res) => {
        setDomainSuggestionList(res.data)
        setIsLoading(false);
      }).catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
    }).catch((error) => {
      console.log(error);
      setIsLoading(false);
    });
  }

  return (
    <Row gutter={16}>

      <Col xs={24} sm={24} md={24}>
        <Card title="Get Your Domain Now">
          <Form.Item name="name" label="Search domain">
            <Flex>
              <Input
                placeholder="Enter your domain name"
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: 10 }}
              />
              <SelectAfter setDomain={setDomainName} />
            </Flex>

            <Button style={{ width: '100px' }} loading={isLoading} type="primary" block onClick={onSearch}>Search</Button>
          </Form.Item>

          {!isSeachedLoading && seachedDamainAvailability && <Form.Item name="result" label="Result">
            <Row style={{ marginTop: '10px' }} gutter={4}>
              <Col span={8}>
                <p style={{ color: 'gray' }}>Domain</p>
              </Col>
              <Col span={4}>
                <p style={{ color: 'gray' }}>Availability</p>
              </Col>
              <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: 'gray' }}>Price</p>
              </Col>
            </Row>
            <Row style={{ marginTop: '10px' }} gutter={4}>
              <Col span={8}>
                <h2>{searchedDoamin}</h2>
              </Col>
              <Col span={4}>
                {seachedDamainAvailability == 'AVAILABLE' ? <h2 style={{ color: 'lightgreen' }}>Available</h2> : <h2 style={{ color: 'red' }}>Not Available</h2>}
              </Col>
              <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
                <DomainPrice domainName={domainName} />
              </Col>
              <Col span={4} style={{ display: 'flex', justifyContent: 'right' }}>
                {seachedDamainAvailability == 'AVAILABLE' ? <BuyDomain domainName={searchedDoamin} /> : null}
              </Col>
            </Row>
          </Form.Item>}
          {!isLoading && domainSuggestionList?.[0] && <Form.Item name="suggestions" label="Suggestions">
            <Row style={{ marginTop: '10px' }} gutter={4}>
              <Col span={8}>
                <p style={{ color: 'gray' }}>Domain</p>
              </Col>
              <Col span={4}>
                <p style={{ color: 'gray' }}>Availability</p>
              </Col>
              <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
                <p style={{ color: 'gray' }}>Price</p>
              </Col>
            </Row>
            {domainSuggestionList?.[0] && domainSuggestionList.map((domain) => <Row style={{ marginTop: '10px' }} gutter={4}>
              <Col span={8}>
                <h2>{domain.DomainName}</h2>
              </Col>
              <Col span={4}>
                {domain.Availability == 'AVAILABLE' ? <h2 style={{ color: 'lightgreen' }}>Available</h2> : <h2 style={{ color: 'red' }}>Not Available</h2>}
              </Col>
              <Col span={4} style={{ display: 'flex', justifyContent: 'center' }}>
                <DomainPrice domainName={domain.DomainName.substring(domain.DomainName.lastIndexOf('.') + 1)} />
              </Col>
              <Col span={4} style={{ display: 'flex', justifyContent: 'right' }}>
                {domain.Availability == 'AVAILABLE' ? <BuyDomain domainName={domain.DomainName} /> : null}
              </Col>
            </Row>)}
          </Form.Item>}
        </Card>
      </Col>
    </Row>
  )
};


export default GeneralField;
