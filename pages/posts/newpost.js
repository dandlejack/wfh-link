import { useState, useEffect } from 'react'
import { message, Form, Input, Button, TreeSelect, Select, notification } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { jobPositionData, scholarData, workExperience, workSelectedHeaderWithoutAll, rangeOfJobsWithoutAll } from '../../util/mockData'
import { PostApi } from '../../api/PostApi'
import jwt_decode from 'jwt-decode';
import Redirect from '../../components/Redirect'
import Cookie from 'js-cookie'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { BACKEND_API } from '../../server.configs'
const DynamicDashboardMenu = dynamic(() => import('../../components/DashboardMenu'))
const { TextArea } = Input
const { SHOW_PARENT } = TreeSelect;

export default function FirstPost() {
  const getCookie = Cookie.get("hrme")
  const [userId, setUserId] = useState(getCookie)
  const [uploadImgList, setUploadImgList] = useState({})
  const [logoImgTest, setLogoImgTest] = useState({})
  const [treeSelectValue, setTreeSelectValue] = useState([])

  const [warningData, setWarningData] = useState(false)
  const [form] = Form.useForm();

  const [userRole, setUserRole] = useState('')
  useEffect(() => {
    const getCookieData = Cookie.get('token')
    if (getCookieData !== undefined) {
      const jwtData = jwt_decode(getCookieData)
      setUserRole(jwtData.role)
    }
  }, [])

  const onFinish = async (e) => {
    let formData = new FormData();
    const getCookie = Cookie.get("token")
    const jwtDecoded = jwt_decode(getCookie);
    const parseJwtDecoded = JSON.parse(JSON.stringify(jwtDecoded));

    if (Object.keys(logoImgTest).length > 0) {
      formData.append('photos[]', logoImgTest, logoImgTest.name);
      const imgUrl = await PostApi.uploadImages(formData).then(res => {
        return res
      })
      e.logo_image = imgUrl.logo
    } else {
      e.logo_image = `${BACKEND_API}/photos/default_logo.png`
    }

    if (e.company_email === '') {
      e.company_email = '-'
    }
    if (e.line_id === '') {
      e.line_id = '-'
    }
    if (e.company_facebook === '') {
      e.company_facebook = '-'
    }
    if (e.company_tel === '') {
      e.company_tel = '-'
    }
    e.user_id = parseJwtDecoded._id
    e.role = parseJwtDecoded.role
    e.all_works = 'ประเภทงานทั้งหมด'
    e.all_province = 'ระยะเวลารับงานทั้งหมด'
    if (e.benefits === undefined || e.jobproperties === undefined || e.jobshighlights === undefined) {
      setWarningData(true)
    } else {
      PostApi.createNewPost(e).then(res => {
        if (res === "Post Successful") {
          window.location.reload()
        }
      })
    }
  }

  const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
  }

  const handleChange = async (info) => {
    const imgFile = info.target.files[0]
    const checkSizeTypeImage = beforeUpload(imgFile)
    if (checkSizeTypeImage) {
      setUploadImgList(imgFile)
    }
  };

  const handleLogoChange = async (info) => {
    const imgFile = info.target.files[0]
    const checkSizeTypeImage = beforeUpload(imgFile)
    if (checkSizeTypeImage) {
      setLogoImgTest(imgFile)
    }
  };

  const handleTreeSelect = value => {
    const checkValueIndex = value.findIndex(val => val === 'ประเภทงานทั้งหมด')
    if (value[value.length - 1] === 'ประเภทงานทั้งหมด') {
      if (value.length > 1) {
        value[0] = 'ประเภทงานทั้งหมด'
        value.splice(1, value.length)
      }
    } else {
      if (checkValueIndex > -1)
        value.splice(checkValueIndex, 1)
    }
    setTreeSelectValue(value)
  }

  const openNotification = () => {
    setWarningData(false)
    notification.warning({
      message: 'กรุณากรอกข้อมูลให้ครบถ้วน',
      description:
        'กรุณากรอกไฮไลท์เด่นของงาน หน้าที่และความรับผิดชอบ คุณสมบัติ และสวัสดิการ อย่างน้อย 1 ข้อ ',
    });
  };
  return (
    <>
      <Head>
        <title>สร้างโพสต์ใหม่</title>
        <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
        <meta property="og:url" content="https://หาคนโพส.com/"></meta>
        <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
        <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
        <meta property="og:site_name" content="หาคนโพส.com"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { userId === undefined ? <Redirect to='/login' /> : <div className='container mx-auto'>
        <div className='flex flex-wrap mx-auto p-4 lg:relative'>
          <DynamicDashboardMenu />
          <div className='work-manage-body'>
            <div className='box border rounded p-2'>
              <div>
                <h2 className='text-xl'>ข้อมูลรับสมัครงาน</h2>
              </div>
              {warningData ? openNotification() : null}
              <div>
                <Form
                  layout="vertical"
                  form={form}
                  name="jobsads"
                  onFinish={onFinish}
                  initialValues={{
                    // job_position: jobPositionData[0],
                    // work_experience: workExperience[0],
                    work_type: [rangeOfJobsWithoutAll[1].value],
                    scholar_degree: scholarData[0],
                    work_select: [workSelectedHeaderWithoutAll[0].value],
                  }}
                  scrollToFirstError
                >
                  <Form.Item
                    name="company_name"
                    label="ชื่อบริษัท"
                    rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="company_description"
                    label="เกี่ยวกับบริษัท"
                    rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                  >
                    <TextArea autoSize={{ minRows: 2, maxRows: 10 }}></TextArea>
                  </Form.Item>
                  <Form.Item
                    name="post_title"
                    label="ชื่อตำแหน่งที่ต้องการรับสมัคร"
                    rules={[
                      {
                        required: true,
                        message: 'กรุณากรอกข้อมูล',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="scholar_degree"
                    label="ระดับการศึกษา"
                  >
                    <Select>
                      {scholarData.map(data => {
                        return (<Select.Option value={data} key={data}>
                          {data}
                        </Select.Option>)
                      })}
                    </Select>
                  </Form.Item>
                  {/* <Form.Item
                    name="job_position"
                    label="ระดับตำแหน่ง"
                  >
                    <Select >
                      {jobPositionData.map(data => {
                        return (<Select.Option value={data} key={data}>
                          {data}
                        </Select.Option>)
                      })}
                    </Select>
                  </Form.Item> */}
                  {/* <Form.Item
                    name="work_experience"
                    label="อายุงาน"
                  >
                    <Select>
                      {workExperience.map(data => {
                        return (<Select.Option value={data} key={data}>
                          {data}
                        </Select.Option>)
                      })}
                    </Select>
                  </Form.Item> */}
                  <Form.Item
                    name="work_select"
                    label="ประเภทงาน"
                  >
                    <TreeSelect
                      value={treeSelectValue}
                      showCheckedStrategy={SHOW_PARENT}
                      treeCheckable={true}
                      treeData={workSelectedHeaderWithoutAll}
                      onChange={e => handleTreeSelect(e)}
                    ></TreeSelect>
                  </Form.Item>
                  <Form.Item
                    name="work_type"
                    label="ประเภทการจ้างงาน"
                  >
                    <Select mode="multiple" showSearch >
                      {rangeOfJobsWithoutAll.map(data => {
                        return <Select.Option value={data.value} key={data.value}>{data.value}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                  <div style={{ marginBottom: 10 }}><span>ไฮไลท์เด่นของงาน</span></div>
                  <Form.List name="jobshighlights">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map((field) => (
                            <div style={{ position: "relative" }} >
                              <Form.Item
                                {...field}
                                name={[field.name, "highlight"]}
                                fieldKey={[field.fieldKey, "highlight"]}
                                rules={[
                                  { required: true, message: "กรุณากรอกข้อมูล" }
                                ]}
                                style={{ display: 'inline-block', width: '95%' }}
                              >
                                <Input placeholder="กรุณากรอกข้อมูล" />
                              </Form.Item>

                              {/* This is the Dynamic bed Adder */}

                              <MinusCircleOutlined
                                style={{ position: 'absolute', left: '97%', top: 8 }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </div>
                          ))}

                          <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                              Add field
                        </Button>
                          </Form.Item>
                        </div>
                      );
                    }}
                  </Form.List>
                  <div style={{ marginBottom: 10 }}><span>หน้าที่และความรับผิดชอบ</span></div>
                  <Form.List name="responsibility">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map((field) => (
                            <div style={{ position: "relative" }} >
                              <Form.Item
                                {...field}
                                name={[field.name, "responsibilityprops"]}
                                fieldKey={[field.fieldKey, "responsibilityprops"]}
                                rules={[
                                  { required: true, message: "กรุณากรอกข้อมูล" }
                                ]}
                                style={{ display: 'inline-block', width: '95%' }}
                              >
                                <Input placeholder="กรุณากรอกข้อมูล" />
                              </Form.Item>
                              <MinusCircleOutlined
                                style={{ position: 'absolute', left: '97%', top: 8 }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </div>
                          ))}
                          <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                              Add field
                        </Button>
                          </Form.Item>
                        </div>
                      );
                    }}
                  </Form.List>

                  <div style={{ marginBottom: 10 }}><span>คุณสมบัติ</span></div>
                  <Form.List name="jobproperties">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map((field) => (
                            <div style={{ position: "relative" }} >
                              <Form.Item
                                {...field}
                                name={[field.name, "jobprops"]}
                                fieldKey={[field.fieldKey, "jobprops"]}
                                rules={[
                                  { required: true, message: "กรุณากรอกข้อมูล" }
                                ]}
                                style={{ display: 'inline-block', width: '95%' }}
                              >
                                <Input placeholder="กรุณากรอกข้อมูล" />
                              </Form.Item>

                              {/* This is the Dynamic bed Adder */}

                              <MinusCircleOutlined
                                style={{ position: 'absolute', left: '97%', top: 8 }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </div>
                          ))}

                          <Form.Item>
                            <Button type="dash" onClick={() => add()} block icon={<PlusOutlined />}>
                              Add field
                        </Button>
                          </Form.Item>
                        </div>
                      );
                    }}
                  </Form.List>
                  <div style={{ marginBottom: 10 }}><span>สวัสดิการ</span></div>
                  <Form.List name="benefits">
                    {(fields, { add, remove }) => {
                      return (
                        <div>
                          {fields.map((field) => (
                            <div style={{ position: "relative" }} >
                              <Form.Item
                                {...field}
                                name={[field.name, "benefitprops"]}
                                fieldKey={[field.fieldKey, "benefitprops"]}
                                rules={[
                                  { required: true, message: "กรุณากรอกข้อมูล" }
                                ]}
                                style={{ display: 'inline-block', width: '95%' }}
                              >
                                <Input placeholder="กรุณากรอกข้อมูล" />
                              </Form.Item>
                              <MinusCircleOutlined
                                style={{ position: 'absolute', left: '97%', top: 8 }}
                                onClick={() => {
                                  remove(field.name);
                                }}
                              />
                            </div>
                          ))}

                          <Form.Item>
                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                              Add field
                        </Button>
                          </Form.Item>
                        </div>
                      );
                    }}
                  </Form.List>
                  {/*<Form.Item
                    name="title_image"
                    label="ภาพหัวข้อ"
                    rules={[{ required: true, message: 'กรุณาเลือกรูปภาพ' }]}
                  >
                     <Upload
                      maxCount={1}
                      beforeUpload={e => beforeUpload(e)}
                      onChange={e => handleChange(e)}
                    >
                      <Button >Upload (Max: 1)</Button>
                    </Upload> 
                    <input type='file' onChange={e => handleChange(e)} />
                  </Form.Item>*/}
                  <Form.Item
                    name="company_email"
                    label="Email ที่ใช้ในการติดต่อ"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="line_id"
                    label="Line ID ที่ใช้ในการติดต่อ"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="company_facebook"
                    label="Facebook ที่ใช้ในการติดต่อ"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="company_tel"
                    label="เบอร์โทรศัพท์ที่ใช้ในการติดต่อ"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="logo_image"
                    label="โลโก้บริษัท"
                  // rules={[{ required: true, message: 'กรุณาเลือกรูปภาพ' }]}
                  >
                    <input type='file' onChange={e => handleLogoChange(e)} />

                  </Form.Item>
                  {/* {userRole === '4y0h9WnLw/TjWXpwK9EZ4D7WCZaB9s/2U/sPcnup1do='?
                  <Form.Item
                    name="qr_code"
                    label="QR CODE"
                    rules={[{ required: true, message: 'กรุณาเลือกรูปภาพ' }]}
                  >
                    <input type='file' onChange={e => handleLogoChange(e)} />

                  </Form.Item>
                  :<></>} */}
                  <Form.Item style={{ textAlign: 'center' }}>
                    <Button type="primary" htmlType="submit">
                      Post
                  </Button>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      }
    </>
  )
}

export async function getStaticProps(context) {
  return {
    props: {}
  }
}