import React from "react";
import PropTypes from "prop-types";

export default function RepoInfoModal({
  show = false,
  repoDetails = {},
  onCloseModal,
}) {
  //error handling in case if key does not present in the repodetails.
  const {
    name = "-",
    description = "-",
    watchers = "-",
    open_issues = "-",
    forks = "-",
    html_url = "-",
    language = "-",
  } = repoDetails;
  return (
    <>
      {show && (
        <div
          data-testid="repo-info-modal"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="relative w-full max-w-4xl max-h-full">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              {/* <!-- Modal header --> */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Repo Name: {name}
                </h3>
                <button
                  data-testid="cls-btn"
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="default-modal"
                  onClick={onCloseModal}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* <!-- Modal body --> */}
              <div className="p-4 md:p-5 space-y-4">
                <div className="max-w-full	 mx-auto p-6 from-gray-50 to-gray-200  rounded-lg">
                  <dl className="divide-y divide-gray-300">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1 bg-white">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Title
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {name}
                      </dd>
                    </div>

                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1 bg-gray-100">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Description
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {description}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1 bg-white">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Language
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {language}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1 bg-gray-100">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Repo Link
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        <a
                          className="underline"
                          href={html_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {" "}
                          {html_url}
                        </a>
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1 bg-white">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Open Issues
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {open_issues}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1 bg-gray-100">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Watchers
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {watchers}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-1 bg-white">
                      <dt className="text-sm/6 font-medium text-gray-900">
                        Forks
                      </dt>
                      <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {forks}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
RepoInfoModal.propTypes = {
  show: PropTypes.bool.isRequired,
  repoDetails: PropTypes.object.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};
