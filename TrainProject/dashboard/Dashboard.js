import { useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { useDeleteRegisterMutation, useDisplayDataQuery, useGetRegisterQuery, useGetAllUsersQuery } from '../../store/Endpoint';
import api from '../../store/api';
import { useState } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isSuccess, isLoading, isError, error } = useDisplayDataQuery();
  const {data: adminData} = useGetAllUsersQuery();
  const [deleteUser] = useDeleteRegisterMutation();
  const [currentPage, setCurrentPage] = useState(1);

  const handleDelete = async (id) => {
    await deleteUser({ id });
  };

  const columns = [
    {
      id: 0,
      name: "S.no",
      selector: (row, index) => index + 1,
      sortable: true,
      reorder: true
    },
    {
      id: 1,
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      reorder: true
    },
    {
      id: 2,
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
      reorder: true
    },
    {
      id: 3,
      name: "Actions",
      cell: (row) => <button className='button4 fs-5 rounded-1 me-5' type="button" onClick={(e) => navigate(`/editUser/${row._id}`)}>update</button>,
      sortable: true,
      right: true,
      reorder: true
    },
    {
      id: 4,
      name: "Admin Actions",
      cell: (row) => (
        <button className='button2 fs-5 rounded-1 me-5' type="button" onClick={() => handleDelete(row._id)}>
          delete
        </button>
      ),
      sortable: true,
      right: true,
      reorder: true
    }
  ];

  let content;
  if (isLoading) {
    content = <p>Data Is Loading</p>;
  } else if (isSuccess) {

    const startIndex = (currentPage - 1) * 5;
    const paginationData = data.slice(startIndex, startIndex+5)
    content = (
      <DataTable
        className='dataTable'
        title="Product Lists"
        columns={columns}
        data={paginationData}
        defaultSortFieldId={1}
        pagination
        paginationServer
        paginationPerPage={6}
        paginationTotalRows={data.length}
        onChangePage={(page) => setCurrentPage(page)}
        customStyles={{
          head: {
            style: {
              backgroundColor: '#007bff',
              color: 'red',
              border: '1px solid black',
              fontSize: "16px"
            }
          },
          rows: {
            style: {
              backgroundColor: '000080',
              border: '1px solid black'
            }
          },
          cells: {
            style: {
              color: 'red',
              border: '1px solid black',
              fontSize: "14px"
            }
          }
        }}
      />
    );if (adminData && adminData.length > 0 && adminData[0].role === 'admin') {
      columns.push({
        id: 4,
        name: "Admin Actions",
        cell: (row) => (
          <>
            <button className='button4 fs-5 rounded-1 me-5' type="button" onClick={(e) => navigate(`/editUser/${row._id}`)}>
              update
            </button>
            <button className='button2 fs-5 rounded-1 me-5' type="button" onClick={() => handleDelete(row._id)}>
              delete
            </button>
          </>
        ),
        sortable: true,
        right: true,
        reorder: true,
      });
    }

  } else {
    content = <p>Error Message</p>;
  }

  return (
    <div>
      {content}
      
    </div>
  );
};

export default Dashboard;
