import { useState } from 'react'
import { message, Form, Input, Button, Upload, TreeSelect, Select, notification } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { jobPositionData, provinceData, scholarData, workExperience, workType, workSelected, workSelectedHeaderWithoutAll } from '../../util/mockData'
import { useRouter } from 'next/router'
import { PostApi } from '../../api/PostApi'
import jwt_decode from 'jwt-decode';
import Redirect from '../../components/Redirect'
import Cookie from 'js-cookie'
import DashboardMenu from '../../components/DashboardMenu';
import Head from 'next/head'

const { TextArea } = Input
const { SHOW_PARENT } = TreeSelect;
const formItemLayout = {
  labelCol: {
    xs: { span: 1 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};



export default function FirstPost() {
  const getCookie = Cookie.get("hrme")
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState(getCookie)
  const [uploadImgList, setUploadImgList] = useState([])
  const [logoImg, setLogoImg] = useState([])
  const [treeSelectValue, setTreeSelectValue] = useState([])

  const [warningData, setWarningData] = useState(false)
  const [form] = Form.useForm();
  const router = useRouter()


  const onFinish = (e) => {
    const getCookie = Cookie.get("token")
    const jwtDecoded = jwt_decode(getCookie);
    const parseJwtDecoded = JSON.parse(JSON.stringify(jwtDecoded));
    e.title_image = uploadImgList
    e.user_id = parseJwtDecoded._id
    e.logo_image = logoImg
    e.role = parseJwtDecoded.role
    e.all_works = 'ประเภทงานทั้งหมด'
    e.all_province = 'สถานที่ทำงานทั้งหมด'
    if (e.benefits === undefined || e.jobproperties === undefined || e.jobshighlights === undefined || e.logo_image.length < 1 || e.title_image < 1) {
      setWarningData(true)
    } else {
      PostApi.createNewPost(e).then(res => {
        if (res === "Post Successful") {
          window.location.reload()
        }
      })
    }
  }

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const filename = file.name
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve({ filename: filename, b64img: reader.result });
      reader.onerror = error => reject(error);
    });
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
      const img = await getBase64(imgFile, imgFileUrl => setLoading(false))
      setUploadImgList(arr => [...arr, img])
    }
    // if (info.file.status === 'uploading') {
    //   setLoading(true)
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   const img = await getBase64(info.file.originFileObj, imageUrl =>
    //     setLoading(false)
    //   );
    //   setUploadImgList(arr => [...arr, img])
    // }
  };

  const handleLogoChange = async (info) => {
    const imgFile = info.target.files[0]
    const checkSizeTypeImage = beforeUpload(imgFile)
    if (checkSizeTypeImage) {
      const img = await getBase64(imgFile, imgFileUrl => setLoading(false))
      setLogoImg(arr => [...arr, img])
    }
    // if (info.file.status === 'uploading') {
    //   setLoading(true)
    //   return;
    // }
    // if (info.file.status === 'done') {
    //   // Get this url from response in real world.
    //   const img = await getBase64(info.file.originFileObj, imageUrl =>
    //     setLoading(false)
    //   );
    //   setLogoImg(arr => [...arr, img])
    // }
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
        <meta name="keywords" content="aks124, aks124.com, AKS124, AKS124.com"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
        <meta property="og:url" content="https://aks124.com/"></meta>
        <meta property="og:title" content="บาคาร่าออนไลน์ aks124 aks124.com สมัครบาคาร่า aks124 ทดลองเล่นฟรี"></meta>
        <meta property="og:description" content="รวมบาคาร่าออนไลน์ aks124 aks124.com  คาสิโนออนไลน์ บาคาร่า aks124 ผ่านมือถือ ระบบออโต้ ฝากถอน 30 วิ เล่นเกมส์ได้เงินจริง"></meta>
        <meta property="og:site_name" content="aks124.com"></meta>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { userId === undefined ? <Redirect to='/login' /> : <div className='container mx-auto'>
        <div className='flex flex-wrap mx-auto p-4 lg:relative'>
          <DashboardMenu />
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
                    job_position: jobPositionData[0],
                    work_experience: workExperience[0],
                    work_type: [workType[2]],
                    province: [provinceData[0]],
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
                        return (<Select.Option value={data}>
                          {data}
                        </Select.Option>)
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="job_position"
                    label="ระดับตำแหน่ง"
                  >
                    <Select >
                      {jobPositionData.map(data => {
                        return (<Select.Option value={data}>
                          {data}
                        </Select.Option>)
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="work_experience"
                    label="อายุงาน"
                  >
                    <Select>
                      {workExperience.map(data => {
                        return (<Select.Option value={data}>
                          {data}
                        </Select.Option>)
                      })}
                    </Select>
                  </Form.Item>
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
                      {workType.map(data => {
                        return <Select.Option value={data}>{data}</Select.Option>
                      })}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="province"
                    label="จังหวัด"
                  >
                    <Select mode="multiple" showSearch  >
                      {provinceData.map(data => {
                        return <Select.Option value={data}>{data}</Select.Option>
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

                  <Form.Item
                    name="title_image"
                    label="ภาพหัวข้อ"
                    rules={[{ required: true, message: 'กรุณาเลือกรูปภาพ' }]}
                  >
                    {/* <Upload
                      maxCount={1}
                      beforeUpload={e => beforeUpload(e)}
                      onChange={e => handleChange(e)}
                    >
                      <Button >Upload (Max: 1)</Button>
                    </Upload> */}
                    <input type='file' onChange={e => handleChange(e)} />
                  </Form.Item>
                  <Form.Item
                    name="logo_image"
                    label="โลโก้บริษัท"
                    rules={[{ required: true, message: 'กรุณาเลือกรูปภาพ' }]}
                  >
                    <input type='file' onChange={e => handleLogoChange(e)} />

                  </Form.Item>
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