import { addFile, editFile, deleteFile } from "./Files";
import { login, editUser } from "./Users";

const Mutation = {
  login,
  editUser,
  addFile,
  editFile,
  deleteFile,
};

export default Mutation;
