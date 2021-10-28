import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OcFileUploadComponent } from './oc-file-upload.component';
import { NgModel } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { HttpResponse, HttpUploadProgressEvent } from '@angular/common/http';
import { ImageCropperModuleMock, MockButtonComponent } from '@openchannel/angular-common-components/src/mock/mock';
import { FileDetails, FileUploaderService } from '../model/file.model';

const mockResponse: FileDetails = {
    uploadDate: 214213,
    fileId: 'fileId',
    name: 'test1.jpg',
    contentType: 'type',
    size: 123123,
    isPrivate: false,
    mimeCheck: 'PASSED',
    fileUrl: 'http://file-url.com',
    isError: false,
    fileUploadProgress: 100,
    virusScan: {
        started: 1457710762784,
        finished: 1457710769567,
        status: 'CLEAN',
        foundViruses: [
            {
                fileName: 'jacks.docx',
                virusName: 'H237 Worm',
            },
        ],
    },
    fileIconUrl: '',
};

class FileUploadDownloadServiceStub extends FileUploaderService {
    constructor() {
        super();
    }

    fileUploadRequest(
        file: FormData,
        isPrivate: boolean,
        hash?: string[],
    ): Observable<HttpResponse<FileDetails> | HttpUploadProgressEvent> {
        return of(new HttpResponse({ body: mockResponse }));
    }

    fileDetailsRequest(fileId: string): Observable<FileDetails> {
        return of(mockResponse);
    }
}

describe('OcFileUploadComponent', () => {
    let component: OcFileUploadComponent;
    let fixture: ComponentFixture<OcFileUploadComponent>;

    beforeEach(
        waitForAsync(() => {
            TestBed.configureTestingModule({
                declarations: [OcFileUploadComponent, MockButtonComponent],
                providers: [NgModel, { provide: FileUploaderService, useClass: FileUploadDownloadServiceStub }],
                imports: [NgbModule, CommonModule, BrowserModule, ImageCropperModuleMock],
            }).compileComponents();
        }),
    );

    beforeEach(() => {
        fixture = TestBed.createComponent(OcFileUploadComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should receive file', async () => {
        const onTouchFunc = jest.fn();
        component.registerOnTouched(onTouchFunc);

        const changeEvent = {
            target: {
                files: [new File([], 'test1.jpg')],
            },
        };

        fixture.debugElement.query(By.css('input#fileDropRef')).triggerEventHandler('change', changeEvent);
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const fileNameSpan = fixture.debugElement.query(By.css('#fileName')).nativeElement;
            expect(fileNameSpan.textContent).toContain('test1.jpg');
            expect(onTouchFunc).toHaveBeenCalledTimes(1);
        });
    });

    it('should upload image', async () => {
        component.fileType = 'singleImage';
        fixture.detectChanges();

        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        const mockedFile = new File([], 'test1.jpg');
        const changeEvent = {
            target: {
                files: [mockedFile],
            },
        };

        fixture.debugElement.query(By.css('input#fileDropRef')).triggerEventHandler('change', changeEvent);

        component.uploadFile(mockedFile);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const fileNameSpan = fixture.debugElement.query(By.css('#fileName')).nativeElement;
            expect(fileNameSpan.textContent).toContain('test1.jpg');
            expect(onChangeFunc).toHaveBeenCalled();
            expect(onChangeFunc.mock.calls[0][0]).toBe('http://file-url.com');
        });
    });

    it('should init file', async () => {
        component.fileType = 'singleFile';

        component.writeValue('http://someimage.com/213123.png');

        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const fileNameSpan = fixture.debugElement.query(By.css('#fileName')).nativeElement;
            expect(fileNameSpan.textContent).toContain('test1.jpg');
        });
    });

    it('should init files', async () => {
        component.fileType = 'multiFile';
        component.writeValue(['http://someimage.com/213123.png', 'http://someimage2.com/213121233.png']);

        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const fileNameSpan = fixture.debugElement.query(By.css('#fileName')).nativeElement;
            expect(fileNameSpan.textContent).toContain('test1.jpg');
        });
    });

    it('download public file', async () => {
        global.open = jest.fn();

        component.fileType = 'singleFile';

        component.writeValue('http://someimage.com/213123.png');

        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const downloadFile = fixture.debugElement.query(By.css('#downloadFile'));
            downloadFile.triggerEventHandler('click', {});
            expect(global.open).toHaveBeenCalledWith('http://file-url.com', '_blank');
        });
    });

    it('download private file', async () => {
        global.open = jest.fn();

        component.fileType = 'privateSingleFile';

        component.writeValue('http://someimageprivate.com/213123.png');

        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const downloadFile = fixture.debugElement.query(By.css('#downloadFile'));
            downloadFile.triggerEventHandler('click', {});
            expect(global.open).toHaveBeenCalledWith('http://file-url.com', '_blank');
        });
    });

    it('delete file', async () => {
        const onChangeFunc = jest.fn();
        component.registerOnChange(onChangeFunc);

        component.fileType = 'privateSingleFile';

        component.writeValue('http://someimageprivate.com/213123.png');

        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const deleteFile = fixture.debugElement.query(By.css('#closeLink'));
            deleteFile.triggerEventHandler('click', {});
            expect(onChangeFunc.mock.calls[1][0]).toBe(null);
        });
    });

    it('on file drop', async () => {
        const fileDropped = {
            dataTransfer: {
                files: null,
            },
        };

        fixture.debugElement.query(By.css('.file-container_without-files')).triggerEventHandler('fileDropped', fileDropped);
        fixture.detectChanges();

        await fixture.whenStable().then(() => {
            const fileDrop = fixture.debugElement.query(By.css('#fileDropRef')).nativeElement;
            expect(fileDrop).toBeTruthy();
        });
    });
});
