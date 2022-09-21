import { Fragment } from "react";
import { useInfiniteQuery } from "react-query";

function App() {
  const fetchData = async ({ pageParam = 1 }) => {
    const res = await fetch(`https://reqres.in/api/users?page=${pageParam}`);
    return res.json();
  };
  const { data, isLoading, fetchNextPage, hasNextPage, error } =
    useInfiniteQuery("users", fetchData, {
      getNextPageParam: (lastPage) => {
        if (lastPage.page < lastPage.total_pages) return lastPage.page + 1;
        return false;
      },
    });

  return (
    <>
      <div className="body">
        {isLoading && (
          <div className="loading">
            <p>Loading... </p>
          </div>
        )}
        {error && (
          <div className="error">
            <p>OBS! something went wrong.</p>
          </div>
        )}
        {data && <h2 className="title">OUR EMPLOYEES</h2>}
        <div className="our-employees-list">
          {data &&
            data.pages.map((usersData) => {
              return (
                <>
                  <Fragment key={usersData.id}>
                    {usersData.data.map((user) => (
                      <div className="employee-cart" key={user.id}>
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
