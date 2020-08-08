import {
  addFile,
  editFile,
  deleteFile,
  publishFile,
  unPublishFile,
} from "./Files";
import { login, editUser, subUser, unSubUser, regenToken } from "./Users";
import {
  addFolder,
  editFolder,
  deleteFolder,
  addPubToFolder,
  unPubToFolder,
} from "./Folders";

const Mutation = {
  login,
  editUser,
  addFile,
  editFile,
  deleteFile,
  publishFile,
  subUser,
  unSubUser,
  unPublishFile,
  addFolder,
  editFolder,
  deleteFolder,
  addPubToFolder,
  unPubToFolder,
  regenToken,
};

export default Mutation;
