import { createContext, useState, useEffect } from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import ResultsList from "./ResultsList";

interface IData {
  definiciones: [];
  componentes: [];
  funciones: [];
}
interface IContext extends IData {
  setData: React.Dispatch<React.SetStateAction<IData>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppContext = createContext<IContext>({
  definiciones: [],
  componentes: [],
  funciones: [],
  setData: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

function App() {
  const [data, setData] = useState<IData>({
    definiciones: [],
    componentes: [],
    funciones: [],
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //cambio de idioma

  const [title, setTitle] = useState("Definiciones");
  const [title2, setTitle2] = useState("Componentes");
  const [title3, setTitle3] = useState("Funciones");

  useEffect(() => {
    const pathname = window.location.pathname;
    if (pathname === "/paginas/describeIng.html") {
      setTitle("Definitions");
      setTitle2("Components");
      setTitle3("Funcions");
    } else {
      setTitle("Definiciones");
      setTitle2("Componentes");
      setTitle3("Funciones");
    }
  }, [window.location.pathname]);

  //fin cambio de idioma

  return (
    <AppContext.Provider
      value={{
        definiciones: data.definiciones,
        componentes: data.componentes,
        funciones: data.funciones,
        isLoading,
        setData,
        setIsLoading,
      }}
    >
      <Header />

      <main>
        <Banner />
        <Form />
        {isLoading ? (
          <h1>Cargando...</h1>
        ) : (
          <>
            <ResultsList results={data.definiciones} title={title} />
            <ResultsList
              results={data.componentes}
              title={title2}
              className="titulo-sec2"
            />
            <ResultsList results={data.funciones} title={title3} />
          </>
        )}
      </main>

      <Footer />
    </AppContext.Provider>
  );
}
export default App;
