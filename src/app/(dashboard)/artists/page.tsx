"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import ArtistModalForm from "@/components/ArtistModalForm";

import { apiGet } from "@/helpers/axiosRequest";
import UserContext from "@/context/userContext";
import { ArtistDataTable } from "./components/ArtistDataTable";
import Loading from "@/components/ui/Loading";

function ArtistForm() {
  
  const context = useContext(UserContext);
  const labelId = context?.user?._id;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [artists, setArtists] = useState();

  const fetchAllArtist = async (labelId: any) => {
    setIsLoading(true);
    try {
      const response = await apiGet(
        `/api/artist/getArtists?labelId=${labelId}`
      );

      if (response.success) {
        setArtists(response.data);
      }
      setIsLoading(false);
    } catch (error) {
      toast.error("error !");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (labelId) {
      fetchAllArtist(labelId);
    }
  }, [labelId]);

  const handleClose = () => {
    setIsModalVisible(false);
    fetchAllArtist(labelId);
  };

  return (
    <div
      className="w-full h-full p-6 bg-white rounded-sm"
      style={{ minHeight: "90vh" }}
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink>Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Artists</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="flex justify-between flex-col md:flex-row md:items-center mt-3">
        <h3 className="text-3xl font-bold mb-2 text-blue-500">All Artists</h3>
        <Button className="self-start" onClick={() => setIsModalVisible(true)}>New Artist</Button>
      </div>

      {artists && (
        <div className="bg-white md:p-3">
          <ArtistDataTable data={artists} />
        </div>
      )}

      {isLoading && (
        <Loading />
      )}
      {!artists && !isLoading && (
        <h5 className="text-2xl mt-5 pt-3 text-center">No Record Found</h5>
      )}

      <div className="absolute">
        <ArtistModalForm isVisible={isModalVisible} onClose={handleClose} />
      </div>
    </div>
  );
}

export default ArtistForm;
