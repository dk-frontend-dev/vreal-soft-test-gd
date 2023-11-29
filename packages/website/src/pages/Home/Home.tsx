import Folders from '@/widgets/Folders/Folders.tsx';
import Files from '@/widgets/Files/Files.tsx';
import {useSearchParams} from 'react-router-dom';
import {useEffect} from 'react';
import {httpClient} from '@/shared/api/httpClient.ts';
import {useStore} from '@/store/store.ts';
import {AxiosResponse} from 'axios';
import {FolderWithGrantedUsers} from '@/shared/models/folder.model.ts';
import AppSearchField from "@/shared/ui/AppSearchField/AppSearchField.tsx";
import {getAllFoldersApi, getFoldersApi} from "@/shared/api/folderAPI.ts";
import {getAllFilesApi, getFilesApi} from "@/shared/api/fileAPI.ts";

function HomePage() {
  const {setCurrentFolder, setFolders, currentFolder, setFiles} = useStore();
  const [searchParams] = useSearchParams();

  const getFolder = async (id: string) => {
    const {data}: AxiosResponse<FolderWithGrantedUsers> = await httpClient.get(`folders/${id}`);
    setCurrentFolder(data);
  };

  const onSearch = async (value: string) => {
    if (!value) {
      const [{data: folders}, {data: files}] = await Promise.all([getFoldersApi(currentFolder?.id), getFilesApi(currentFolder?.id)])
      setFolders(folders);
      setFiles(files);
      return;
    }

    const [{data: folders}, {data: files}] = await Promise.all([getAllFoldersApi(value), getAllFilesApi(value)]);
    setFolders(folders);
    setFiles(files);
  }

  useEffect(() => {
    const currentFolderId = searchParams.get('folderId');

    if (!currentFolderId) {
      setCurrentFolder(null);
      return;
    }

    void getFolder(currentFolderId);
  }, [searchParams]);

  return (
    <div className={'container'}>
      <AppSearchField onValueChange={onSearch} />

      <Folders />
      <Files />
    </div>
  );
}

export default HomePage;
