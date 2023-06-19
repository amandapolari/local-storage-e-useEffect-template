import { useState } from "react";

export default function App() {
  // Estado para armazenar a lista de compras
  const [listaCompras, setListaCompras] = useState([]);

  // Estado para armazenar o valor do item sendo digitado
  const [item, setItem] = useState("");

  // Função para adicionar um item à lista de compras
  const adicionarItem = () => {
    if (item.trim() !== "") {
      // Verifica se o item não está vazio ou contém apenas espaços em branco
      setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
      setItem(""); // Limpa o campo de entrada
    }
  };

  // PRÁTICA 2:
  const getItensLocalStorage = () => {
    // peguei do local
    const listaString = localStorage.getItem('lista');
    // console.log('pegou:',typeof listaString);

    // transformei em array
    const listaArray = JSON.parse(listaString);
    console.log('ListaArray', listaArray);

    // quando n tem nada no local storage da erro:
    // setListaCompras(listaArray)

    // para não dar erro:
    if(listaArray){
      setListaCompras(listaArray)
    }
  }

  // PRÁTICA 1:
  const saveLocalStorage = () => {
    // console.log(listaCompras);
    const listaString = JSON.stringify(listaCompras);
    localStorage.setItem('lista', listaString);
  }

  return (
    <div>
      <h1>Lista de Compras</h1>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Digite um item"
      />
      <button onClick={adicionarItem}>Adicionar</button>
      <button onClick={saveLocalStorage}>Salvar no Local Storage</button>
      <button onClick={getItensLocalStorage}>Pegar do Local Storage</button>

      <ul>
        {listaCompras.map((compra, index) => (
          <li key={index}>{compra}</li>
        ))}
      </ul>
    </div>
  );
}
