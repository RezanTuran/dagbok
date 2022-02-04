import Axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';

const AddDiary = () => {
  const [diary, setDiary]: any = useState({
    title: '',
    date: '',
    desc: '',
  });

  const handleInput = (e: any) => {
    setDiary({
      ...diary,
      [e.target.name]: e.target.value,
    });
  };

  const saveDiary = async (e: any) => {
    e.preventDefault();

    const res = await Axios.post('/api/add-diary', diary);
    if (res.data.status === 200) {
      swal('Success', res.data.message, 'success');
      setDiary({
        ...diary,
      });
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>
                  Add Book
                  <Link
                    to={'/dashboard'}
                    className="btn btn-primary btn-sm float-end"
                  >
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={saveDiary}>
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

export default AddDiary;
