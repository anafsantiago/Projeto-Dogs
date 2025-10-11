import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../Hooks/useFetch";
import { PHOTO_GET } from "../../api";
import PhotoContent from "./PhotoContent";
import Erro from "../Helper/Erro";
import Loading from "../Helper/Loading";
import Head from "../Helper/Head";

const Photo = () => {
  const { data, loading, error, request } = useFetch();
  const { id } = useParams();

  React.useEffect(() => {
    async function fetchPhoto() {
      const { url, options } = PHOTO_GET(id);
      const { response, json } = await request(url, options);
    }
    fetchPhoto();
  }, [id, request]);

  if (error) return <Erro error={error} />;
  if (loading) return <Loading />;
  if (data)
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} description={`Foto do ${data.title}`} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  else return null;
};

export default Photo;
