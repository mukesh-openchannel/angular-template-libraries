import { VirusScanResult } from '@openchannel/angular-common-components/src/lib/form-components';

export class FileDetailsResponse {
    fileId: string;
    fileUrl: string;
    name: string;
    size: number;
    uploadDate: number;
    fileUploadProgress: number;
    fileIconUrl: string;
    contentType: string;
    isPrivate: boolean;
    mimeCheck: 'PASSED' | 'FAILED';
    virusScan: VirusScanResult;
    isError: boolean;
}
