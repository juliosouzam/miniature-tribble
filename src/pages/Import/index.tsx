import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import filesize from 'filesize';
import { uuid } from 'uuidv4';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  id: string;
  file: File;
  name: string;
  readableSize: string;
  progress: number;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    await Promise.all(
      uploadedFiles.map(async file => {
        const data = new FormData();

        data.append('file', file.file);

        try {
          await api.post(`/transactions/import`, data, {
            onUploadProgress(e) {
              const progress = Math.round((e.loaded * 100) / e.total);

              setUploadedFiles(prevState =>
                prevState.map(prevFile =>
                  prevFile.id === file.id
                    ? { ...prevFile, progress }
                    : prevFile,
                ),
              );
            },
          });
        } catch (err) {
          console.log(err.response.error);
        }
      }),
    );

    // history.push('/');
  }

  async function submitFile(files: File[]): Promise<void> {
    const uploaded = files.map(
      (file: File): FileProps => ({
        id: uuid(),
        file,
        name: file.name,
        readableSize: filesize(file.size),
        progress: 0,
      }),
    );

    setUploadedFiles(prevState => [...prevState, ...uploaded]);
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <p>
              <img src={alert} alt="Alert" />
              Permitido apenas arquivos CSV
            </p>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
