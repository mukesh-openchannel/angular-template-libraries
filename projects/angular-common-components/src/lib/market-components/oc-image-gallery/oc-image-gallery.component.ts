import { AfterContentInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { GalleryItem } from '@openchannel/angular-common-components/src/lib/common-components';
import { GalleryMediaDimensions } from '../models/image-gallery.model';
import { OwlOptions } from 'ngx-owl-carousel-o';

/**
 * Image gallery component. Show list of images with title and description.
 *
 * @example
 * <oc-image-gallery [gallery]="[{image: "/img.png", title: "Image", description: "Description of image"}]"
 *                   [maxItems]="5" [displayDetails]="true"
 *                   [allowArrowControllers]="true"
 *                   [mediaDimensions]="{width: "auto", height: "192px"}"
 *                   [expandOnClick]="true">
 */
@Component({
    selector: 'oc-image-gallery',
    templateUrl: './oc-image-gallery.component.html',
    styleUrls: ['./oc-image-gallery.component.css'],
})
export class OcImageGalleryComponent implements AfterContentInit, OnChanges {
    /**
     * Array of the gallery images.
     */
    @Input() set gallery(value: GalleryItem[]) {
        this.mainGallery = [...value];
    }

    /** Quantity of images that will be shown */
    @Input() maxItems: number = 3;
    /**
     * Display of title and description of the gallery item. Details are displayed by default.
     *
     * @default true
     */
    @Input() displayDetails: boolean = true;
    /**
     * This parameter changes the gallery display. If arrow controllers are applied - gallery will be displayed as carousel.
     * Otherwise as grid. Default: grid.
     *
     * @default false
     */
    @Input() allowArrowControllers: boolean = false;

    /** Custom dimensions of the media content */
    @Input() mediaDimensions: GalleryMediaDimensions = {
        width: '100%',
        height: '192px',
    };
    /**
     * Allow opening full size of the media item by click.
     * This will call a modal window with slider. Disabled by default
     * @default false
     */
    @Input() expandOnClick: boolean = false;
    /** Options for the carousel */
    carouselOptions: OwlOptions = {
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: true,
        dots: false,
        autoWidth: true,
        navSpeed: 700,
        navText: ['', ''],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 1,
            },
            740: {
                items: 2,
            },
            940: {
                items: 3,
            },
        },
        nav: false,
    };

    /** Main input gallery array */
    mainGallery: GalleryItem[] = [];

    /** Spliced array */
    displayGallery: GalleryItem[] = [];

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.maxItems && this.maxItems) {
            if (changes.maxItems.previousValue !== changes.maxItems.currentValue) {
                this.changeMaxImagesView();
            }
        }
    }

    ngAfterContentInit(): void {
        this.changeMaxImagesView();
    }

    /**
     * Get data from main gallery and cut everything above the maximum value
     */
    private changeMaxImagesView(): void {
        this.displayGallery = [...this.mainGallery];
        this.displayGallery.splice(this.maxItems);
    }
}
