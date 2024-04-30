import React from 'react'
import { useDispatch } from 'react-redux'
import { loginLogout } from '../../redux/actions/authAction';
import { toast } from 'react-toastify';

const Home = () => {
    const dispatch = useDispatch();
    const notify = () => toast("Wow so easy!");


    const handleUserLogOut = () => {
        dispatch(loginLogout());
    }
    
    return (
      <div className="container mt-4">
          <div className="row">
              <div className="col">
                  <h2 onClick={notify}>Página de Usuários</h2>
                  <p>Aqui estão todos os usuários registrados no sistema.</p>
              </div>
          </div>
          <div className="row">
              <div className="col">
                  <table className="table">
                      <thead>
                          <tr>
                              <th scope="col">#</th>
                              <th scope="col">Nome</th>
                              <th scope="col">Email</th>
                              <th scope="col">Ações</th>
                          </tr>
                      </thead>
                      <tbody>
                          {/* Aqui você renderizaria os usuários da sua lista */}
                          <tr>
                              <th scope="row">1</th>
                              <td>João</td>
                              <td>joao@example.com</td>
                              <td>
                                  <button className="btn btn-primary mr-2">Editar</button>
                                  <button className="btn btn-danger">Excluir</button>
                              </td>
                          </tr>
                          {/* Outros usuários */}
                      </tbody>
                  </table>
              </div>
          </div>
          <div className="row">
              <div className="col">
                  <button onClick={handleUserLogOut} className="btn btn-secondary">Sair</button>
              </div>
          </div>
      </div>
  );
}

export default Home
