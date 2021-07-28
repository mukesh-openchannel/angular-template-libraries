import { Component, ElementRef, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { base64ToFile, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of, Subject, Subscription } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';
import { FileDetails, FileType, FileUploaderService } from '../model/file.model';

/**
 * File upload component. Represents template and logic for upload and download files.
 *
 * @example <oc-file-upload [(ngModel)]="fileModel"
 *                          [fileType]="'singleImage'"
 *                          [isMultiFile]="false"
 *                          [fileUploadText]="'Throw file here'"
 *                          [defaultFileIcon]="'/fIcon.png'"
 *                          [uploadIconUrl]="'/uIcon.png'"
 *                          [closeIconUrl]="'/close.png'"
 *                          [zoomInIconUrl]="'/zoomIn.png'"
 *                          [zoomOutIconUrl]="'/zoomOut.png'"
 *                          [imageWidth]="1024"
 *                          [imageHeight]="768"
 *                          [hash]="['a87sh098a7shd098ahs0d97has09dha09sdh9a07shd09ahs90dhas09d7h9a0s7hd09ahsd097has9d7ha9sd7ha09s7dh']"
 *                          [acceptType]="'image/*'"
 *                          (customMsgChange)="onMsgChange()"
 * >
 */
@Component({
    selector: 'oc-file-upload',
    templateUrl: './oc-file-upload.component.html',
    styleUrls: ['./oc-file-upload.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => OcFileUploadComponent),
            multi: true,
        },
    ],
})
export class OcFileUploadComponent implements OnInit, OnDestroy, ControlValueAccessor {
    /**
     * File input template reference
     */
    @ViewChild('fileDropRef', { static: false }) fileInputVar: ElementRef<any>;

    /**
     * Set model value
     */
    @Input() set value(val: string) {
        this.initValues(val);
    }

    /**
     * Text for file upload block
     */
    @Input() fileUploadText: string = 'Drag & drop file here';

    /**
     * Flag for download multiple files allowed or not
     */
    @Input() isMultiFile: boolean = false;

    /**
     * URL for default file icon.
     */
    @Input() defaultFileIcon: string = 'assets/angular-common-components/file_icon.svg';

    /**
     * Supported file type ( "singleFile", "singleImage", "privateSingleFile", "multiFile", "multiImage", "multiPrivateFile" )
     */
    @Input() fileType: FileType;

    /**
     * Icon for upload button
     */
    @Input() uploadIconUrl: string = 'assets/angular-common-components/upload_icon.svg';

    /**
     * Icon URL value for buttons that close container window and stop uploading file
     */
    @Input() closeIconUrl: string = 'assets/angular-common-components/close-icon.svg';

    /**
     * Icon URL value for button that active zoomIn feature
     */
    @Input() zoomInIconUrl: string = 'assets/angular-common-components/zoom-in.svg';

    /**
     * Icon URL value for button that active zoomOut feature
     */
    @Input() zoomOutIconUrl: string = 'assets/angular-common-components/zoom-out.svg';

    /**
     * Variable for width of image
     */
    @Input() imageWidth: number;

    /**
     * Variable for height of image
     */
    @Input() imageHeight: number;

    /**
     * File hash
     */
    @Input() hash: string[] = [];

    /**
     * File type (MIME) allowed to use
     */
    @Input() acceptType: string;

    /**
     * Output emits after change custom message
     */
    @Output() readonly customMsgChange = new EventEmitter<boolean>();

    /**
     * Subscription to upload file from server
     */
    uploadFileReq: Subscription = null;

    /**
     * Flag to know is upload in process or not
     */
    isUploadInProcess: boolean = false;

    /**
     * Array of objects with file data
     */
    fileDetailArr: FileDetails[] = [];

    /**
     * Text that shows up when image load throw error
     */
    imageLoadErrorMessage: string = 'Please provide valid image';

    /**
     * Flag that shows existence of image load error
     */
    hasImageLoadError: boolean = false;

    /**
     * Object of cropped file
     */
    croppedFileObj: any;

    /**
     * Image transform data
     */
    transform: ImageTransform = {};

    /**
     * Flag that shows that upload image in process
     */
    uploadImageInProcess: boolean = false;

    /**
     * Event that triggers when file browsed
     */
    browsedFileEvent: any;

    /**
     * Name of valid file
     */
    fileName: string = '';
    /**
     * Name of invalid file
     */
    invalidFileName: string;

    /**
     * Flag that shows existence of invalid file
     */
    containsInvalidFile = false;

    /**
     * Flag that allow maintain aspect ration logic or not
     */
    maintainAspectRatio = false;

    /**
     * Aspect ration value
     */
    aspectRatio: number;

    /**
     * Scale value
     */
    scale = 1;

    /**
     * Percent progress showed up in loader
     */
    loaderValue = 0;

    /**
     * Width of cropped image value
     */
    croppedImageWidth: number;

    /**
     * Height of cropped image value
     */
    croppedImageHeight: number;

    /**
     * Width value to resize
     */
    resizeToWidth = 0;

    /**
     * Height value to resize
     */
    resizeToHeight = 0;

    /**
     * @private Subject to clear all subscriptions
     */
    private destroy$ = new Subject<void>();

    constructor(private modalService: NgbModal, private fileUploaderService: FileUploaderService) {}

    ngOnInit(): void {
        if (this.isFileTypeImage) {
            this.calculateAspectRatio();
        }
    }

    ngOnDestroy(): void {
        this.resetSelection();
        this.destroy$.next();
        this.destroy$.complete();
        if (this.uploadFileReq) {
            this.uploadFileReq.unsubscribe();
        }
    }

    /**
     * Return allowed default or provided MIME type for file input
     */
    getAcceptedMIMEType(): string {
        return this.acceptType ? this.acceptType : this.isFileTypeImage() ? 'image/*' : '*/*';
    }

    /**
     * On file drop handler
     */
    onFileDropped($event, content?): void {
        this.fileInputVar.nativeElement.files = $event.dataTransfer.files;
        this.fileInputVar.nativeElement.dispatchEvent(new Event('change', { bubbles: true }));
    }

    /**
     * Function for upload file
     * @param {File} file
     */
    uploadFile(file: File): void {
        if (!this.fileUploaderService.fileUploadRequest) {
            console.error('Please, set the fileUploadRequest function');
        } else {
            this.isUploadInProcess = true;
            let lastFileDetail = new FileDetails();
            lastFileDetail.name = this.fileName;
            if (!this.fileDetailArr) {
                this.fileDetailArr = [];
            }
            this.fileDetailArr.push(lastFileDetail);
            const formData: FormData = new FormData();
            formData.append('file', file, this.fileName);
            this.uploadFileReq = this.fileUploaderService.fileUploadRequest(formData, this.isFileTypePrivate(), this.hash).subscribe(
                (event: any) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        lastFileDetail.fileUploadProgress = Math.round((100 * event.loaded) / event.total) - 5;
                    } else if (event.type === HttpEventType.ResponseHeader) {
                        lastFileDetail.fileUploadProgress = 97;
                    } else if (event.type === HttpEventType.DownloadProgress) {
                        lastFileDetail.fileUploadProgress = 99;
                    } else if (event instanceof HttpResponse) {
                        lastFileDetail = this.convertFileUploadResToFileDetails(event);
                        lastFileDetail.fileUploadProgress = 100;
                        lastFileDetail.fileIconUrl = this.defaultFileIcon;
                        this.fileDetailArr[this.fileDetailArr.length - 1] = lastFileDetail;
                        this.isUploadInProcess = false;
                        this.uploadFileReq = null;
                        this.emitChanges();
                        this.resetSelection();
                    }
                },
                () => {
                    this.isUploadInProcess = false;
                    this.resetSelection();
                },
                () => {
                    this.isUploadInProcess = false;
                    this.resetSelection();
                },
            );
        }
        this.modalService.dismissAll();
    }

    /**
     * This method is used to convert uploaded file response to fileDetails.
     */
    convertFileUploadResToFileDetails(fileUploadRes): FileDetails {
        const fileDetails = new FileDetails();
        fileDetails.uploadDate = fileUploadRes.body.uploadDate;
        fileDetails.fileId = fileUploadRes.body.fileId;
        fileDetails.name = fileUploadRes.body.name;
        fileDetails.contentType = fileUploadRes.body.contentType;
        fileDetails.size = fileUploadRes.body.size;
        fileDetails.isPrivate = fileUploadRes.body.isPrivate;
        fileDetails.mimeCheck = fileUploadRes.body.mimeCheck;
        fileDetails.fileUrl = fileUploadRes.body.fileUrl;
        fileDetails.isError = fileUploadRes.body.isError;
        return fileDetails;
    }

    /**
     * Handle file on browsing
     */
    fileBrowseHandler(event, content?): void {
        this.onTouched();

        if (!event?.target?.files[0]?.name) {
            return;
        }

        if (this.isFileTypeImage()) {
            this.browsedFileEvent = event;
            this.fileName = event?.target?.files[0]?.name;
            this.fileName = this.fileName ? this.fileName : event?.dataTransfer?.files[0]?.name;
            this.customMsgChange.emit(false);
            this.modalService
                .open(content, {
                    centered: true,
                    backdrop: 'static',
                    keyboard: false,
                    size: 'lg',
                })
                .result.then(
                    () => {
                        // Do Nothing
                    },
                    () => {
                        this.resetSelection();
                    },
                );
        } else {
            this.fileName = event?.target?.files[0]?.name;
            this.fileName = this.fileName ? this.fileName : event?.dataTransfer?.files[0]?.name;
            this.uploadFile(event.target.files[0]);
        }
    }

    /**
     * Function to reset selection in case if previous one didnt die by itself
     */
    resetSelection(): void {
        if (this.fileInputVar) {
            this.fileInputVar.nativeElement.value = '';
        }
        this.imageLoadErrorMessage = '';
        this.hasImageLoadError = false;
        if (this.fileDetailArr && this.fileDetailArr.length < 1) {
            this.customMsgChange.emit(true);
        }
    }

    /**
     * Function check if file type related to image types
     * @returns `boolean`
     */
    isFileTypeImage(): boolean {
        return this.fileType === 'singleImage' || this.fileType === 'multiImage';
    }

    /**
     * Function check if file type related to private types
     * @returns `boolean`
     */
    isFileTypePrivate(): boolean {
        return this.fileType === 'multiPrivateFile' || this.fileType === 'privateSingleFile';
    }

    /**
     * Function check if file type related to types with multiple files support
     * @returns `boolean`
     */
    isMultiFileSupport(): boolean {
        return this.fileType === 'multiPrivateFile' || this.fileType === 'multiFile' || this.fileType === 'multiImage';
    }

    /**
     * Function check if file type NOT related to image types
     * @returns `boolean`
     */
    isFileTypeNotImage(): boolean {
        return (
            this.fileType === 'singleFile' ||
            this.fileType === 'privateSingleFile' ||
            this.fileType === 'multiFile' ||
            this.fileType === 'multiPrivateFile'
        );
    }

    /**
     * Function that executes after image cropping
     * @param {ImageCroppedEvent} event - Crop event object
     */
    imageCropped(event: ImageCroppedEvent): void {
        this.croppedImageWidth = event.width;
        this.croppedImageHeight = event.height;
        this.croppedFileObj = base64ToFile(event.base64);
    }

    /**
     * Function that executes after image load failed
     */
    loadImageFailed(): void {
        this.hasImageLoadError = true;
    }

    /**
     * Function that subtract from scale 0.1 and save it
     */
    zoomOut(): void {
        this.scale -= 0.1;
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }

    /**
     * Function that add to scale 0.1 and save it
     */
    zoomIn(): void {
        this.scale += 0.1;
        this.transform = {
            ...this.transform,
            scale: this.scale,
        };
    }

    /**
     * Set resize width and height, also aspect ratio
     */
    calculateAspectRatio(): void {
        if (this.imageWidth) {
            this.resizeToWidth = this.imageWidth;
        }
        if (this.imageHeight) {
            this.resizeToHeight = this.imageHeight;
        }
        if (this.imageWidth && this.imageHeight) {
            this.aspectRatio = this.imageWidth / this.imageHeight;
            this.maintainAspectRatio = true;
        } else {
            this.aspectRatio = 1;
        }
    }

    /**
     * Function to stop upload. Close subscription if active and reset all related data.
     * @param {number} idx - Index of file in details
     */
    cancelUploading(idx: number): void {
        this.onTouched();

        if (this.isUploadInProcess && this.uploadFileReq) {
            this.uploadFileReq.unsubscribe();
        }
        this.uploadFileReq = null;
        this.fileDetailArr.splice(idx, 1);
        this.emitChanges();
        if (this.fileDetailArr.length < 1) {
            this.customMsgChange.emit(true);
        }
    }

    /**
     * Function get file details and returns file url
     * @param {FileDetails} file
     * @returns `string`
     */
    getUrl(file: FileDetails): string {
        // NOTE: for non image file upload always show default file upload icon
        if (this.isFileTypeNotImage()) {
            return this.defaultFileIcon;
        }
        if (file.fileUploadProgress === 100) {
            return file.fileUrl;
        } else {
            return this.defaultFileIcon;
        }
    }

    /**
     * Function get file details and returns CSS class for file icon
     * @param {FileDetails} file
     * @returns `string`
     */
    getFileIconClass(file: FileDetails): string {
        if (this.isFileTypeNotImage()) {
            return 'default-icon';
        }
        return file?.fileUploadProgress === 100 ? 'app-icon' : 'default-icon';
    }

    /**
     * Function for download file. If file is private then it opens link in new window and download file. If not call service method to start downloading process.
     * @param {FileDetails} file
     */
    downloadFile(file: FileDetails): void {
        if (file && file.fileUploadProgress && file.fileUploadProgress === 100) {
            if (this.isFileTypePrivate()) {
                if (!this.fileUploaderService.fileDetailsRequest) {
                    console.error('Please, set the FileDetailsRequest function');
                } else {
                    this.fileUploaderService
                        .fileDetailsRequest(file.fileId)
                        .pipe(takeUntil(this.destroy$))
                        .subscribe(res => {
                            if (res && res.fileUrl) {
                                window.open(res.fileUrl, '_blank');
                            }
                        });
                }
            } else {
                if (file.fileUrl) {
                    window.open(file.fileUrl, '_blank');
                }
            }
        }
    }

    /**
     * Function that called on main model change and emits value
     */
    emitChanges(): void {
        if (this.isMultiFileSupport()) {
            this.onChange(this.getFileUrlOrFileId(this.fileDetailArr));
        } else {
            this.onChange(this.fileDetailArr?.length > 0 ? this.getFileUrlOrFileId(this.fileDetailArr)[0] : null);
        }
    }

    onTouched = () => {};
    onChange: (value: any) => void = () => {};

    writeValue(obj: any): void {
        this.initValues(obj);
    }

    registerOnChange(onChange: (value: any) => void): void {
        this.onChange = onChange;
    }

    registerOnTouched(onTouched: () => void): void {
        this.onTouched = onTouched;
    }

    setDisabledState?(isDisabled: boolean): void {}

    /**
     * @private Initialization of value for component
     * @param {string | string[]} urlData
     */
    private initValues(urlData: string | string[]): void {
        if (!this.fileUploaderService.fileDetailsRequest) {
            console.error('Please, set the FileDetailsRequest function');
        } else if (urlData) {
            if (this.isMultiFileSupport() && typeof urlData !== 'string') {
                this.loadDetails(urlData);
            } else if (typeof urlData === 'string') {
                this.fileUploaderService
                    .fileDetailsRequest(urlData)
                    .pipe(takeUntil(this.destroy$))
                    .subscribe(res => {
                        this.fileDetailArr = res ? [{ ...res, fileUploadProgress: 100 }] : [];
                        this.emitChanges();
                    });
            } else {
                console.error('initValues function error: something wrong with provided data');
            }
        }
    }

    /**
     * @private Load files details and add it to details array
     * @param {string[]} urls
     */
    private loadDetails(urls: string[]): void {
        of(...urls)
            .pipe(mergeMap(fileUrl => this.fileUploaderService.fileDetailsRequest(fileUrl)))
            .subscribe(
                detail => this.fileDetailArr.push({ ...detail, fileUploadProgress: 100 }),
                () => {},
                () => this.emitChanges(),
            );
    }

    /**
     * @private Returns array with file ids and URLs
     * @param {FileDetails[]} files
     * @returns {string[]} `string[]`
     */
    private getFileUrlOrFileId(files: FileDetails[]): string[] {
        if (files?.length > 0) {
            return files.map(file => (file?.isPrivate ? file.fileId : file.fileUrl));
        }
        return null;
    }
}
