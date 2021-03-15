import { Button, Popconfirm } from 'antd'
import Link from 'next/link'
import { PostApi } from '../api/PostApi';
export const scholarData = ['ไม่ระบุ', 'ปวช./ปวส.', 'ปริญญาตรี', 'ปริญญาโท', 'ปริญญาเอก']
export const provinceData = ['กรุงเทพมหานคร', 'กระบี่', 'กาญจนบุรี', 'กาฬสินธุ์', 'กำแพงเพชร', 'ขอนแก่น', 'จันทบุรี', 'ฉะเชิงเทรา', 'ชลบุรี', 'ชัยนาท', 'ชัยภูมิ', 'ชุมพร', 'เชียงราย', 'เชียงใหม่', 'ตรัง', 'ตราด', 'ตาก', 'นครนายก', 'นครปฐม', 'นครพนม', 'นครราชสีมา', 'นครศรีธรรมราช', 'นครสวรรค์', 'นนทบุรี', 'นราธิวาส', 'น่าน', 'บึงกาฬ', 'บุรีรัมย์', 'ปทุมธานี', 'ประจวบคีรีขันธ์', 'ปราจีนบุรี', 'ปัตตานี', 'พระนครศรีอยุธยา', 'พังงา', 'พัทลุง', 'พิจิตร', 'พิษณุโลก', 'เพชรบุรี', 'เพชรบูรณ์', 'แพร่', 'พะเยา', 'ภูเก็ต', 'มหาสารคาม', 'มุกดาหาร', 'แม่ฮ่องสอน', 'ยะลา', 'ยโสธร', 'ร้อยเอ็ด', 'ระนอง', 'ระยอง', 'ราชบุรี', 'ลพบุรี', 'ลำปาง', 'ลำพูน', 'เลย', 'ศรีสะเกษ', 'สกลนคร', 'สงขลา', 'สตูล', 'สมุทรปราการ', 'สมุทรสงคราม', 'สมุทรสาคร', 'สระแก้ว', 'สระบุรี', 'สิงห์บุรี', 'สุโขทัย', 'สุพรรณบุรี', 'สุราษฎร์ธานี', 'สุรินทร์', 'หนองคาย', 'หนองบัวลำภู', 'อ่างทอง', 'อุดรธานี', 'อุทัยธานี', 'อุตรดิตถ์', 'อุบลราชธานี', 'อำนาจเจริญ'];
export const jobPositionData = ['ไม่ระบุ', 'ระดับเจ้าหน้าที่', 'หัวหน้างาน']
export const workExperience = ['ไม่ระบุ', '1 ปี', '2 ปี', '3 ปี', '4 ปี', '5 ปี']
export const workType = ['งานชั่วคราว', 'นักศึกษาฝึกงาน', 'งานเต็มเวลา', 'งานประจำ']
export const mypostsTable = [
    {
        title: 'วันที่ประกาศ',
        dataIndex: 'post_date',
        key: 'post_date',
        width:120
    },
    {
        title: 'ชื่อประกาศ',
        dataIndex: 'post_title',
        key: 'post_title',
        width:150
    },
    {
        title: 'ตำแหน่ง',
        dataIndex: 'job_position',
        key: 'job_position',
        width:150

    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width:150,
        render: (text, record) => (
            <>
                <Link href={'/job/' + record.post_id}>
                    <Button
                        type='primary'
                        onClick={e => localStorage.setItem('prevLocation', 'reports')}
                        style={{ marginRight: 8 }}
                    >
                        ดูรายละเอียด
                </Button>
                </Link>
                <Popconfirm
                    title="คุณต้องการลบรายงานนี้?"
                    onConfirm={() => {
                        PostApi.deletePostById(record._id).then(res => {
                            window.location.reload()
                        })
                    }}//(record._id)}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="danger">Delete</Button>
                </Popconfirm>
            </>
        ),
    }
]

export const workSelected = [
    {
        title: 'ประเภทงานทั้งหมด',
        value: 'alljobs',
        key: 'alljobs'
    },
    {
        title: 'งานบัญชี',
        value: 'allaccountant',
        key: 'allaccountant',
        children: [
            {
                title: 'งานบัญชี',
                value: 'accountant',
                key: 'accountant',
            },
            {
                title: 'งานตรวจสอบบัญชี',
                value: 'audit',
                key: 'audit'
            },
            {
                title: 'งาน Credit Control',
                value: 'credit_control',
                key: 'credit_control'
            },
            {
                title: 'งานภาษี',
                value: 'tax',
                key: 'tax'
            },
            {
                title: 'งานบัญชีอื่นๆ',
                value: 'other_accountant',
                key: 'other_accountant'
            }
        ],
    },
    {
        title: 'งานธุรการ งานทรัพยากรบุคคล',
        value: 'allhr',
        key: 'allhr',
        children: [
            {
                title: 'งานธุรการ งานจัดการทั่วไป',
                value: 'administration',
                key: 'administration'
            },
            {
                title: 'งานเลขานุการ งาน Personal Assistant',
                value: 'secretary',
                key: 'secretary '
            },
            {
                title: 'งานธุรการอื่นๆ งานบุคคลอื่นๆ',
                value: 'other_administration',
                key: 'other_administration'
            },
            {
                title: 'งานบริหารค่าจ้าง งานบริหารผลตอบแทน',
                value: 'compensation',
                key: 'compensation'
            },
            {
                title: 'งานแรงงานสัมพันธ์',
                value: 'employee_relations',
                key: 'employee_relations'
            },
            {
                title: 'งานสรรหาบุคลากร',
                value: 'recruitment',
                key: 'recruitment'
            },
            {
                title: 'งานฝึกอบรม',
                value: 'training_development',
                key: 'training_development'
            }
        ]
    },
    {
        title: 'งานโฆษณา งานสื่อ',
        value: 'media_advertising',
        key: 'media_advertising',
        children: [
            {
                title: 'งานครีเอทีฟ',
                value: 'creative',
                key: 'creative'
            },
            {
                title: 'งานผลิตสื่อ',
                value: 'production',
                key: 'production '
            },
            {
                title: 'งานวางกลยุทธ์โฆษณา',
                value: 'strategic_planning',
                key: 'strategic_planning'
            },
            {
                title: 'งานโฆษณาอื่นๆ',
                value: 'other_advertisement',
                key: 'other_advertisement'
            },
            {
                title: 'งานบรรณาธิการ งานข่าว',
                value: 'journalism',
                key: 'journalism'
            },
            {
                title: 'งานสื่อสิ่งพิมพ์',
                value: 'print_media',
                key: 'print_media'
            },
            {
                title: 'งานวิทยุโทรทัศน์',
                value: 'broadcasting',
                key: 'broadcasting'
            },
            {
                title: 'งานช่างภาพ งานตัดต่อ',
                value: 'photography',
                key: 'photography'
            }
        ]
    },
    {
        title: 'งานธนาคาร งานการเงิน',
        value: 'banking_finance',
        key: 'banking_finance',
        children: [
            {
                title: 'งานวิเคราะห์การลงทุน',
                value: 'analysis',
                key: 'analysis'
            },
            {
                title: 'งานบริการลูกค้าองค์กร',
                value: 'corporate_banking',
                key: 'corporate_banking '
            },
            {
                title: 'งานวิเคราะห์สินเชื่อ งานอนุมัติสินเชื่อ',
                value: 'credit_analysis',
                key: 'credit_analysis'
            },
            {
                title: 'งานลงทุน',
                value: 'investment',
                key: 'investment'
            },
            {
                title: 'งานสินเชื่อ',
                value: 'loan',
                key: 'loan'
            },
            {
                title: 'งานรับจำนอง',
                value: 'mortgage',
                key: 'mortgage'
            },
            {
                title: 'งาน Private Banking',
                value: 'private_banking',
                key: 'private_banking'
            },
            {
                title: 'งาน Retail Banking',
                value: 'retail_banking',
                key: 'retail_banking'
            },
            {
                title: 'งานที่ปรึกษาการเงินลูกค้าองค์กร',
                value: 'corporate_finance',
                key: 'corporate_finance'
            },
            {
                title: 'งาน Treasuer',
                value: 'treasury',
                key: 'treasury'
            },
            {
                title: 'งานบริการด้านการเงิน',
                value: 'financial_services',
                key: 'financial_services'
            },
            {
                title: 'งานเงินทุนหลักทรัพย์',
                value: 'equities',
                key: 'equities'
            },
            {
                title: 'งานบริหารกองทุน',
                value: 'fund_management',
                key: 'fund_management'
            },
            {
                title: 'งานธนาคารอื่นๆ',
                value: 'other_banking',
                key: 'other_banking'
            },
            {
                title: 'งานเร่งรัดหนี้สิน',
                value: 'credit_management',
                key: 'credit_management'
            },
            {
                title: 'งาน Bancassurance',
                value: 'bancassurance',
                key: 'bancassurance'
            },
            {
                title: 'งานบริหารความเสี่ยง',
                value: 'risk_management',
                key: 'risk_management'
            },
            {
                title: 'งานบริหารความมั่งคั่ง',
                value: 'wealth_management',
                key: 'wealth_management'
            },
            {
                title: 'งานบริหารสินทรัพย์',
                value: 'asset_management',
                key: 'asset_management'
            }
        ]
    },
    {
        title: 'งานก่อสร้าง',
        value: 'building_construction',
        key: 'building_construction',
        children: [
            {
                title: 'งานสถาปัตยกรรม',
                value: 'architectural',
                key: 'architectural',
            },
            {
                title: 'งานก่อสร้าง งานควบคุมอาคาร',
                value: 'building',
                key: 'building',
            },
            {
                title: 'งานโยธา งานโครงสร้าง',
                value: 'civil',
                key: 'civil',
            }
        ]
    },
    {
        title: 'งานออกแบบ',
        value: 'design',
        key: 'design',
        children: [
            {
                title: 'งานออกแบบแฟชั่น',
                value: 'fashion',
                key: 'fashion',
            },
            {
                title: 'งานกราฟิก',
                value: 'graphics',
                key: 'graphics',
            },
            {
                title: 'งานออกแบบผลิตภัณฑ์',
                value: 'industrial_product',
                key: 'industrial_product',
            },
            {
                title: 'งานออกแบบตกแต่งภายใน',
                value: 'interior',
                key: 'interior',
            },
            {
                title: 'งานออกแบบมัลติมีเดีย',
                value: 'multimedia',
                key: 'multimedia',
            },
            {
                title: 'งานออกแบบการจัดวางสินค้า',
                value: 'visual_merchandising',
                key: 'visual_merchandising',
            },
            {
                title: 'งานออกแบบเว็บไซต์',
                value: 'web_design',
                key: 'web_design',
            },
            {
                title: 'งานออกแบบอื่นๆ',
                value: 'other_design',
                key: 'other_design',
            }
        ]
    },
    {
        title: 'งานการศึกษา งานวิชาการ',
        value: 'education',
        key: 'education',
        children: [
            {
                title: 'งานอาจารย์',
                value: 'professor',
                key: 'professor',
            },
            {
                title: 'งานบรรณารักษ์',
                value: 'librarian',
                key: 'librarian',
            },
            {
                title: 'งานครู',
                value: 'teacher',
                key: 'teacher',
            },
            {
                title: 'งานสอนพิเศษ',
                value: 'tutor',
                key: 'tutor',
            },
            {
                title: 'งานการศึกษาอื่นๆ',
                value: 'other_education',
                key: 'other_education',
            }
        ]
    },
    {
        title: 'งานวิศวกรรม',
        value: 'engineering',
        key: 'engineering',
        children: [
            {
                title: 'งานวิศวกรพลังงาน',
                value: 'energy_engineer',
                key: 'energy_engineer',
            },
            {
                title: 'งานวิศวกรรมเคมี',
                value: 'chemical_engineer',
                key: 'chemical_engineer',
            },
            {
                title: 'งานวิศวกรไฟ้า งานวิศวกรอิเล็ทรอนิกส์',
                value: 'electrical_engineer',
                key: 'electrical_engineer',
            },
            {
                title: 'งานวิศวกรโครงการ',
                value: 'project_management_engineer',
                key: 'project_management_engineer',
            },
            {
                title: 'งานวิศวกรสิ่งแวดล้อม งาน จป',
                value: 'environmental_engineer',
                key: 'environmental_engineer',
            },
            {
                title: 'งานวิศวกรรมอุตสาหการ',
                value: 'industrial_engineer',
                key: 'industrial_engineer',
            },
            {
                title: 'งานวิศวกรซ่อมบำรุง',
                value: 'maintenance_engineer',
                key: 'maintenance_engineer',
            },
            {
                title: 'งานวิศวกรการผลิต งานวิศวกรโรงงาน',
                value: 'manufacturing_engineer',
                key: 'manufacturing_engineer',
            },
            {
                title: 'งานวิศวกรเครื่องกล',
                value: 'mechanical_engineer',
                key: 'mechanical_engineer',
            },
            {
                title: 'งานวิศวกรโทรคมนาคม',
                value: 'telecom_engineer',
                key: 'telecom_engineer',
            },
            {
                title: 'งานวิศวกรอื่นๆ',
                value: 'other_engineer',
                key: 'other_engineer',
            }
        ]
    },
    {
        title: 'งานสุขภาพ งานโภชนาการ งานความงาน',
        value: 'beauty_care',
        key: 'beauty_care',
        children: [
            {
                title: 'งานสปาบำบัด งานฟิตเนส งานกีฬา',
                value: 'spa_fitness_sports',
                key: 'spa_fitness_sports',
            },
            {
                title: 'งานกีฬาอื่นๆ',
                value: 'other_sports',
                key: 'other_sports'
            }
        ],
    },
    {
        title: 'งานท่องเที่ยว งานโรงแรม งาน F&B',
        value: 'travel_hotel',
        key: 'travel_hotel',
        children: [
            {
                title: 'งานอาหารและเครื่องดื่ม',
                value: 'food_beverage',
                key: 'food_beverage',
            },
            {
                title: 'งานบริหารการโรงแรม',
                value: 'hotel_management',
                key: 'hotel_management'
            },
            {
                title: 'งาน Operation',
                value: 'operation_management',
                key: 'operation_management'
            },
            {
                title: 'งานท่องเที่ยวอื่นๆ',
                value: 'other_travels',
                key: 'other_travels'
            },
            {
                title: 'งานทัวร์ งานบริษัททัวร์',
                value: 'tourism',
                key: 'tourism'
            }
        ],
    },
    {
        title: 'งานไอที',
        value: 'it',
        key: 'it',
        children: [
            {
                title: 'งาน Software',
                value: 'software_jobs',
                key: 'software_jobs',
            },
            {
                title: 'งาน Database',
                value: 'database_jobs',
                key: 'database_jobs'
            },
            {
                title: 'งาน Hardware',
                value: 'hardware_jobs',
                key: 'hardware_jobs'
            },
            {
                title: 'งานดูและเว็บไซต์ งาน SEO',
                value: 'seo_jobs',
                key: 'seo_jobs'
            },
            {
                title: 'งาน IT Audit',
                value: 'it_audit',
                key: 'it_audit'
            },
            {
                title: 'งาน IT Project',
                value: 'it_project',
                key: 'it_project'
            },
            {
                title: 'งาน IT Support',
                value: 'it_support',
                key: 'it_support'
            },
            {
                title: 'งาน MIS',
                value: 'mis',
                key: 'mis'
            },
            {
                title: 'งานโปรแกรมเมอร์',
                value: 'programmers',
                key: 'programmers'
            },
            {
                title: 'งาน Application Network',
                value: 'application_network',
                key: 'application_network'
            },
            {
                title: 'งาน IT Security',
                value: 'it_security',
                key: 'it_security'
            },
            {
                title: 'งาน Software Tester',
                value: 'tester',
                key: 'tester'
            },
            {
                title: 'งานดูแลระบบ Network',
                value: 'network_systems',
                key: 'network_systems'
            },
            {
                title: 'งานที่ปรึกษาไอที',
                value: 'it_consulting',
                key: 'it_consulting'
            },
            {
                title: 'งานไอทีอื่นๆ',
                value: 'other_it',
                key: 'other_it'
            },
            {
                title: 'งาน Mobile งาน Wireless Communications',
                value: 'mobile_jobs',
                key: 'mobile_jobs'
            },
            {
                title: 'งาน ออกแบบ UX / UI',
                value: 'ux_ui',
                key: 'ux_ui'
            },
            {
                title: 'งานนักวิทยาศาสตร์ข้อมูล',
                value: 'data_scientist',
                key: 'data_scientist'
            }
        ],
    }
]
export const workSelectedHeader = [
    {
        title: 'ประเภทงานทั้งหมด',
        value: 'ประเภทงานทั้งหมด',
        key: 'ประเภทงานทั้งหมด'
    },
    {
        title: 'งานบัญชี',
        value: 'งานบัญชี',
        key: 'งานบัญชี',
    },
    {
        title: 'งานโฆษณา งานสื่อ',
        value: 'งานโฆษณา งานสื่อ',
        key: 'งานโฆษณา งานสื่อ',
    },
    {
        title: 'งานออกแบบ',
        value: 'งานออกแบบ',
        key: 'งานออกแบบ',
    },
    {
        title: 'งานการศึกษา งานวิชาการ',
        value: 'งานการศึกษา งานวิชาการ',
        key: 'งานการศึกษา งานวิชาการ',
    },
    {
        title: 'งานสุขภาพ งานโภชนาการ งานความงาน',
        value: 'งานสุขภาพ งานโภชนาการ งานความงาน',
        key: 'งานสุขภาพ งานโภชนาการ งานความงาน',
    },
    {
        title: 'งานไอที',
        value: 'งานไอที',
        key: 'งานไอที',
    },
    {
        title: 'งานโพส Facebook',
        value: 'งานโพส Facebook',
        key: 'งานโพส Facebook',
    },
    {
        title: 'งานโพส Line',
        value: 'งานโพส Line',
        key: 'งานโพส Line',
    },
    {
        title: 'งานโพส Youtube',
        value: 'งานโพส Youtube',
        key: 'งานโพส Youtube',
    },
    {
        title: 'งานโพส TikTok',
        value: 'งานโพส TikTok',
        key: 'งานโพส TikTok',
    },
    {
        title: 'งานโพส Instagram',
        value: 'งานโพส Instagram',
        key: 'งานโพส Instagram',
    }
]
export const workSelectedHeaderWithoutAll = [
    {
        title: 'งานโพส Facebook',
        value: 'งานโพส Facebook',
        key: 'งานโพส Facebook',
    },
    {
        title: 'งานโพส Line',
        value: 'งานโพส Line',
        key: 'งานโพส Line',
    },
    {
        title: 'งานโพส Youtube',
        value: 'งานโพส Youtube',
        key: 'งานโพส Youtube',
    },
    {
        title: 'งานโพส TikTok',
        value: 'งานโพส TikTok',
        key: 'งานโพส TikTok',
    },
    {
        title: 'งานโพส Instagram',
        value: 'งานโพส Instagram',
        key: 'งานโพส Instagram',
    }
]
export const rangeOfJobs = [
    {
        title:'ระยะเวลารับงานทั้งหมด',
        key:'ระยะเวลารับงานทั้งหมด',
        value:'ระยะเวลารับงานทั้งหมด',
    },
    {
        title:'รายวัน',
        key:'รายวัน',
        value:'รายวัน',
    },
    {
        title:'รายสัปดาห์',
        key:'รายสัปดาห์',
        value:'รายสัปดาห์',
    },
    {
        title:'รายเดือน',
        key:'รายเดือน',
        value:'รายเดือน',
    }
]
export const rangeOfJobsWithoutAll = [
    {
        title:'รายวัน',
        key:'รายวัน',
        value:'รายวัน',
    },
    {
        title:'รายสัปดาห์',
        key:'รายสัปดาห์',
        value:'รายสัปดาห์',
    },
    {
        title:'รายเดือน',
        key:'รายเดือน',
        value:'รายเดือน',
    }
]
export const showAdsInIndex = [
    {
        title:'งานโพสออนไลน์รับเงินรายวัน',
        key:'งานโพสออนไลน์รับเงินรายวัน',
        value:'งานโพสออนไลน์รับเงินรายวัน',
    },
    {
        title:'งานโพสออนไลน์รับเงินงานรายสัปดาห์',
        key:'งานโพสออนไลน์รับเงินงานรายสัปดาห์',
        value:'งานโพสออนไลน์รับเงินงานรายสัปดาห์',
    },
    {
        title:'งานโพสออนไลน์รายเดือน',
        key:'งานโพสออนไลน์รายเดือน',
        value:'งานโพสออนไลน์รายเดือน',
    }
]