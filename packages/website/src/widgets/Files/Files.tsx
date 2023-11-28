import s from './Files.module.scss';
import {Typography} from "@mui/material";
import {useStore} from "@/store/store.ts";
import {useEffect, useState} from "react";
import {httpClient} from "@/shared/api/httpClient.ts";
import {AxiosResponse} from "axios";
import {File as IFile} from '@prisma/client';
import File from "@/widgets/Files/File/File.tsx";
import {useSearchParams} from "react-router-dom";
import {isGrantedLib} from "@/shared/lib/isGruntedLib.ts";

function Files() {
    const [isHavePermissions, setIsHavePermissions] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const {files, currentFolder, currentUser, setFiles} = useStore();

    const getFiles = async () => {
        const {data}: AxiosResponse<IFile[]> = await httpClient.get('files', {params: {folderId: searchParams.get('folderId')}});
        setFiles(data);
    }

    useEffect(() => {
        void getFiles();
    }, [searchParams])

    useEffect(() => {
        if (!currentFolder) {
            setIsHavePermissions(true);
            return;
        }

        const isGranted = isGrantedLib(currentUser!.id, currentFolder.userId, currentFolder.access);
        setIsHavePermissions(isGranted);
    }, [currentFolder, currentUser])

    return (
        <section className={s.section}>
            <Typography variant={'h4'} gutterBottom>Files</Typography>

            <div className={s.files}>
                {files && files.map(file => (
                    <File file={file} key={file.id} isHavePermissions={isHavePermissions} onFileDeleted={() => getFiles()} />
                ))}

                {!files?.length && <Typography variant={'subtitle1'} gutterBottom>No files</Typography>}
            </div>
        </section>
    );
}

export default Files;
