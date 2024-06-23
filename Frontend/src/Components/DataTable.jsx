/* eslint-disable react/prop-types */
/* eslint-disable no-empty-pattern */
import { Stack } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// import noData from '@/assets/no-result.gif';

const TableComponent = ({
    tableData,
    tableColumn,
    Loading,
    paginationModel,
    onPaginationModelChange,
    pageSizeOptions,
    rowCount,
    onFilterModelChange
}) => {
    return (
        <DataGrid
            autoHeight={true}
            rows={tableData ? tableData : []}
            columns={tableColumn ? tableColumn : []}
            getRowId={(row) => row?._id}
            loading={Loading}
            paginationMode="server"
            filterMode="server"
            pageSizeOptions={pageSizeOptions}
            sx={{
                '& .MuiDataGrid-columnHeader': {
                    borderRadius: '0.625rem',
                    color: '#515151',
                    borderBottom: '0.3125rem',
                    backgroundColor: '#FFFFFF',
                    fontSize: 'medium'
                },
                '& .MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold',
                    color: 'black',
                    paddingTop: '0.63rem'
                },
                '& .css-42ouug-MuiFormControl-root-MuiTextField-root-MuiDataGrid-toolbarQuickFilter':
                    {
                        paddingRight: '1rem'
                    },
                '& .css-vb46ow-MuiButtonBase-root-MuiButton-root': {
                    padding: '1rem',
                    fontSize: '0.9rem'
                },
                '& .css-i4bv87-MuiSvgIcon-root': {
                    width: '1.5rem',
                    height: '1.5rem'
                },
                '& .css-ptiqhd-MuiSvgIcon-root': {
                    width: '1.5rem',
                    height: '1.5rem'
                }
            }}
            slots={{
                noRowsOverlay: () => (
                    <Stack height="99%" alignItems="center" justifyContent="center">
                        {/* <img alt="no Data Found " src={noData} /> */}
                    </Stack>
                )
            }}
            columnHeaderHeight={50}
            rowHeight={50}
            rowCount={rowCount}
            pagination
            disableColumnFilter
            disableColumnSelector
            disableDensitySelector
            onPaginationModelChange={onPaginationModelChange}
            paginationModel={paginationModel}
            onFilterModelChange={onFilterModelChange}
        />
    );
};

export default TableComponent;
