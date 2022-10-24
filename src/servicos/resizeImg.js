import Resizer from "react-image-file-resizer";

    const resizeImg = (file) =>
        new Promise((resolve) => {
        Resizer.imageFileResizer(
            file,
            800,
            600,
            "JPEG",
            80,
            0,
            (uri) => {
            resolve(uri);
            },
            "base64"
        );
        });

export default resizeImg;