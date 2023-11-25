import { AppContext } from './App';
import logoDescribe from './assets/logoDescribe.png';

import { Formik } from 'formik';
import { useContext } from 'react';
import { useMutation } from 'react-query';

import { useState, useEffect } from "react";

const Form = () => {

 //------------------->>>> cambio de idioma
 const [formtitle, formTitle] = useState("Escribe tu palabra: ");
 const [formtitle2, formTitle2] = useState("Descargar");
 const [formtitle3, formTitle3] = useState("Enviar");
 const [formtitle4, formTitle4] = useState("Término");

 useEffect(() => {
   const pathname = window.location.pathname;
   if (pathname === "/paginas/describeIng.html") {
    formTitle("Write your word: ");
    formTitle2("Download");
    formTitle3("Send");
    formTitle4("Term");
   } else {
    formTitle("Escribe tu palabra: ");
    formTitle2("Descargar");
    formTitle3("Enviar");
    formTitle4("Término");
   }
 }, [window.location.pathname]);

 //------------------->>>> fin cambio de idioma


  const { setData, setIsLoading } = useContext(AppContext);

  const mutation = useMutation((text: string) => {
    return fetch('http://127.0.0.1:5000/buscar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ palabra: text }),
    });
  });

  return (
    <section className="fondo-sec">
      <div
        className="container-dia justify-content-center"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src={logoDescribe}
          alt="Descripción de la imagen"
          className="imagen"
        />
      </div>

      <section>
        <Formik
          initialValues={{
            palabra: '',
          }}
          onSubmit={async (values) => {
            setIsLoading(true);
            await mutation.mutateAsync(values.palabra, {
              onSuccess: async (data) => {
                const datos = await data.json();
                setData(datos);
              },
            });
            setIsLoading(false);
          }}
        >
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
          }) => (
            <form className="form" id="miFormulario" onSubmit={handleSubmit}>
              <div className="contenedor-interior">
                <div className="mb-3">
                  <label htmlFor="palabra" className="form-label">
                  {formtitle}
                    
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="palabra"
                    name="palabra"
                    placeholder={formtitle4}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.palabra}
                  />
                </div>

                <div className="row">
                  <div className="col-6">
                    <button
                      type="button"
                      className="btn btn-modificado btn-outline-success my-4"
                      id="btnDescargar"
                    >
                      {formtitle2}
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-modificado btn-outline-info my-4"
                      id="btnEnviar"
                      disabled={isSubmitting}
                    >
                      {formtitle3}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </Formik>
      </section>
    </section>
  );
};
export default Form;
