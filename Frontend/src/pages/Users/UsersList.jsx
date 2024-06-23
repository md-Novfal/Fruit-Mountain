import { UseGetAllUser } from './user.api';
import TableComponent from '../../Components/DataTable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableHeader } from '../../Components/TableHeader';
import { DeleteOutline, VisibilityOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

const UserList = () => {
    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
        searchKey: ''
    });
    const { data, isLoading } = UseGetAllUser(paginationModel);

    const columns = [
        {
            field: 'name',
            headerName: 'Post Name',
            flex: 1,
            renderCell: (cellvalues) => {
                return (
                    <>
                        {cellvalues.row.name.first} {cellvalues.row.name.first}
                    </>
                );
            }
        },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'mobileNumber', headerName: 'Mobile Number', flex: 1 },

        {
            field: 'Actions',
            headerAlign: 'center',
            align: 'center',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            renderCell: (cellvalues) => {
                return (
                    <>
                        <IconButton
                            arialabel={'View'}
                            hasTooltip={true}
                            tooltip={{ title: 'view' }}
                            onClick={() => {
                                navigate('/Users/view', {
                                    state: { row: cellvalues?.row, mode: 'view' }
                                });
                            }}
                        >
                            <VisibilityOutlined />
                        </IconButton>
                        <IconButton
                            arialabel={'delete'}
                            hasTooltip={true}
                            tooltip={{ title: 'delete' }}
                            onClick={() => {}}
                        >
                            <DeleteOutline />
                        </IconButton>
                    </>
                );
            }
        }
    ];

    return (
        <Box sx={{ width: 900 }}>
            <TableHeader tableName={'User Data'} navigateToUserProfile={''} lableAddButton={''} />
            <TableComponent
                Loading={isLoading}
                tableColumn={columns}
                tableData={data?.docs ? data?.docs : []}
                rowCount={data?.totalDocs ? data.totalDocs : 10}
                onPaginationModelChange={setPaginationModel}
                pageSizeOptions={[3, 5, 10, 20, 50, 100]}
            />
        </Box>
    );
};

export default UserList;
