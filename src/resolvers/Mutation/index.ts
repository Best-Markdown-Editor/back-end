import { addFile, editFile, deleteFile } from "./Files";
import { login, register, logout } from "./Users";

const Mutation = {
  login,
  register,
  logout,
  addFile,
  editFile,
  deleteFile,
};

export default Mutation;
