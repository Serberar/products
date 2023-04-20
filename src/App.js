import React, { useState } from "react";
import ReactModal from "react-modal";
import "./App.css";

const App = () => {
  const [articulos, setArticulos] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [comentario, setComentario] = useState("");

  const agregarArticulo = (event) => {
    event.preventDefault();
    setArticulos([...articulos, { nombre: event.target.elements.nombreArticulo.value, comentarios: [] }]);
  };

  const agregarComentario = (articuloIndex) => {
    const nuevosArticulos = [...articulos];
    nuevosArticulos[articuloIndex].comentarios.push(comentario);
    setArticulos(nuevosArticulos);
    setComentario("");
  };

  const eliminarArticulo = (articuloIndex) => {
    const nuevosArticulos = [...articulos];
    nuevosArticulos.splice(articuloIndex, 1);
    setArticulos(nuevosArticulos);
  };

  const eliminarComentario = (articuloIndex, comentarioIndex) => {
    const nuevosArticulos = [...articulos];
    nuevosArticulos[articuloIndex].comentarios.splice(comentarioIndex, 1);
    setArticulos(nuevosArticulos);
  };

  return (
    <div>
      <div className="agregar">
        <form onSubmit={agregarArticulo}>
          <input type="text" name="nombreArticulo" placeholder="Nombre de artículo" />
          <button type="submit">Agregar artículo</button>
        </form>
      </div>
      {articulos.map((articulo, articuloIndex) => (
        <div key={articuloIndex} className="articulo">
          <button className="x" onClick={() => eliminarArticulo(articuloIndex)}>
            X
          </button>
          <h3>{articulo.nombre}</h3>
          <br />
          <button onClick={() => setModalIsOpen(articuloIndex)}>Comentarios</button>
          <ReactModal
            isOpen={modalIsOpen === articuloIndex}
            onRequestClose={() => setModalIsOpen(false)}
          >
            <button className="x" onClick={() => setModalIsOpen(false)}>
              X
            </button>
            <input type="text" value={comentario} onChange={(event) => setComentario(event.target.value)} />
            <button onClick={() => agregarComentario(articuloIndex)}>
              Agregar comentario
            </button>
            <h2>Comentarios</h2>
            {articulo.comentarios.map((comentario, comentarioIndex) => (
              <div key={comentarioIndex}>
                <p>{comentario}</p>
                <button onClick={() => eliminarComentario(articuloIndex, comentarioIndex)}>
                  Eliminar comentario
                </button>
              </div>
            ))}
          </ReactModal>
        </div>
      ))}
    </div>
  );
}

export default App;
