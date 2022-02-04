import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const EditDiary = (props: any) => {
  const history = useHistory();
  const [diary, setDiary]: any = useState({
    title: '',
    date: '',
    desc: '',
  });
  const [loading, setLoading] = useState<boolean>(true);

  const handleInput = (e: any) => {
    setDiary({
      ...diary,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const diary_id = props.match.params.id;
    Axios.get(`/api/edit-diary/${diary_id}`).then((res) => {
      if (res.data.status === 200) {
        setDiary(res.data.message);
      } else if (res.data.status === 404) {
        swal('Error', res.data.message, 'error');
        history.push('/diary');
      }
      setLoading(false);
    });
  }, [props.match.params.id, history]);

  const updateDiary = async (e: any) => {
    e.preventDefault();
    const diary_id = props.match.params.id;

    const res = await Axios.post(`/api/update-diary/${diary_id}`, diary);
    if (res.data.status === 200) {
      swal('Success', res.data.message, 'success');
    } else if (res.data.status === 422) {
      swal('All fields are mandetory', '', 'error');
    } else if (res.data.status === 404) {
      swal('Error', res.data.message, 'error');
      history.push('/view-diary');
    }
  };

  if (loading) {
    return <h4>Edit Diary Data Loading...</h4>;
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>
                  Edit Book
                  <Link
                    to={'/diary'}
                    className="btn btn-primary btn-sm float-end"
                  >
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={updateDiary}>
                  <div className="form-group mb-3">
                    <label>Title</label>
                    <input
                      type="text"
                      name="title"
                      value={diary.title}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Datum</label>
                    <input
                      type="date"
                      name="date"
                      value={diary.date}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Text</label>
                    <input
                      type="text"
                      name="desc"
                      value={diary.desc}
                      onChange={handleInput}
                      className="form-control"
                    />
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">
                      Spara
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDiary;
