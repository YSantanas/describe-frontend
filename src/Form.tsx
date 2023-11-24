import { AppContext } from './App';
import logoDescribe from './assets/logoDescribe.png';

import { Formik } from 'formik';
import { useContext } from 'react';
import { useMutation } from 'react-query';

const Form = () => {
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
                    Escribe tu palabra:
                  </label>
                  <input
                    type="text"
                    className="form-control mb-2"
                    id="palabra"
                    name="palabra"
                    placeholder="Término"
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
                      Descargar
                    </button>
                  </div>
                  <div className="col-6">
                    <button
                      type="submit"
                      className="btn btn-modificado btn-outline-info my-4"
                      id="btnEnviar"
                      disabled={isSubmitting}
                    >
                      Enviar
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
