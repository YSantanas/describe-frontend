import { FC } from 'react';

interface IResult {
  titulo: string;
  link: string;
  descripcion: string;
}

interface ResultsListProps {
  title: string;
  results: IResult[];
  className?: string;
}

const ResultsList: FC<ResultsListProps> = ({
  title,
  results,
  className = 'titulo-sec',
}) => {
  if (!results.length) return;

  return (
    <section>
      <h1 id="tituloDatos" className={className}>
        {title}
      </h1>
      <div className="contendor-datos" id="datos">
        {results.map(({ titulo, link, descripcion }, i) => (
          <article title={titulo} className="contenedor-titulo" key={i}>
            <div className="formaDos"></div>
            <a
              href={link}
              title={titulo}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: '1rem' }}
            >
              {descripcion.replace('Web', '')}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
};
export default ResultsList;
