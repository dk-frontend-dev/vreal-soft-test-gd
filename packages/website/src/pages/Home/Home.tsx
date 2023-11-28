import Folders from "@/widgets/Folders/Folders.tsx";
import Files from "@/widgets/Files/Files.tsx";
import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";
import {httpClient} from "@/shared/api/httpClient.ts";
import {useStore} from "@/store/store.ts";
import {AxiosResponse} from "axios";
import {FolderWithGrantedUsers} from "@/shared/models/folder.model.ts";

function HomePage() {
    const {setCurrentFolder} = useStore();
    const [searchParams] = useSearchParams();

    const getFolder = async (id: string) => {
        const {data}: AxiosResponse<FolderWithGrantedUsers> = await httpClient.get(`folders/${id}`);
        setCurrentFolder(data);
    }

    useEffect(() => {
        const currentFolderId = searchParams.get('folderId');

        if (!currentFolderId) {
            setCurrentFolder(null);
            return;
        }

        void getFolder(currentFolderId);
    }, [searchParams])

    return (
        <div className={'container'}>
            <Folders />
            <Files />
        </div>
    )
}

export default HomePage;
