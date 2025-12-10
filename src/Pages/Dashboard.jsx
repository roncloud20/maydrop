import { useEffect, useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    const t = localStorage.getItem("token");
    if (t === null || u === null) {
      navigate("/login");
    }

    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/getusers", {
          headers: {
            Authorization: `Bearer ${t}`,
          },
        });
        if (response.status === 200) {
          setUsers(response.data);
        }
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);
  console.log(users);

  return (
    <>
      <Header />
      <section className="bg-gray-50 dark:bg-gray-900">
        <h1 className="text-3xl font-black">Dashboard</h1>

        {/* Users Table */}
        {users.length === 0 ? (
          <h1 className="text-3xl font-black">No Users Found</h1>
        ) : (
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Full name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Role
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                  {users.map((user,i)=>(
                    <tr key={i} className="bg-neutral-primary border-b border-default">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                      >
                        {user.firstname} {user.middlename} {user.surname}
                      </th>
                      <td className="px-6 py-4">{user.user_role}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">$2999</td>
                      <td className="px-6 py-4">231</td>
                    </tr>
                  ))}
                
              </tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
