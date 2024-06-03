import './scss/styles.scss';

import { EventEmitter } from './components/base/events';
import { API_URL, CDN_URL } from './utils/constants';
import { settings } from './utils/constants';
import { ensureElement, cloneTemplate } from './utils/utils';
import { Products } from './components/model/Products';
import { Order } from './components/model/Order';
import { Basket } from './components/model/Basket';
// import { ProductAPI } from './components/model/productAPI';
// import { OrderAPI } from './components/model/OrderAPI';
import { AppAPI } from './components/model/AppAPI'
import { Modal } from './components/view/Modal';
import { CardModal } from './components/view/CardModal';
import { AddressOrderModal } from './components/view/AddressOrderModal';
import { ContantsOrderModal } from './components/view/ContantsOrderModal';
import { SuccessOrderModal } from './components/view/SuccessOrderModal';
import { BasketModal } from './components/view/BasketModal';
import { CatalogCard } from './components/view/CatalogCard';
import { BasketCard } from './components/view/BasketCard';
import { Page } from './components/view/Page';
import { IProduct, TAddressOrderModal, TContactsOrderModal, TId, TOrderResponse } from './types';

const events = new EventEmitter();

const pageContainer = ensureElement<HTMLElement>(settings.page.class);
const modalContainer = ensureElement<HTMLElement>(settings.modal.id);
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>(settings.card.templates.cardCatalogTemplate);
const cardModalTemplate = ensureElement<HTMLTemplateElement>(settings.card.templates.cardPreviewTemplate);
const basketModalTemplate = ensureElement<HTMLTemplateElement>(settings.basket.templates.basketTemplate);
const basketCardTemplate = ensureElement<HTMLTemplateElement>(settings.card.templates.cardBasketTemplate);
const addresOrderModalTemplate = ensureElement<HTMLTemplateElement>(settings.order.templates.paymentMethodAndAddresSelector);
const contactsOrderModalTemplate = ensureElement<HTMLTemplateElement>(settings.order.templates.contacts);
const successOrderModalTemplate = ensureElement<HTMLTemplateElement>(settings.order.templates.success);

const products = new Products(events);
const basket = new Basket(events);
const order = new Order(events);
// const productsAPI = new ProductAPI(CDN_URL, API_URL);
// const orderAPI = new OrderAPI(CDN_URL, API_URL);
const appAPI = new AppAPI(CDN_URL, API_URL);
const page = new Page(pageContainer, events);
const modal = new Modal(modalContainer, events);
const cardModal = new CardModal(cloneTemplate(cardModalTemplate), events);
const basketModal = new BasketModal(cloneTemplate(basketModalTemplate), events);
const addresOrderModal = new AddressOrderModal(cloneTemplate(addresOrderModalTemplate), events);
const contactsOrderModal = new ContantsOrderModal(cloneTemplate(contactsOrderModalTemplate), events);
const successOrderModal = new SuccessOrderModal(cloneTemplate(successOrderModalTemplate), events);

/////////////////////////////// Получение продуктов с сервера ///////////////////////////////

appAPI.getProducts().then(productsData => {
    products.setProducts(productsData);
}).catch(console.error);

/////////////////////////////// Реакция на получение продукта с сервера ///////////////////////////////

events.on(settings.event.products.received, (data: IProduct[]) => {
    const catalogList = data.map(product => {
        const catalogCard = new CatalogCard(cloneTemplate(cardCatalogTemplate), events);
        return catalogCard.render(product);
    })
    page.render({
        cardList: catalogList,
        basketCounter: basket.getTotalQuantity()
    });
});

/////////////////////////////// Реакция на нажатие карточки ///////////////////////////////

events.on(settings.event.card.clicked, (data: TId) => {
    const product: IProduct = products.getProductByID(data.id);
    modal.render({
        content: cardModal.render({
            ...product,
            isInBasket: basket.checkAvailability(product.id)
        })
    })
    modal.open();
})

/////////////////////////////// Реакция на кнопку добавления/удаления товара в модальном окне карточки ///////////////////////////////

events.on(settings.event.addToBasketButton.added, (data: TId) => {
    const product: IProduct = products.getProductByID(data.id);
    basket.addProduct(product);
})
events.on(settings.event.addToBasketButton.removed, (data: TId) => {
    const product: IProduct = products.getProductByID(data.id);
    basket.removeProduct(product);
})

/////////////////////////////// Реакция на кнопку удаления товара в корзине ///////////////////////////////

events.on(settings.event.basket.removeButtonClicked, (data: TId) => {
    const product: IProduct = products.getProductByID(data.id);
    basket.removeProduct(product);
})

/////////////////////////////// Реакция на изменение корзины ///////////////////////////////

events.on(settings.event.basket.changed, (data?: TId) => {
    page.render({
        basketCounter: basket.getTotalQuantity()
    });
    const basketList = basket.getProducts().map(product => {
        const basketCard = new BasketCard(cloneTemplate(basketCardTemplate), events);
        return basketCard.render({
            ...product,
            index: basket.getIndex(product.id)
        })
    });
    basketModal.render({
        basketList: basketList,
        total: basket.getTotalPrice(),
        isEmpty: basket.isEmpty()
    });
    if(data) {
        cardModal.render({
            isInBasket: basket.checkAvailability(data.id)
        })
    }
})

/////////////////////////////// Реакция на нажатие кнопки корзины ///////////////////////////////

events.on(settings.event.basketButton.clicked, () => {
    modal.render({
        content: basketModal.render({
            isEmpty: basket.isEmpty()
        })
    })
    modal.open();
})

/////////////////////////////// Реакция на нажатие кнопки 'Оформить' в корзине ///////////////////////////////

events.on(settings.event.basket.submitButtonClicked, () => {
    modal.render({
        content: addresOrderModal.render()
    });
    order.total = basket.getTotalPrice();
    order.items = basket.getAllIDs();
});

/////////////////////////////// Реакция на нажатие кнопки 'Оформить' в в модальном окне адреса и выбора способа оплаты ///////////////////////////////

events.on(settings.event.order.paymentMethodAndAddresOrder.button.clicked, (data: TAddressOrderModal) => {
    modal.render({
        content: contactsOrderModal.render()
    })
    order.address = data.address;
    order.payment = data.payment;
})

/////////////////////////////// Реакция на нажатие кнопки 'Оформить' в в модальном окне контактов ///////////////////////////////

events.on(settings.event.order.contacts.button.clicked, (data: TContactsOrderModal) => {
    order.email = data.email;
    order.phone = data.phone;
    console.log(`На сервер отправлено:`);
    console.log(order.getValues());
    appAPI.postOrder(order.getValues()).then((data: TOrderResponse) => {
        modal.render({
            content: successOrderModal.render({
                total: data.total
            })
        })
        console.log(`В ответ получено:`);
        console.log(data);
    }).catch(console.error);
    basket.removeAll();
})

/////////////////////////////// Реакция на нажатие кнопки 'За новыми покупками' в модальном окне успешного заказа ///////////////////////////////

events.on(settings.event.order.success.button.clicked, () => {
    modal.close();
})