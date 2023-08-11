import { ElMessage, genFileId, UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
// @ts-ignore
import imageCompression from 'browser-image-compression';
const upload = ref<UploadInstance>();
const imageName = ref('');
interface IOptions {
    maxSizeMB: number,
    maxWidthOrHeight: number,
    useWebWorker: boolean,
}
const beforeUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
const options: IOptions = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
};
interface IFiles {
    id: 0,
    name: string,
    percentage: number,
    raw: any,
    size: number,
    status: string,
    uid: number,
    url: string,
}
const file = ref();
const files = ref<any>([]);
const renderFiles = async () => {
    files.value = files.value.filter((item: any) => item !== undefined);
    try {
        for (let i=0; i<files.value.length; i++) {
            const compressedFiles = await imageCompression(files.value[i], options);
            /* Make sure file exists */
            if (!files.value) return;
            /* create a reader */
            const readData = (f: File) => new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(f);
            });
            /* Read data */
            const data = await readData(compressedFiles);
            files.value[i] = data;
        }
    } catch (error) {
        console.log(error);
    }
};
const renderFile = async () => {
    try {
        const compressedFile = await imageCompression(file.value, options);
        /* Make sure file exists */
        if (!file.value) return;
        /* create a reader */
        const readData = (f: File) =>  new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(f);
        });
        /* Read data */
        const data = await readData(compressedFile);
        file.value = data;

    } catch (error) {
        console.log(error);
    }
}
const handleChange: UploadProps['onChange'] = async (uploadFile) =>  {
    file.value = uploadFile.raw;
};
const multiChange: UploadProps['onChange'] = async (uploadFile, uploadFiles) =>  {
    files.value = uploadFiles.map((item) => item.raw);
};
const handleExceed: UploadProps['onExceed'] = async (files) => {
  upload.value!.clearFiles();
  const file = files[0] as UploadRawFile;
  file.uid = genFileId();
  upload.value!.handleStart(file);
};
const fileForRemove = ref<any>([]);
const handleRemove: UploadProps['onRemove'] = async (uploadFile) => {
    // @ts-ignore
    if (uploadFile.id) {
        fileForRemove.value.push(uploadFile);
    }
    files.value = files.value.filter((item: UploadProps) => item.name !== uploadFile.name);
};
const preview = reactive({
    dialog: false,
    preview: '',
})
const handlePreview: UploadProps['onPreview'] = (uploadFile) => {
    preview.dialog = true;
    preview.preview = <string>(uploadFile.url);
}
// const fileUpload = ref<any>()
const imageProcessing = ref(false);
// const selectFile = async (e: any) => {
//     const fileUpload = e.target.files[0];
//     try {
//         imageProcessing.value = true;
//         const compressedFile = await imageCompression(fileUpload, options);
//         /* Make sure file exists */
//         if (!file) return;
//         /* create a reader */
//         const readData = (f: File) =>  new Promise((resolve) => {
//             const reader = new FileReader();
//             reader.onloadend = () => resolve(reader.result);
//             reader.readAsDataURL(f);
//         });
//         /* Read data */
//         const data = await readData(compressedFile);
//         file.value = data;
//         imageProcessing.value = false;
//
//     } catch (error) {
//         console.log(error);
//     }
// };
export default {
    handlePreview,
    handleExceed,
    handleRemove,
    file,
    upload,
    imageName,
    imageProcessing,
    handleChange,
    multiChange,
    files,
    renderFiles,
    renderFile,
    preview,
    fileForRemove,
};
