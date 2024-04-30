import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const UserDataDisplay = ({ region, seed, errorAmount }) => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    loadInitialData();
  }, [region, seed, errorAmount]);

  const fetchData = async (pageNumber) => {
    try {
      const response = await fetch(`http://localhost:5000/api/userData`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          region,
          seed,
          page: pageNumber,
          pageSize: 20,
          errorAmount,
        }),
      });
      if (!response.ok) {
        throw new Error("Server responded with an error");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API fetch error:", error);
    }
  };

  const loadInitialData = async () => {
    const initialData = await fetchData(1);
    if (initialData && initialData.length > 0) {
      setUserData(initialData);
      setPage(2);
    }
  };

  const fetchMoreData = async () => {
    if (!hasMore) return;
    const moreData = await fetchData(page);
    if (!moreData || moreData.length === 0) {
      setHasMore(false);
    } else {
      setUserData((prevData) => [...prevData, ...moreData]);
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <InfiniteScroll
      dataLength={userData.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <div className="flex justify-center items-center mt-10 text-[20px]">
          Loading...
        </div>
      }
      endMessage={
        <p className="text-center text-red-500">No more data to load</p>
      }
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
