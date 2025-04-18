import Aos from 'aos';
import 'aos/dist/aos.css';
import React, { useEffect, useState } from 'react';
import { server } from '../../server/server';
import { toast } from 'react-toastify';

const SecondPage = () => {
  const [data, setData] = useState(null);
  const id = localStorage.getItem('authToken');

  useEffect(() => {
    Aos.init();

    const getUserDataId = async (id) => {
      try {
        const userId = await server.getUserById(id);
        setData(userId);
      } catch (error) {
        toast.error(error.message);
      }
    };

    if (id) {
      getUserDataId(id);
    }
  }, [id]);

  console.log(data);
  

  return (
    <div data-aos="zoom-in">
      <section>
        <div>
          <img src="" alt="user image"/>
        </div>
        <div>
          <span>
            {data ? `Hello Im ${data.user.firstName}` : 'Loading...'}
          </span>
          <div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default SecondPage;
