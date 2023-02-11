import { ApolloError, useReactiveVar } from "@apollo/client";
import { Formik, Form } from "formik";
import * as yup from "yup";
import React, { useEffect, useState } from "react";
import { Season, SeasonType } from "../../types/season";
import EmptyState from "../common/EmptyState";
import { LoaderSmall } from "../common/Loaders";
import { useGetAllSeasons } from "../../lib/hooks/useSeasons";
import SearchField from "../common/SearchField";
import SeasonRequestConfirmationModal from "./SeasonRequestConfirmationModal";
import clsx from "clsx";
import { authenticatedUser, AuthUser } from "../../lib/constants/authenticated";

type Props = {
  onClose: () => void;
};

const SeasonRequestModal = ({ onClose }: Props) => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSeasonId, setActiveSeasonId] = useState<string>("");

  const authUser = useReactiveVar(authenticatedUser) as AuthUser;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  // const [createSeason] = useMutation(CREATE_SEASON);
  const { data, loading, error } = useGetAllSeasons({ isActive: true });
  const [seasons, setSeasons] = useState([]);

  const [filteredSeasons, setFilteredSeasons] = useState([]);


  var images = [
    "/images/season-item.svg",
    "/images/season-item.svg",
    "/images/season-item.svg",
  ];

  const handleConfirmModalOpen = (seasonId: string) => {
    setActiveSeasonId(seasonId);
    setIsConfirmModalOpen(true);
  };

  useEffect(() => {
    if (data?.seasons?.items.length >= 0) {
      setSeasons(data.seasons.items);
      setFilteredSeasons(data.seasons.items);
    }
  }, [data]);

  useEffect(() => {
    const filteredData = seasons.filter((season: Season) => {
      return (
        season.name
          .trim()
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()) ||
        season.seasonType
          .trim()
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase())
      );
    });
    setFilteredSeasons(filteredData);
  }, [searchQuery, seasons]);

  return (
    <>
      <div
        className={clsx(
          "flex justify-center transition-all duration-200 py-8 text-[#2e2d2d] bg-[#0f0e0e] w-screen h-screen absolute top-0 bottom-0 left-0 right-0  bg-opacity-30 z-50",
          isConfirmModalOpen ? " bg-opacity-60" : ""
        )}
      >
        <div
          role="alert"
          className="flex flex-col gap-y-3  min-h-fit relative overflow-hidden bg-white container mx-auto w-11/12 md:w-1/2 lg:w-4/5 xl:w-2/3 rounded-xl  px-8 py-5 pb-10"
        >
          {isConfirmModalOpen && (
            <SeasonRequestConfirmationModal
              groupId={authUser.headToGroup.id || ""}
              seasonId={activeSeasonId}
              onClose={() => setIsConfirmModalOpen(false)}
            />
          )}
          <div className="w-full flex flex-col">
            <div className="my-3 w-full flex justify-between items-center">
              <h2 className="font-semibold text-lg">Start a New Season</h2>
              <div className="cursor-pointer" onClick={() => onClose()}>
                <svg
                  className="font-bold text-gray-600"
                  width={24}
                  height={24}
                  viewBox="0 0 28 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 7L7 21"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 7L21 21"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            <div className="w-full flex flex-col items-start mb-2">
              <p className="tracking-wider text-md text-start text-[#949494]">
                Add your group to the respective season
              </p>
            </div>
            <SearchField
              id="season-search"
              placeholder="Search a Global Season"
              onChange={handleSearch}
              className="!w-full !border !border-[#DCDCDC] !rounded-3xl"
            />
            {/* SearchBar */}
            <div className="flex flex-col gap-y-4 mt-4">
              {error ? (
                <div>Something went wrong</div>
              )  : loading ? (
                <div className="w-full flex h-full items-center justify-center min-w-full min-h-full">
                  <LoaderSmall />
                </div>
              ): filteredSeasons.length === 0 ? (
                <div className="h-full flex items-center">
                  <EmptyState />
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredSeasons.map((season: any, index: number) => (
                    <div
                      key={index}
                      onClick={() => handleConfirmModalOpen(season.id)}
                      className="cursor-pointer"
                    >
                      <div className="h-36 relative">
                        <div className="h-full w-full bg-gradient-to-t from-black/75 absolute z-10"></div>
                        <img
                          className="h-full w-full flex flex-col justify-between rounded-t-md gap-y-2 object-cover absolute z-0"
                          src={
                            images[Math.floor(Math.random() * images.length)]
                          }
                          alt=""
                        />
                        <div className="flex flex-col justify-between gap-y-2 absolute z-20 h-full p-4">
                          <div className="rounded-t-md">
                            <h1 className="text-md font-semibold text-white">
                              {season.name}
                            </h1>
                            <h1 className="text-white">{season.name}</h1>
                          </div>
                          <div className="flex gap-x-2">
                            <div className="p-2 w-20 bg-[#E4E3F0] rounded-md text-sm text-primary text-center">
                              Current
                            </div>
                            <div className="p-2 w-20 bg-[#E4E3F0] rounded-md text-sm text-primary text-center">
                              21 days
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeasonRequestModal;
