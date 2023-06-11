import { extname } from 'path'
import { v4 as uuidv4 } from 'uuid';

export const imageFileFilter = (req, file, callback) => {
    // console.log(file.originalname)
    // console.log(file.originalname.toLowerCase())
    const filename = file.originalname.toLowerCase()
    if (!filename.match(/\.(jpg|jpeg|png|gif)$/)) {
      return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
  };


export const editFileName = (req, file, callback) => {
    const name = file.originalname.toLowerCase().split('.')[0];
    // console.log("++++++++++++++++++++++++++++++++")
    // console.log(name)
    const fileExtName = extname(file.originalname.toLowerCase());// lấy đuôi .jpg
    // console.log("++++++++++++++++")
    // console.log(fileExtName)
    // console.log(file.originalname.toLowerCase())
    // console.log("++++++++++++++++")
    const randomName = uuidv4()
    callback(null, `${name}-${randomName}${fileExtName}`);
  };