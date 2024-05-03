import { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { User, createUser, deleteUser, fetchUser, updateUser } from "../features/user-users";

export const UserTable = () => {
  const users = useAppSelector((state) => state.users.users);
  const dispatch = useAppDispatch();
  const [selectedUser, setSelectedUser] = useState<User | null>(null); // Armazena o usuário selecionado para atualização
  const [showModal, setShowModal] = useState<boolean>(false); // Controla a exibição do modal
  const [formData, setFormData] = useState<User | null>(null); // Armazena os dados do formulário de atualização
  const [newUserData, setNewUserData] = useState<Partial<User>>({
    id: 0,
    username: "",
    password: "",
    active: true
  }); // Armazena os dados do novo usuário
  const userDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  const handleUpdateUser = (user: User) => {
    setSelectedUser(user);
    setFormData({ ...user }); // Inicializa o formulário de atualização com os dados do usuário selecionado
    setShowModal(true);
  };

  const handleSaveUpdate = () => {
    if (formData) {
      dispatch(updateUser(formData));
      setShowModal(false);
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState!,
      [name]: value
    }));
  };

  const handleActiveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState!,
      [name]: value === 'true' // Converte o valor do campo de rádio para booleano
    }));
  };

  const handleCreateUser = () => {
    // Envia os dados do novo usuário para a API ou faz qualquer outra ação necessária
    console.log("Novo usuário:", newUserData);
    if (newUserData.username && newUserData.password) {
      const newUser: User = {
          id: Math.floor(Math.random() * 1000), // Gere um id aleatório aqui ou use uma lógica diferente para gerar um id
          username: newUserData.username,
          password: newUserData.password,
          active: newUserData.active || false, // Use o valor de newUserData.active se estiver definido, caso contrário, use false
          createdate: "", // Defina conforme necessário
          updateddate: "" // Defina conforme necessário
      };

      dispatch(createUser(newUser));

      // Limpa o formulário após criar o usuário
      setNewUserData({
          username: "",
          password: "",
          active: false
      });
  }
    
    // Limpa o formulário após criar o usuário
    setNewUserData({
      username: "",
      password: "",
      active: false
    });
  };

  const handleDeleteUser = (id: number) => {
    console.log(`Excluir usuário com ID ${id}`);
    dispatch(deleteUser(id));
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-2">Criar Novo Usuário</h2>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Username"
            value={newUserData.username}
            onChange={(e) => setNewUserData({ ...newUserData, username: e.target.value })}
            className="border border-gray-300 px-3 py-1 rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={newUserData.password}
            onChange={(e) => setNewUserData({ ...newUserData, password: e.target.value })}
            className="border border-gray-300 px-3 py-1 rounded-md"
          />
          <div className="flex items-center">
            <input
              type="radio"
              id="active"
              name="active"
              value="true"
              checked={newUserData.active}
              onChange={(e) => setNewUserData({ ...newUserData, active: e.target.checked })}
              className="mr-1"
            />
            <label htmlFor="active">Ativo</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="active"
              name="active"
              value="false"
              checked={newUserData.active}
              onChange={(e) => setNewUserData({ ...newUserData, active: e.target.checked })}
              className="mr-1"
            />
            <label htmlFor="active">Ativo</label>
          </div>
          <button onClick={handleCreateUser} className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">Criar</button>
        </div>
      </div>
      <table className="min-w-full leading-normal">
        <thead>
          <tr>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              ID
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Username
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Password
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Active
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Created Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Updated Date
            </th>
            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => (
            <tr key={user.id}>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.id}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.username}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.password}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.active ? 'Ativo' : 'Inativo'}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.createdate}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                {user.updateddate}
              </td>
              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <button
                  onClick={() => handleUpdateUser(user)}
                  className="text-indigo-600 hover:text-indigo-900"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="text-red-600 hover:text-red-900 ml-4"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showModal && selectedUser && (
                <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center px-4 py-6">
                    <div className="relative bg-white rounded-lg overflow-hidden shadow-xl max-w-3xl">
                        <div className="flex justify-between items-center bg-gray-200 px-6 py-4">
                            <h3 className="text-lg font-semibold">Atualizar Usuário</h3>
                            <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-600 focus:outline-none">
                                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18.707 1.293a1 1 0 0 1 1.414 1.414L13.414 10l6.707 6.293a1 1 0 0 1-1.414 1.414L12 11.414l-6.293 6.293a1 1 0 1 1-1.414-1.414L10.586 10 4.293 3.707A1 1 0 0 1 5.707 2.293L12 8.586l6.293-6.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {/* Modal content */}
                        <div className="px-6 py-4">
                            {/* Username input */}
                            <label className="block text-sm font-medium text-gray-700">Username</label>
                            <input
                                type="text"
                                name="username"
                                value={formData?.username}
                                onChange={handleInputChange}
                                className="mt-1 p-1 border border-gray-300 rounded-md w-full"
                            />
                            {/* Password input */}
                            <label className="block mt-3 text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData?.password}
                                onChange={handleInputChange}
                                className="mt-1 p-1 border border-gray-300 rounded-md w-full"
                            />
                            {/* Active radio box */}
                            <fieldset className="mt-3">
                                <legend className="block text-sm font-medium text-gray-700">Status</legend>
                                <div className="mt-1 space-x-4">
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="active"
                                            value="true"
                                            checked={formData?.active === true}
                                            onChange={handleActiveChange}
                                            className="form-radio h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Ativo</span>
                                    </label>
                                    <label className="inline-flex items-center">
                                        <input
                                            type="radio"
                                            name="active"
                                            value="false"
                                            checked={formData?.active === false}
                                            onChange={handleActiveChange}
                                            className="form-radio h-4 w-4 text-indigo-600"
                                        />
                                        <span className="ml-2 text-sm text-gray-700">Inativo</span>
                                    </label>
                                </div>
                            </fieldset>
                        </div>
                        {/* Modal footer */}
                        <div className="bg-gray-50 px-6 py-4 flex justify-end">
                            <button onClick={handleSaveUpdate} className="bg-indigo-600 text-white px-4 py-2 rounded-md mr-2 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Salvar</button>
                            <button onClick={handleCloseModal} className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500">Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
    </div>
  );
};