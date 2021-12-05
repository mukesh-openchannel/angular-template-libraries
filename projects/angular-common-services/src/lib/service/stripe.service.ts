import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
    ConnectStripeAccountResponse,
    StripeAccountsResponse,
    GetMarketplaceStripeSettingsResponse,
    UserCreditCardsResponse,
    ChangeableCreditCardFields, PaymentTaxesResponse,
} from '../model/api/stripe.model';
import { HttpRequestService } from './http-request-services';
import { OcApiPaths } from '../oc-ng-common-service.module';

/**
 * Description: API service to work with Stripe.<br>
 *
 * Endpoints:<br>
 *
 * GET 'v2/stripe-gateway/settings'<br>
 *
 * GET 'v2/stripe-gateway/user/this/cards'<br>
 *
 * POST 'v2/stripe-gateway/user/this/cards'<br>
 *
 * POST 'v2/stripe-gateway/user/this/cards/{cardId}'<br>
 *
 * DELETE 'v2/stripe-gateway/user/this/cards/{cardId}'<br>
 *
 * GET 'v2/stripe-gateway/developer/this/accounts'<br>
 *
 * POST 'v2/stripe-gateway/developer/this/accounts'<br>
 *
 * DELETE 'v2/stripe-gateway/developer/this/accounts/{stripeId}'<br>
 *
 * GET 'v2/stripe-gateway/preview'<br>
 */
@Injectable({
    providedIn: 'root',
})
export class StripeService {
    constructor(public httpRequest: HttpRequestService, private apiPaths: OcApiPaths) {}

    /**
     *
     * Description: Returns the Stripe settings configured for this marketplace
     *
     * @returns {Observable<GetMarketplaceStripeSettingsResponse>} `Observable<GetMarketplaceStripeSettingsResponse>`
     *
     * ### Example
     *
     * `getMarketplaceStripeSettings();`
     */
    getMarketplaceStripeSettings(): Observable<GetMarketplaceStripeSettingsResponse> {
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/settings`);
    }

    /**
     *
     * Description: Returns a list of credit cards configured for this user
     *
     * @returns {Observable<UserCreditCardsResponse>} `Observable<UserCreditCardsResponse>`
     *
     * ### Example
     *
     * `getUserCreditCards();`
     */
    getUserCreditCards(): Observable<UserCreditCardsResponse> {
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/user/this/cards`);
    }

    /**
     *
     * Description: Adds user credit card, which can be used later
     *
     * @param {string} token - The Stripe token returned by the Stripe.js Stripe.card.createToken call
     * @param {string} isDefault - Set to true if this should be set to be the default credit card
     * @returns {Observable<UserCreditCardsResponse>} `Observable<UserCreditCardsResponse>`
     *
     * ### Example
     *
     * `addUserCreditCard('some-token');`
     */
    addUserCreditCard(token: string, isDefault: boolean = true): Observable<UserCreditCardsResponse> {
        const body = {
            token,
            isDefault,
        };

        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/user/this/cards`, body);
    }

    /**
     *
     * Description: Updates fields in user credit card
     *
     * @param {string} cardId - Id of the card to update
     * @param {Partial<ChangeableCreditCardFields>} body - Fields to update in credit card
     * @returns {Observable<UserCreditCardsResponse>} `Observable<UserCreditCardsResponse>`
     *
     * ### Example
     *
     * `updateUserCreditCard('card-id-123', {
     *     address_city: 'New city',
     *     address_country: 'New country',
     * });`
     */
    updateUserCreditCard(cardId: string, body: Partial<ChangeableCreditCardFields>): Observable<UserCreditCardsResponse> {
        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/user/this/cards/${cardId}`, body);
    }

    /**
     *
     * Description: Deletes card from user account
     *
     * @param {string} cardId - Id of the card to delete
     * @returns {Observable<UserCreditCardsResponse>} `Observable<UserCreditCardsResponse>`
     *
     * ### Example
     *
     * `deleteUserCreditCard('card-id-123');`
     */
    deleteUserCreditCard(cardId: string): Observable<UserCreditCardsResponse> {
        return this.httpRequest.delete(`${this.apiPaths.stripeGateway}/user/this/cards/${cardId}`);
    }

    /**
     *
     * Description: Get all developer accounts connected to Stripe
     *
     * @returns {Observable<StripeAccountsResponse>} `Observable<StripeAccountsResponse>`
     *
     * ### Example
     *
     * `getConnectedAccounts();`
     */
    getConnectedAccounts(): Observable<StripeAccountsResponse> {
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/developer/this/accounts`);
    }

    /**
     *
     * Description: Returns a link to Stripe, where developer can connect Stripe account
     *
     * @param {string} redirectUrl - The URL to redirect this developer after they have connected their Stripe account
     * @returns {Observable<ConnectStripeAccountResponse>} `Observable<ConnectStripeAccountResponse>`
     *
     * ### Example
     *
     * `connectAccount('https://my-market.com/land-here');`
     */
    connectAccount(redirectUrl: string): Observable<ConnectStripeAccountResponse> {
        const body = { redirectUrl };

        return this.httpRequest.post(`${this.apiPaths.stripeGateway}/developer/this/accounts`, body);
    }

    /**
     *
     * Description: Disconnects developer from Stripe
     *
     * @param {string} stripeId - The id of the Stripe account to disconnect
     * @returns {Observable<StripeAccountsResponse>} `Observable<StripeAccountsResponse>`
     *
     * ### Example
     *
     * `disconnectAccount('stripe-id');`
     */
    disconnectAccount(stripeId: string): Observable<StripeAccountsResponse> {
        return this.httpRequest.delete(`${this.apiPaths.stripeGateway}/developer/this/accounts/${stripeId}`);
    }
    /**
     *
     * Description: the tax items calculated on the item (only possible after billing address is set).
     * You can get the tax amounts, subtotal and total.
     *
     * @param {string} country - iso of the country from the billing data
     * @returns {Observable<PaymentTaxesResponse>} `Observable<PaymentTaxesResponse>`
     *
     * ### Example
     *
     * `getTaxesAndPayment('CA', 'Ontario', '600eef7a7ec0f53371d1ca90', '60b0fa5240b4914e74c8d3fd);`
     */
    getTaxesAndPayment(country: string, state: string, appId: string, modelId: string): Observable<PaymentTaxesResponse> {
        const query = `country=${country}&state=${state}&appId=${appId}&modelId=${modelId}`;
        return this.httpRequest.get(`${this.apiPaths.stripeGateway}/preview?${query}`);
    }
}
