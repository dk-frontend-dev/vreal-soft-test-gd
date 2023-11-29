import s from './Files.module.scss';
import {Typography} from "@mui/material";
import {useStore} from "@/store/store.ts";
import {useEffect, useState} from "react";
import {httpClient} from "@/shared/api/httpClient.ts";
import {AxiosResponse} from "axios";
import {File as IFile} from '@prisma/client';
import File from "@/widgets/Files/File/File.tsx";
import {useSearchParams} from "react-router-dom";
import AppButton from "@/shared/ui/AppButton/AppButton.tsx";
import CreateFile from "@/widgets/Files/CreateFile/CreateFile.tsx";

function Files() {
    const [isCreateFileOpen, setIsCreateFileOpen] = useState<boolean>(false);
    const [searchParams] = useSearchParams();
    const {files, setFiles} = useStore();

    const getFiles = async () => {
        const {data}: AxiosResponse<IFile[]> = await httpClient.get('files', {params: {folderId: searchParams.get('folderId')}});
        setFiles(data);
    }

    const onCreateFile = async (response: boolean) => {
        setIsCreateFileOpen(false);

        if (!response) return;

        void getFiles();
    }

    useEffect(() => {
        void getFiles();
    }, [searchParams])

    return (
        <>
            <section className={s.section}>
                <header className={s.header}>
                    <Typography variant={'h4'} gutterBottom>Files</Typography>
                    <AppButton text={'Create file'} variant={'contained'} onClick={() => setIsCreateFileOpen(true)} />
                </header>

                <div className={s.files}>
                    {files && files.map(file => (
                        <File file={file} key={file.id} onFileUpdated={() => getFiles()} />
                    ))}

                    {!files?.length && <Typography variant={'subtitle1'} gutterBottom>No files</Typography>}
                </div>
            </section>

            <CreateFile isOpen={isCreateFileOpen} closeDialog={onCreateFile} />
        </>
    );
}

export default Files;
