import { useEffect, useState } from 'react';
import '../css/main.css';
import axios from 'axios';
import 'font-awesome/css/font-awesome.min.css';
import Card from './Card';

const Main = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/books`, {withCredentials:true}).then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <div>
      <section className="jumbotron text-center">
        <div className="container">
          <div className="input-group">
            <input type="text" className="form-control" placeholder="Search this site" />
            <div className="input-group-append">
              <button className="btn btn-secondary" type="button">
                <i className="fa fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="album py-5 bg-light">
        <div className="container">
          <div className="row">
            {data.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
