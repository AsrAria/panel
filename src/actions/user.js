// MARK: imports
import { upload } from "helper/restHelper.js";

// MARK: api

export const BASE_URL = "/user";

export const UPLOAD_IMAGE_URL = BASE_URL + "/:id/image";

export const uploadImage = (id, file, type, successCallBack, errorCallBack) => {
  return function() {
    upload(
      UPLOAD_IMAGE_URL.replace(":id", id),
      file,
      type,
      successCallBack,
      errorCallBack
    );
  };
};

export const UPLOAD_FILE_URL = BASE_URL + "/:id/file";

export const uploadFile = (id, file, type, successCallBack, errorCallBack) => {
  return function() {
    upload(
      UPLOAD_FILE_URL.replace(":id", id),
      file,
      type,
      successCallBack,
      errorCallBack
    );
  };
};
