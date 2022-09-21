import { Fragment, useState } from "react";
import { useInfiniteQuery } from "react-query";

function App() {
  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(`https://reqres.in/api/users?page=${pageParam}`);
    return res.json();
  };
  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery("users", fetchData, {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return false;
      },
    });

  return (
    <>
      <div className="body">
        {isLoading && <h3>Loading...</h3>}
        {error && <h3>OBS! something went wrong.</h3>}
        <h2 className="title">OUR EMPLOYEES</h2>
        <div className="our-employees-list">
          {data &&
            data.pages.map((userData, i) => {
              return (
                <>
                  <Fragment key={userData.id}>
                    {userData.data.map((user, i) => (
                      <div className="employee-cart" key={userData.id}>
                        <img
                          src={user.avatar}
                          alt={user.first_name + user.last_name + "avatar"}
                        />
                        <h3>
                          {user.first_name} {user.last_name}
                        </h3>
                        <a href={"mailto:" + user.email} className="email">
                          Contact
                        </a>
                      </div>
                    ))}
                  </Fragment>
                </>
              );
            })}
        </div>
        {hasNextPage && (
          <button onClick={() => fetchNextPage()} className="load-more">
            Load next page
          </button>
        )}
      </div>
    </>
  );
}

export default App;
