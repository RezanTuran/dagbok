import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const ViewDiary = () => {
  const [viewDiary, setViewDiary] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Axios.get(`/api/view-diary`).then((res) => {
      if (res.data.status === 200) {
        setViewDiary(res.data.diarys);
        setLoading(false);
      }
    });
  }, []);

  const deleteDiary = async (e: any, id: any) => {
    const thidClicked = e.currentTarget;
    thidClicked.innerText = 'Deleting';
    const res = await Axios.delete(`/api/delete-diary/${id}`);

    if (res.data.status === 200) {
      thidClicked.closest('tr').remove();
    }
  };

  var display_DiaryData: any = '';

  if (loading) {
    return <h4>View Diarys Loading...</h4>;
  } else {
    display_DiaryData = viewDiary.map((item: any, index: any) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.title}</td>
          <td>{item.desc}</td>
          <td>{item.date}</td>
          <td>
            <Link
              to={`edit-diary/${item.id}`}
              className="btn btn-success btn-sm"
            >
              Edit
            </Link>
          </td>
          <td>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={(e) => deleteDiary(e, item.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });
  }

  return (
    <div className="card px-4 mt-3">
      <div className="card-header">
        <h4>
          View Books
          <Link to={'add-diary'} className="btn btn-primary btn-sm float-end">
            Add Book
          </Link>
        </h4>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Desc</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>{display_DiaryData}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewDiary;
