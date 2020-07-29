const functions = require('firebase-functions');
const { Storage } =  require ('@google-cloud/storage');
const gcs = new Storage();

const tmpdir = require('os');

const sharp = require('sharp');
const fs = require('fs-extra');
const path = require('path');
const uuid = require('uuid');

exports.resizeImages = functions.storage.object().onFinalize( async object => {
    try {
        const uniqueName = uuid.v1();

        const bucket = gcs.bucket(object.bucket);
        const filePath = object.name;
        const fileName = filePath.split('/').pop();
        const bucketDir = path.dirname(filePath);

        const workingDir = path.join(tmpdir.tmpdir(), `images_${uniqueName}`);
        const tmpFilePath = path.join(workingDir, `source_${uniqueName}.png`);

        if (fileName.includes("image@") || !object.contentType.includes("image")) {
            console.log("Exiting image resizer!");
            return false;
        }

        await fs.ensureDir(workingDir);

        await bucket.file(filePath).download({
            destination: tmpFilePath
        })

        const sizes = [128, 256, 300, 600];

        const uploadPromises = sizes.map(async size => {
            const thumbName = `image@${size}_${fileName}`;
            const thumbPath = path.join(workingDir, thumbName);

            if (size < 300) {
                // Square aspect ratio
                // Good for profile images
                await sharp(tmpFilePath).resize(size, size).toFile(thumbPath);
            } else {
                // 16:9 aspect ratio
                let height = Math.floor(size * 0.5625);

                await sharp(tmpFilePath).resize(size, height).toFile(thumbPath);
            }

            // upload to original bucket
            return bucket.upload(thumbPath, {
                destination: path.join(bucketDir, thumbName)
            });
        });

        await Promise.all(uploadPromises);

        // Remove the temp directories
        await fs.remove(workingDir);
        await fs.remove(bucketDir);

        return Promise.resolve();

    } catch (error) {
        return Promise.reject(error);
    }
});