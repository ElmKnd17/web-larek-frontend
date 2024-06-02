export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

export const settings = {
    api: {
        product: '/product',
        order: '/order'
    },
    event: {
        basket: {
            changed: 'basket:changed',
            removeButtonClicked: 'basketRemoveButton:clicked',
            submitButtonClicked: 'basketSubmitButton:clicked'
        },
        products: {
            received: 'products:received'
        },
        card: {
            clicked: 'card:clicked'
        },
        modal: {
            opened: 'modal:opened',
            closed: 'modal:closed'
        },
        addToBasketButton: {
            added: 'addToBasketButton:added',
            removed: 'addToBasketButton:removed'
        },
        basketButton: {
            clicked: 'basketButton:clicked'
        },
        order: {
            paymentMethodAndAddresOrder: {
                button: {
                    clicked: 'paymentMethodAndAddresOrderButton:clicked'
                }
            },
            contacts: {
                button: {
                    clicked: 'contactsOrderButton:clicked'
                }
            },
            success: {
                button: {
                    clicked: 'successOrderButton:clicked'
                }
            }
        }
    },
    page: {
        class: '.page',
        wrapper: '.page__wrapper',
        lockedWrapper: 'page__wrapper_locked',
        basketButton: '.header__basket',
        basketCounter: '.header__basket-counter',
        catalog: '.gallery'
    },
    card: {
        templates: {
            cardCatalogTemplate: '#card-catalog',
            cardPreviewTemplate: '#card-preview',
            cardBasketTemplate: '#card-basket'
        },
        image: '.card__image',
        category: '.card__category',
        categoryClasses: {
            'софт-скил': 'card__category_soft',
			'дополнительное': 'card__category_additional',
			'хард-скил': 'card__category_hard',
            'кнопка': 'card__category_button',
            'другое': 'card__category_other'
        },
        title: '.card__title',
        text: '.card__text',
        price: '.card__price',
        button: '.card__button'
    },
    basket: {
        class: '.basket',
        list: '.basket__list',
        itemIndex: '.basket__item-index',
        templates: {
            basketTemplate: '#basket'
        },
        price: '.basket__price',
        button: '.basket__button'
    },
    modal: {
        id: '#modal-container',
        content: '.modal__content',
        closeButton: '.modal__close',
        active: 'modal_active'
    },
    order: {
        templates: {
            paymentMethodAndAddresSelector: '#order',
            contacts: '#contacts',
            success: '#success'
        },
        cardMethodButton: 'button[name="card"]',
        cashMethodButton: 'button[name="cash"]',
        addresInput: 'input[name="address"]',
        emailInput: 'input[name="email"]',
        phoneNumberInput: 'input[name="phone"]',
        submitButton: 'button[type="submit"]',
        activeButton: 'button_alt-active',
        error: '.form__errors',
        successDescription: '.order-success__description',
        successButton: '.order-success__close'
    }
};
