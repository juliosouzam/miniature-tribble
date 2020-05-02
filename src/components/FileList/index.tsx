import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import { Container, FileInfo } from './styles';

interface FileProps {
  name: string;
  readableSize: string;
  progress: number;
}

interface FileListProps {
  files: FileProps[];
}

const FileList: React.FC<FileListProps> = ({ files }: FileListProps) => {
  return (
    <Container>
      {files.map(uploadedFile => (
        <li key={uploadedFile.name}>
          <FileInfo>
            <div>
              <strong>{uploadedFile.name}</strong>
              <span>{uploadedFile.readableSize}</span>
            </div>
          </FileInfo>
          <CircularProgressbar
            styles={{
              root: { width: 48 },
              path: { stroke: '#7159c1' },
            }}
            strokeWidth={16}
            value={uploadedFile.progress}
            text={`${uploadedFile.progress}%`}
          />
        </li>
      ))}
    </Container>
  );
};

export default FileList;
