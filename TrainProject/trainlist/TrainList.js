import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import DataTable from "react-data-table-component";

const TrainList = () => {
  let logVal = JSON.parse(localStorage.getItem('login'));
  const [change, setChange] = useState(JSON.parse(localStorage.getItem(`${logVal.email}TrainList`)))
  const navigate = useNavigate()

  // logout function //

  function loggedOut() {

    localStorage.removeItem('login')
    navigate('/login')
  }

  // if user logout remove from the local storage login state //

  let handleDelete = (remove) => {
    setChange(remove)
    localStorage.setItem(`${logVal.email}TrainList`, JSON.stringify(remove))

  }

  // Sweet alert for the deleted fields //

  let handleRemove = (id) => {

    let exit = getval.filter(item => item.id !== id)
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        handleDelete(exit);
      }
    })

  }
  let getval = JSON.parse(localStorage.getItem(`${logVal.email}TrainList`) || "[]")
  console.log(getval);

  // Data table functions and create by RAJASEKAR //

  const columns = [
    {
      id: 1,
      name: "Id's",
      selector: (row, i) => i + 1,
      sortable: true,
      reorder: true,
      style: {
        backgroundColor: "orange",
        color: "black"
      }
    },
    {
      id: 2,
      name: "Train Number",
      selector: (row) => row.TrainNumber,
      sortable: true,
      reorder: true,
      style: {
        backgroundColor: "orange",
        color: "black"
      }
    },
    {
      id: 3,
      name: "Train Name",
      selector: (row) => row.TrainName,
      sortable: true,
      right: true,
      reorder: true,
      style: {
        backgroundColor: "orange",
        color: "black"
      }
    },
    {
      id: 4,
      name: "Total Seats",
      selector: (row) => row.TotalSeats,
      sortable: true,
      right: true,
      reorder: true,
      style: {
        backgroundColor: "white",
        color: "blue"
      }
    },
    {
      id: 5,
      name: "StartPoint",
      selector: (row) => row.StartPointLocation,
      sortable: true,
      right: true,
      reorder: true,
      style: {
        backgroundColor: "white",
        color: "blue"
      }
    },
    {
      id: 6,
      name: "End Point",
      selector: (row) => row.EndPointLocation,
      sortable: true,
      right: true,
      reorder: true,
      style: {
        backgroundColor: "green",
        color: "white"
      }
    },
    {
      id: 7,
      name: "edit",

      cell: (row) => <button onClick={() => navigate(`/TrainList/${row.id}`)} className='button3 fs-5 rounded-2'> edit</button>,
      sortable: true,
      right: true,
      reorder: true,
      style: {
        backgroundColor: "green",
        color: "white",

      }
    },
    {
      id: 8,
      name: "delete",

      cell: (row) => <button onClick={() => handleRemove(row.id)} className='button1 fs-5 rounded-2'> Delete</button>,
      sortable: true,
      right: true,
      reorder: true,
      style: {
        backgroundColor: "green",
        color: "white"
      }
    }
  ];

  // DATA table design and style by RAJASEKAR //

  return (
    <div className='container tablepage'>
      <button className='buttons rounded-2 mt-3 fs-5' onClick={() => navigate('/AddTrain')}>
        Add Train
      </button>
      <button className='buttons ms-5 rounded-2 fs-5' onClick={() => navigate('/Dashboard')}>
        Go to Dashboard
      </button>
      <div className='datatable'>
        {getval.length > 0 ? (
          <DataTable
            title="TrainList"
            columns={columns}
            data={getval}
            defaultSortFieldId={1}
            pagination
            customStyles={{
              head: {
                style: {
                  backgroundColor: '#007bff',
                  color: 'red',
                  border: '1px solid black',
                  fontSize: "16px",
                },
              },
              rows: {
                style: {
                  backgroundColor: '000080',
                  border: '1px solid black',
                },
              },
              cells: {
                style: {
                  color: 'red',
                  border: '1px solid black',
                  fontSize: "14px",
                },
              },
            }}
          />
        ) : (
          <div><h1 className='text-danger'>sorry no products found so go and AddTrain</h1></div>
        )}
      </div>
    </div>
  );
};

export default TrainList;