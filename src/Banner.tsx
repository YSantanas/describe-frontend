import { useState, useEffect } from "react";
 
const Banner = () => {
 //cambio de idioma
 const [title, setTitle] = useState("Describe - Español");
 const [title2, setTitle2] = useState("Descubre el mundo através de la web");

 useEffect(() => {
   const pathname = window.location.pathname;
   if (pathname === "/paginas/describeIng.html") {
     setTitle("Describe - English");
     setTitle2("Discover the world through the web");
   } else {
     setTitle("Describe - Español");
     setTitle2("Descubre el mundo através de la web");
   }
 }, [window.location.pathname]);

 //fin cambio de idioma

  return (
    <>
      <div className="entrada ribbon">
        <h1 className="titulo-pag">{title}</h1>
      </div>

      <div className="contenedor-citas">
        <blockquote>
          <p className="maquina-de-escribir">
            {title2} <br />— Describe
          </p>
        </blockquote>
      </div>
    </>
  );
};
export default Banner;
