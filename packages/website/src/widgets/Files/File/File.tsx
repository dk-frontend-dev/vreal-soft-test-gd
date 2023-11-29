import {File as IFile} from '@prisma/client';
import s from './File.module.scss';
import ArticleIcon from '@mui/icons-material/Article';
import AppButton from '@/shared/ui/AppButton/AppButton.tsx';
import AppDeleteDialog from '@/shared/ui/AppDeleteDialog/AppDeleteDialog.tsx';
import {useState} from 'react';
import AppAuthor from '@/shared/ui/AppAuthor/AppAuthor.tsx';
import {useStore} from '@/store/store.ts';
import EditFile from '@/widgets/Files/EditFile/EditFile.tsx';
import {deleteFileApi} from '@/shared/api/fileAPI.ts';
import ViewFile from "@/widgets/Files/ViewFile/ViewFile.tsx";

interface FileProps {
  file: IFile;
  onFileUpdated: () => void;
}

function File({file, onFileUpdated}: FileProps) {
  const {allUsers, currentUser} = useStore();
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [isViewFileOpen, setIsViewFileOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const filename = `${file.name}${file.extension}`;

  const deleteFile = async () => {
    setIsLoading(true);
    await deleteFileApi(file.id);
    setIsLoading(false);
    onFileUpdated();
  };

  const closeDeleteDialog = (response: boolean) => {
    setIsDeleteOpen(false);

    if (!response) return;

    void deleteFile();
  };

  const closeEditDialog = (response: boolean) => {
    setIsEditOpen(false);

    if (!response) return;

    void onFileUpdated();
  };

  return (
    <>
      <div className={s.section}>
        <div>
          <ArticleIcon />
          <p className={s.title}>{filename}</p>
          <AppAuthor currentUserEmail={currentUser?.email} allUsers={allUsers} userId={file.userId} />
        </div>

        <div className={s.actions}>
          <AppButton text={'Delete'} variant="outlined" color="error" onClick={() => setIsDeleteOpen(true)} />
          <AppButton text={'Update'} variant="outlined" color="primary" onClick={() => setIsEditOpen(true)} />
          <AppButton text={'View'} onClick={() => setIsViewFileOpen(true)} />
        </div>
      </div>

      <AppDeleteDialog
        isOpen={isDeleteOpen}
        isLoading={isLoading}
        closeDialog={closeDeleteDialog}
        title={'Are you sure that you want to delete file?'}
        text={'This file will be permanently deleted'}
      />

      <EditFile isOpen={isEditOpen} closeDialog={closeEditDialog} file={file} />

      <ViewFile file={file} isOpen={isViewFileOpen} closeDialog={setIsViewFileOpen} />
    </>
  );
}

export default File;
