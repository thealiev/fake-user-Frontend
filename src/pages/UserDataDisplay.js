import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { getUserData } from "../utils/api";

const UserDataDisplay = ({ region, seed, errorAmount }) => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadUserData(page);
  }, [region, seed, errorAmount]);

  const loadUserData = async (pageNumber) => {
    try {
      const data = await getUserData(region, pageNumber, 20, errorAmount, seed);
      if (data.length > 0) {
        setUserData((prevData) => [...prevData, ...data]);
        setPage((prevPage) => prevPage + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };

  return (
    <InfiniteScroll
      dataLength={userData.length}
      next={() => loadUserData(page + 1)}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={<p>No more data to load</p>}
    >
      <div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="w-full h-16 border-gray-300 border-b py-8">
              <th className="text-left pl-8">Index</th>
              <th className="text-left pl-8">Identifier</th>
              <th className="text-left pl-8">Name</th>
              <th className="text-left pl-8">Address</th>
              <th className="text-left pl-8">Phone</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index} className="h-20 text-gray-600 font-medium">
                <td className="pl-8">{index + 1}</td>
                <td className="pl-8">{user.randomIdentifier}</td>
                <td className="pl-8">{user.name}</td>
                <td className="pl-8">{user.address}</td>
                <td className="pl-8">{user.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </InfiniteScroll>
  );
};

export default UserDataDisplay;
