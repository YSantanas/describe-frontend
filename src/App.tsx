import { createContext, useState } from 'react';
import Banner from './Banner';
import Footer from './Footer';
import Form from './Form';
import Header from './Header';
import ResultsList from './ResultsList';

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
            <ResultsList results={data.definiciones} title="Definiciones" />
            <ResultsList
              results={data.componentes}
              title="Componentes"
              className="titulo-sec2"
            />
            <ResultsList results={data.funciones} title="Funciones" />
          </>
        )}
      </main>

      <Footer />
    </AppContext.Provider>
  );
}

export default App;
