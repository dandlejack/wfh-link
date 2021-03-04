import { Button, Popconfirm } from 'antd'
import Link from 'next/link'

export const rewardColumns = [
    {
        title: 'No.',
        dataIndex: 'key',
        width: '15%',
        editable: true,
    },
    {
        title: 'รายชื่อผู้โชคดี',
        dataIndex: 'lucky_name',
        width: '30%',
        editable: true,
    },
    {
        title: 'เงินรางวัล',
        dataIndex: 'reward',
        width: '30%',
        editable: true,
    }
]

export const TopTenColumn = [
    {
        title: 'วันที่ประกาศ',
        dataIndex: 'topten_date',
        key: 'post_date',
        width: 120
    },
    {
        title: 'Action',
        dataIndex: 'action',
        key: 'action',
        width: 150,
        render: (text, record) => (
            <>
                <Link href={'/posts/' + record.topten_id}>
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