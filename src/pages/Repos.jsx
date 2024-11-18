import { useState, useEffect } from "react";
import useFetchGoDaddyRepos from "../hooks/useFetchGoDaddyRepos";
import LoadingSpinner from "../components/LoadingSpinner";
import { REPO_URL, NO_DATA_FOUND } from "../appConstant";
import NotRecordFound from "../components/NotRecordFound";
import RepoInfoModal from "../components/RepoInfoModal";

/*
  Implmented client side pagination
  */

const Repos = () => {
  const { data, loading } = useFetchGoDaddyRepos(REPO_URL);
  const [repos, setRepos] = useState([]);
  const [totalPage, setTotalPage] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [paginationList, setPaginationList] = useState([]);
  const [showModal, setShowRepoModal] = useState(false);
  const [repoDetails, setRepoDetails] = useState({});
  const perPageLimit = 10;

  useEffect(() => {
    if (data.length) {
      setRepos(data.slice(0, perPageLimit));
      setPaginationList(
        Array(Math.ceil(data?.length / perPageLimit)).fill(null)
      );
      setTotalPage(Math.ceil(data?.length / perPageLimit));
    }
  }, [data]);

  // Show next page data
  const nextPage = () => {
    const startIndex = perPageLimit * (currentPage + 1);
    const endIndex = startIndex + perPageLimit;
    const currentRepo = data.slice(startIndex, endIndex);
    setRepos(currentRepo);
    setCurrentPage(currentPage + 1);
  };

  // Show previous page data
  const goToPreviousPage = () => {
    const startIndex = (currentPage - 1) * perPageLimit;
    const endIndex = startIndex + perPageLimit;
    const currentRepo = data.slice(startIndex, endIndex);
    setRepos(currentRepo);
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else {
      setCurrentPage(0);
    }
  };

  // Show current page data
  const onClickPage = (value) => {
    const startIndex = value * perPageLimit;
    const endIndex = startIndex + perPageLimit;
    const currentRepo = data.slice(startIndex, endIndex);
    setRepos(currentRepo);
    setCurrentPage(value);
  };

  const ViewRepoDetails = (repo) => {
    setRepoDetails(repo);
    setShowRepoModal(true);
  };
  // show spinner until data fetched
  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="min-h-screen h-full bg-white flex  items-center justify-center pt-10 pb-14">
        <div className="w-full max-w-4xl px-2">
          <div>
            <h1 className="text-2xl font-medium">GoDaddy Repos List</h1>
          </div>
          <div className="w-full overflow-x-scroll md:overflow-auto  max-w-7xl 2xl:max-w-none mt-2">
            <table className="table-auto overflow-scroll md:overflow-auto w-full text-left font-inter border ">
              <thead className="rounded-lg text-base text-white font-semibold w-full">
                <tr className="bg-[#222E3A]/[6%]">
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Repo Id
                  </th>
                  <th className="py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap">
                    Repo Name
                  </th>
                  <th className="flex items-center py-3 px-3 text-[#212B36] sm:text-base font-bold whitespace-nowrap gap-1"></th>
                </tr>
              </thead>
              <tbody>
                {repos.length > 0 ? (
                  repos.map((repo, index) => (
                    <tr
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-[#222E3A]/[6%]"
                      }`}
                      key={index}
                    >
                      <td
                        className={`py-2 px-3 font-normal text-base ${
                          index === 0
                            ? "border-t-2 border-black"
                            : index === data?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-nowrap`}
                      >
                        {repo?.id}
                      </td>
                      <td
                        className={`py-2 px-3 font-normal text-base ${
                          index === 0
                            ? "border-t-2 border-black"
                            : index === data?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-nowrap`}
                      >
                        {repo?.name}
                      </td>

                      <td
                        className={`py-2 px-3 font-normal text-base ${
                          index === 0
                            ? "border-t-2 border-black"
                            : index === data?.length
                            ? "border-y"
                            : "border-t"
                        } whitespace-nowrap`}
                        title="View more details"
                      >
                        <svg
                          data-testid={`icon-svg-${repo.id}`}
                          className="w-6 h-6 text-cyan-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                          onClick={() => ViewRepoDetails(repo)}
                        >
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z"
                          />
                          <path
                            stroke="currentColor"
                            stroke-width="2"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      </td>
                    </tr>
                  ))
                ) : (
                  <NotRecordFound content={NO_DATA_FOUND} />
                )}
              </tbody>
            </table>
          </div>
          {repos.length > 0 && (
            <div className="w-full  flex justify-center sm:justify-between flex-col sm:flex-row gap-5 mt-1.5 px-1 items-center">
              <div className="text-lg">
                Showing {currentPage === 0 ? 1 : currentPage * perPageLimit + 1}{" "}
                to{" "}
                {currentPage === totalPage - 1
                  ? data?.length
                  : (currentPage + 1) * perPageLimit}{" "}
                of {data?.length} repos
              </div>
              <div className="flex">
                <ul
                  className="flex justify-center items-center gap-x-[10px] z-30"
                  role="navigation"
                  aria-label="Pagination"
                >
                  <li
                    data-testid="left-btn"
                    className={` prev-btn flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] disabled] ${
                      currentPage === 0
                        ? "bg-[#cccccc] pointer-events-none"
                        : " cursor-pointer"
                    }`}
                    onClick={goToPreviousPage}
                  >
                    <img alt="Previous page" src="https://www.tailwindtap.com/assets/travelagency-admin/leftarrow.svg" />
                  </li>
                  {paginationList?.map((_, index) => (
                    <li
                      className={`flex items-center justify-center w-[36px] rounded-[6px] h-[34px] border-[1px] border-solid border-[2px] bg-[#FFFFFF] cursor-pointer ${
                        currentPage === index
                          ? "text-cyan-600  border-[#15dcdc]"
                          : "border-[#E4E4EB] "
                      }`}
                      onClick={() => onClickPage(index)}
                      key={index}
                    >
                      {index + 1}
                    </li>
                  ))}
                  <li
                    data-testid="right-btn"
                    className={`flex items-center justify-center w-[36px] rounded-[6px] h-[36px] border-[1px] border-solid border-[#E4E4EB] ${
                      currentPage === totalPage - 1
                        ? "bg-[#cccccc] pointer-events-none"
                        : " cursor-pointer"
                    }`}
                    onClick={nextPage}
                  >
                    <img alt="Next Page" src="https://www.tailwindtap.com/assets/travelagency-admin/rightarrow.svg" />
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      {showModal && (
        <RepoInfoModal
          show={showModal}
          repoDetails={repoDetails}
          onCloseModal={() => setShowRepoModal(false)}
        />
      )}
    </>
  );
};
export default Repos;
