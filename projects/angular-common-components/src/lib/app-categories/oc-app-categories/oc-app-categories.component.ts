import { Component, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselComponent, OwlOptions } from 'ngx-owl-carousel-o';
import { AppCategoryDetail } from '../models/app-category-model';

@Component({
    selector: 'oc-app-categories',
    templateUrl: './oc-app-categories.component.html',
    styleUrls: ['./oc-app-categories.component.css'],
})
export class OcAppCategoriesComponent {
    @ViewChild('carousel', { static: false }) carouselRef: CarouselComponent;

    /**
     * Data of the category that will be shown in array.
     * Default: empty
     */
    @Input() data: AppCategoryDetail[] = [];
    /**
     * Title of the category section.
     * Default: empty
     */
    @Input() categoryHeaderTitle: string = '';
    /**
     * Main router link for the category card.
     * Default: empty
     * @example
     * '/collections'
     * '/collections/categoryName'
     */
    @Input() categoryRouterLink: string = '';
    /** Owl Carousel options */
    customOptions: OwlOptions = {
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
                items: this.data.length > 5 ? 5 : this.data.length,
            },
        },
        nav: false,
    };
    constructor(private router: Router) {}
    /** Navigates to the category page */
    navigateToCategory(routerQuery?: any): void {
        if (routerQuery) {
            this.router.navigate([this.categoryRouterLink], { queryParams: routerQuery }).then();
        } else {
            this.router.navigate([this.categoryRouterLink]).then();
        }
    }
    /** Move carousel to next slide */
    nextSlide(): void {
        this.carouselRef.next();
    }
    /** Move carousel to previous slide */
    prevSlide(): void {
        this.carouselRef.prev();
    }
}
