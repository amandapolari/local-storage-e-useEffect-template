import { useEffect, useState } from 'react';

export default function App() {
    // Estado para armazenar a lista de compras
    const [listaCompras, setListaCompras] = useState([]);

    // Estado para armazenar o valor do item sendo digitado
    const [item, setItem] = useState('');

    // Função para adicionar um item à lista de compras
    const adicionarItem = () => {
        if (item.trim() !== '') {
            // Verifica se o item não está vazio ou contém apenas espaços em branco
            setListaCompras([...listaCompras, item]); // Adiciona o item à lista de compras
            setItem(''); // Limpa o campo de entrada
        }
    };

    // PRÁTICA 2:
    const getItensLocalStorage = () => {
        const getLista = JSON.parse(localStorage.getItem('lista'));

        // OPÇÃO DE CONDICIONAL 1
        // if (getLista) {
        //     setListaCompras(getLista);
        // }

        // OPÇÃO DE CONDICIONAL 2
        getLista && setListaCompras(getLista);
    };

    // PRÁTICA 1:
    const saveLocalStorage = () => {
        // console.log(listaCompras);
        const listaString = JSON.stringify(listaCompras);
        localStorage.setItem('lista', listaString);
    };

    // FIXAÇÃO
    const removeLista = () => {
        localStorage.removeItem('lista');
        // [DÚVIDA] Devo setar a listaCompras com um array vazio ou uma string vazia? Vai fazer diferença?
        setListaCompras([]);
    };

    // ACONTECE 1X - QUANDO A PÁGINA É MONTADA
    useEffect(() => {
        getItensLocalStorage();
    }, []);

    // ACONTECE QUANDO A LISTA COMPRAS É ATUALIZADA
    useEffect(() => {
        if (listaCompras.length) {
            saveLocalStorage();
        }
    }, [listaCompras]);

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
            <button onClick={removeLista}>Remove Lista</button>

            <ul>
                {listaCompras.map((compra, index) => (
                    <li key={index}>{compra}</li>
                ))}
            </ul>
        </div>
    );
}
