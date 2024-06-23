import { UseGetAllPost } from './post.api';
import TableComponent from '../../Components/DataTable';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TableHeader } from '../../Components/TableHeader';
import { DeleteOutline, EditOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, Box } from '@mui/material';

const PostsList = () => {
    const navigate = useNavigate();
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 5,
        searchKey: ''
    });
    const { data, isLoading } = UseGetAllPost(paginationModel);

    const columns = [
        { field: 'name', headerName: 'Post Name', flex: 1 },
        { field: 'createdAt', headerName: 'created Date', flex: 1 },
        { field: 'updatedAt', headerName: 'updated Date', flex: 1 },

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
                            arialabel={'edit'}
                            hasTooltip={true}
                            tooltip={{ title: 'edit' }}
                            onClick={() => {
                                navigate('/post/create', {
                                    state: { row: cellvalues?.row, mode: 'edit' }
                                });
                            }}
                        >
                            {' '}
                            <EditOutlined />
                        </IconButton>
                        <IconButton
                            arialabel={'View'}
                            hasTooltip={true}
                            tooltip={{ title: 'view' }}
                            onClick={() => {
                                navigate('/post/create', {
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
    const navigateToUserProfile = () => {
        navigate(`create`, {
            state: { mode: 'add' }
        });
    };

    return (
        <Box sx={{ width: 900 }}>
            <TableHeader
                tableName={'Post Data'}
                navigateToUserProfile={navigateToUserProfile}
                lableAddButton={'Create Post'}
            />
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

export default PostsList;
