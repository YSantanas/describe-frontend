import { AppContext } from "./App";
import logoDescribe from "./assets/logoDescribe.png";
import { Formik } from "formik";
import { useContext } from "react";
import { useMutation } from "react-query";
import { useState, useEffect } from "react";

const Form = () => {
  const [formBuscar, formBus] = useState("buscar");
  const [formtitle, formTitle] = useState("Escribe tu palabra: ");
  const [formtitle2, formTitle2] = useState("Descargar");
  const [formtitle3, formTitle3] = useState("Enviar");
  const [formtitle4, formTitle4] = useState("Término");
  const [nombreTXT, nombreTexto] = useState("buscar");
  const { setData, setIsLoading } = useContext(AppContext);
  const [descargarError, setDescargarError] = useState(false);
  const mutation = useMutation((text: string) => {
    return fetch(`http://127.0.0.1:5000/${formBuscar}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ palabra: text }),
    });
  });

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/paginas/describeIng.html") {
      formBus("buscarIng");
      formTitle("Write your word: ");
      formTitle2("Download");
      formTitle3("Send");
      formTitle4("Term");
      nombreTexto("Search_Result");
    } else {
      formBus("buscar");
      formTitle("Escribe tu palabra: ");
      formTitle2("Descargar");
      formTitle3("Enviar");
      formTitle4("Término");
      nombreTexto("Resultado_Busqueda");
    }
  }, [window.location.pathname]);

  const handleGuardarEnTxt = async (word: string) => {
    try {
      setIsLoading(true);
      const response = await mutation.mutateAsync(word);

      if (!response.ok) {
        throw new Error("Error al obtener los datos");
      }

      const datos = await response.json();
      
      const contenidoArchivo = JSON.stringify(datos, null, 2);

      const archivo = new Blob([contenidoArchivo], { type: "text/plain" });
      const urlArchivo = URL.createObjectURL(archivo);

      const enlaceDescarga = document.createElement("a");
      enlaceDescarga.href = urlArchivo;
      enlaceDescarga.download = `${nombreTXT}.txt`;
      enlaceDescarga.click();

      URL.revokeObjectURL(urlArchivo);
      setIsLoading(false);
      setDescargarError(false);
    } catch (error) {
      setIsLoading(false);
      setDescargarError(true);
    }
  };

  const handleEnviar = async (values: { palabra: string }) => {
    setIsLoading(true);
    await mutation.mutateAsync(values.palabra, {
      onSuccess: async (data) => {
        const datos = await data.json();
        setData(datos);
      },
    });
    setIsLoading(false);
  };

  return (
    <section className="fondo-sec">
      <div className="container-dia justify-content-center">
        <img
          src={logoDescribe}
          alt="Descripción de la imagen"
          className="imagen"
        />
      </div>
      <section>
        <Formik
          initialValues={{ palabra: "" }}
          onSubmit={(values) => handleEnviar(values)}
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
                      onClick={() => handleGuardarEnTxt(values.palabra)}
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
                    {descargarError && (
                      <p style={{ color: "red" }}>
                        Error al guardar los datos. Inténtalo de nuevo.
                      </p>
                    )}
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
