import Promise from "bluebird";
import path from "path";
import fs from "fs";
import {v4 as uuidV4} from "uuid";
import sharp from "sharp";
import {Images} from "../models";

export  const imagesUpload =async (files,imageDir,data)=>{
    const fileNames = await Promise.map(files, async (file) => {
        const dir = path.join(__dirname, `../public/images/${imageDir}`)
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
        const fileName = `${uuidV4()}.jpg`;
        const filePath = path.join(`${dir}`, fileName);
        console.log(filePath);
        await Promise.all([
            sharp(file.buffer)
                .rotate()
                .resize(512)
                .toFile(filePath),
            sharp(file.buffer)
                .rotate()
                .resize(512)
                .toFile(filePath + '.webp')
        ]);
        return fileName;
    })
    console.log(fileNames)
    const images = await Images.bulkCreate(fileNames.map(src => ({
        src:`images/${imageDir}/${src}`,
        sightseeingId: data.id
    })));

}