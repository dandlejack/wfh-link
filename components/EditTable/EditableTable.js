import { useEffect, useState } from 'react'
import { Button, Table, Popconfirm } from 'antd'
import {
    EditableCell,
    EditableRow,
} from './EditableCell';

export const EditableTable = props => {
    const [dataSources, setDataSource] = useState(props.data)
    const [count, setCount] = useState(props.startCount)

    useEffect(()=>{
        dataSources.map((data,index) => {
            data.key = index+1
            handleOperation(data);
            return data;
          });
        if(props.getData!==undefined) props.getData(dataSources)
    },[dataSources])

    const handleOperation = (data) => {
          data.operation = (
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(data)}
            >
              <a style={{ color: 'red' }}>Delete</a>
            </Popconfirm>
          );
        return data.operation
    };

    const handleDelete = (data) => {
        setDataSource(dataSources.filter((item) => item.key !== data.key));
        setCount(count-1)
    };

    const handleSave = (row) => {
        const newData = [...dataSources];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        setDataSource(newData);
    };

    const components = {
        body: {
            row: EditableRow,
            cell: EditableCell,
        },
    };

    const columns = (col) => {
        if (!col.editable) {
            return col;
        }
        const newCol = {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                children: col.children,
                handleSave,
            }),
        };

        if (col.children) {
            newCol.children = col.children.map(columns);
        }
        return newCol;
    };

    const canEditChildColumns = props.column.map(columns);

    const handleAdd = () => {
        const data = {
            lucky_name: `-`,
            reward: 0,
            operation:'' ,
          };
        const newData = {
            key: count,
            ...data,
        };
        handleOperation(newData)
        setCount(count + 1);
        setDataSource([...dataSources, newData]);
    }

    const AddBtn = () => {
        return (
            <Button onClick={handleAdd} style={{ marginBottom: 15 }} type='primary'>
                Add row
            </Button>
        );
    };

    return <div>
        <AddBtn />
        <Table
            columns={canEditChildColumns}
            dataSource={dataSources}
            components={components}
            bordered
            style={{width:'100%'}}
            pagination={props.ablePagination}
        />
    </div>
}
EditableTable.getInitialProps = async (context) => {
    return context
}