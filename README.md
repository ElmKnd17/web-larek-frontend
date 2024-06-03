
https://github.com/ElmKnd17/web-larek-frontend.git

# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Краткое описание разработанного решения

Архитектура состоит из трёх частей, а именно: слоя данных, слоя представления и слоя взаимодействия слоёв

Слой данных представляет себя набор классов, взаимодействующих с данными
В контексте данной проектной работы слой данных отвечают за:
1) получение/отправку данных на сервер (`AppAPI`)
2) хранение/обновление данных корзины (`Basket`)
3) хранение/обновление данных заказа (`Order`)
4) хранение данных продуктов (`Products`)

Слой представления представляет собой набор классов, взаимодействующий с DOM-элементами страницы
В контексте данной проектной работы слой представления отвечает за:
1) отображение страницы (`Page`)
2) отображение модального окна (`Modal`)
3) отображение модального окна корзины (`BasketModal`)
4) отображение модального окна ввода контактов (`ContactsOrderModal`)
5) отображения модального окна успешного заказа (`SuccessOrderModal`)
6) отображение модального окна карточки продукта (`CardModal`)
7) отображение модального окна выбора способа оплаты (`AddresOrderModal`)
8) отображение карточки товара в каталоге (`CatalogCard`)
9) отображение карточки товара в корзине (`BasketCard`)

Слой взаимодействия слоёв представляет из себя один скрипт (`index.ts`)
Взаимодействие происходит за счёт использования брокера событий
Компоненты слоёв вызывают/реагируют на определённые события, что приводит к взаимодействию при определённых событиях

## Архитектура

В качестве архитектуры использовалась архитектура MVP (Model View Presenter)

## Model (Слой данных)

### Класс Model

Абстрактный класс, являющийся шаблоном для классов слоя данных

Поля:
-    `events: IEvents` - объект брокера событий

Параметры в конструкторе:
-    `events: IEvents` - объект брокера событий

### Класс Basket

Класс, отвечающий за работу с данными корзины

Поля:
-    `products: IProduct[]` - массив продуктов

Параметры в конструкторе:
-    `events: IEvents` - объект брокера событий

Методы:
-    `addProduct(product: IProduct): void` - метод добавления продукта в корзину
-    `removeProduct(product: IProduct): void` - метод удаления продукта из корзины
-    `getProducts(): IProduct[]` - метод получения продуктов корзины
-    `removeAll(): void` - метод удаления всех продуктов из корзины
-    `getTotalQuantity(): number` - метод получения общего количества продуктов в корзине
-    `getTotalPrice(): number` - метод получения общей суммы продуктов в корзине
-    `getPrice(id: string): number` - метод получения цены продукта
-    `checkAvailability(id: string): boolean` - метод проверки наличия продукта в корзине
-    `getIndex(id: string): number` - метод получени порядкового номера продукта в корзине
-    `getAllIDs(): string[]` - метод получения всех идентификаторов продукта
-    `isEmpty(): boolean` - метод проверки отсутствия продуктов в корзине

### Класс Order

Класс отвечающий за работу с данными заказа

Поля:
-    `protected _payment: string` - строка, содержащая информацию о способе оплаты
-    `protected _email: string` - строка, содержащая почту
-    `protected _phone: string` - строка, содержащая номер телефона
-    `protected _address: string` - строка, содержащая адрес
-    `protected _total: number` - общая сумма заказа
-    `protected _items: string[]` - массив идентификаторов продуктов заказа

Параметры в конструкторе:
-    `events: IEvents` - объект брокера событий

Методы:
-    `getValues(): TOrder` - метод получения данных заказа
-    `removeAll()` - метод обнуления данных заказа

### Класс Products

Класс, отвечающий за работу с данными продуктов

Поля:
-    `products: IProduct[]` - массив, содержащий продукты

Параметры конструктора:
-    `events: IEvents` - объект брокера событий

Методы:
-    `setProducts(products: IProduct[]): void` - метод установки массива данных продуктов
-    `getProducts(): IProduct[]` - метод получения массива данных продуктов
-    `getProductByID(id: string): IProduct` - метод получения данных продукта

### Класс AppAPI

Класс, содержащий логику работы запросов к серверу

Поля:
-    `readonly cdn: string` - строка, содержащая путь до контента сайта

Параметры конструктора:
-    `cdn: string` - строка, содержащая путь до контента сайта
-    `baseUrl: string` - строка, содержащая базовый путь для работы с сервером
-    `options?: RequestInit` - опции для работы с сервером

Методы:
-    `getProducts(): Promise<IProduct[]>` - метод для получения данных продуктов с сервера
-    `postOrder(order: TOrder): Promise<TOrderResponse>` - метод для отправки данных заказа на сервер

## View (Слой представления)

#### Класс View

Абстрактный класс, являющийся шаблоном для других классов представления

Поля:
-    `protected _container: HTMLElement` - DOM-элемент
-    `protected events: IEvents` - объект обработчика событий

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

Методы:
-    `render(data?: Partial<T>): HTMLElement` - метод, возвращающий созданный/обновлённый HTML-элемент
-    `setDisabled(button: HTMLButtonElement): void` - метод отключения взаимодействия с кнопкой
-    `removeDisabled(button: HTMLButtonElement): void` - метод включения взаимодействия с кнопкой
-    `setTextContent(element: HTMLElement, textContent: string): void` - метод установки текстового контента DOM-элементам
-    `setInputValue(input: HTMLInputElement, value: string): void` - метод установки значения полям ввода
-    `addClass(element: HTMLElement, value: string): void` - метода добавления класса DOM-элементу
-    `removeClass(element: HTMLElement, value: string): void` - метода удаления класса DOM-элемента
-    `isContainsClass(element: HTMLElement, value: string): boolean` - метод проверки наличия у DOM-элемента класса
-    `setImage(image: HTMLImageElement, link: string): void` - метод установки ссылки на изображение элементу картинки

#### Класс Modal

Класс, отвечающий за представление модальных окон на странице

Поля:
-    `protected _content: HTMLElement` - DOM-элемент
-    `protected _closeButton: HTMLButtonElement` - DOM-элемент кнопки закрытия модального окна
-    `private _boundCloseByEscapeHandler: (evt: KeyboardEvent) => void` - коллбэк обработчика закрытия модального окна нажатием кнопки Escape
-    `private _boundCloseByOverlayHandler: (evt: MouseEvent) => void` - коллбэк обработчика закрытия модального окна нажатием на область вне модального окна
-    `private _boundCloseByButtonHandler: () => void` - коллбэк обработчика закрытия модального окна нажатием на кнопку закрытия

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

Методы:
-    `private closeByEscapeHandler(evt: KeyboardEvent)` - коллбэк обработчика закрытия модального окна нажатием кнопки Escape
-    `private closeByOverlayHandler(evt: MouseEvent)` - коллбэк обработчика закрытия модального окна нажатием на область вне модального окна
-    `private closeByButtonHandler()` - коллбэк обработчика закрытия модального окна нажатием на кнопку закрытия
-    `open(): void` - метод открытия модального окна
-    `close(): void` - метод закрытия модальног окна
-    `setModalListeners(): void` - метод установки слушателей для взаимодействия с модальным окном
-    `removeModalListeners(): void` - метод удаления слушателей для взаимодействия с модальным окном

### Класс Page

Класс, отвечающий за представление главной страницы

Поля:
-    `protected _catalog: HTMLDivElement` - DOM-элемент каталога
-    `protected _basketButton: HTMLButtonElement` - DOM-элемент кнопки корзины
-    `protected _screen: HTMLElement` - DOM-элемент страницы
-    `protected _basketCounter: HTMLSpanElement` - DOM-элемент счётчика товаров в корзине

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

Методы:
-    `lockScreen(): void` - метод блокировки экрана
-    `unlockScreen(): void` - метод разблокировки экрана
    <!-- `setBasketCounter(value: string): void` - метод установки значения счётчика товаров в корзине -->

### Класс OrderModal

Абстрактный класс, являющийся шаблоном для модальных окон заказа

Поля:
-    `protected _submitButton: HTMLButtonElement;` - DOM-элемент кнопки подтверждения введённых данных
-    `protected _errorMessage: HTMLSpanElement;` - DOM-элемент строки, содержащей информацию об ошибке

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

Методы:
-    `abstract isValid(): boolean` - абстрактный метод проверки валидации модального окна заказа
-    `abstract resetAll(): void` - абстрактный метод сброса модального окна заказа к состояни по умолчанию
-    `setValidity(): void` - метод установки реакции на валиацию модального окна заказа
-    `setError(): void` - метод установки сообщения об ошибке модального окна заказа

### AddressOrderModal

Класс, отвечающий за представление модального окна выбора способа оплаты и ввода адреса

Поля:
-    `protected _cardMethodButton: HTMLButtonElement` - DOM-элемент кнопки выбора онлайн-оплаты
-    `protected _cashMethodButton: HTMLButtonElement` - DOM-элемент кнопки выбора наличной оплаты
-    `protected _addresInput: HTMLInputElement` - DOM-элемент поля ввода адреса
-    `protected _addres: string` - строка, содержащая введённый адрес
-    `protected _payment: string` - строка, содержащая информацию о способе оплаты

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

Методы:
-    `setSelection(evt: MouseEvent): void` - метод, обозначающий выбранную кнопку способа оплаты
-    `resetSelection(): void` - метод, сбрасывающий обозначение кнопок способа оплаты
-    `resetAll(): void` - метод очистки полей ввода и кнопок способа оплаты
-    `isValid(): boolean` - метод проверки валидности

### Класс ContantsOrderModal

Класс, отвечающий за представление модального окна контактов

Поля:
-    `protected _emailInput: HTMLInputElement` - DOM-элемент поля ввода почты
-    `protected _phoneNumberInput: HTMLInputElement;` - DOM-элемент поля ввода номера телефона
-    `protected _email: string` - строка, содержащая почту
-    `protected _phoneNumber: string` - строка, содердащая номер телефона

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

Методы:
-    `resetAll(): void` - метод очистки полей ввода
-    `isValid(): boolean` - метод проверки валидности

### Класс SuccessOrderModal

Класс, отвечающий за представление модального окна успешного заказа

Поля:
-    `protected _description: HTMLParagraphElement` - DOM-элемент описания
-    `protected _successButton: HTMLButtonElement` - DOM-элемент дополнительной кнопки закрытия модального окна

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

### BasketModal

Класс, отвечающий за представление модального окна корзины

Поля:
-    `protected _basketList: HTMLDivElement` - DOM-элемент списка продуктов в корзине
-    `protected _total: HTMLSpanElement` - DOM-элемент общей суммы продуктов корзины
-    `protected _button: HTMLButtonElement` - DOM-элемент кнопки перехода к оформлению заказа

### Класс CardModal

Класс, отвечающий за представления модального окна карточки продукта

Поля:
-    `protected _id: string` - строка, содержащя индентификатора продукта
-    `protected _button: HTMLButtonElement` - DOM-элемент кнопки добавления/удаления продукта из корзины
-    `protected _description: HTMLParagraphElement` - DOM-элемент описания продукта
-    `protected _image: HTMLImageElement` - DOM-элемент картинки продукта
-    `protected _title: HTMLHeadElement` - DOM-элемент названия продукта
-    `protected _category: HTMLSpanElement` - DOM-элемент категории продукта
-    `protected _price: HTMLSpanElement` - DOM-элемент цены продукта
-    `protected _boundAddToBasketButtonHandler: () => void` - коллбэк добавления продукта в корзину
-    `protected _boundRemoveFromBasketButtonHandler: () => void` - коллбэк добавления продукта в корзину

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

Методы:
-    `private addToBasketButtonHandler()` - коллбэк добавления продукта в корзину
-    `private removeFromBasketButtonHandler()` - коллбэк добавления продукта в корзину

### Класс BasketCard

Класс, отвечающий за представление карточки продукта в корзине

Поля:
-    `protected _id: string` - строка, содержащая идентификатор продукта
-    `protected _title: HTMLSpanElement` - DOM-элемент названия товара
-    `protected _price: HTMLSpanElement` - DOM-элемент цены товара
-    `protected _index: HTMLSpanElement` - DOM-элемент порядкового номера продукта в корзине
-    `protected _deleteButton: HTMLButtonElement` - DOM-элемент кнопки удаления продукта из корзины

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

### Класс CatalogCard

Класс, отвечающий за представление каталога

Поля:
-    `protected _id: string` - строка, содержащая идентификатор продукта
-    `protected _title: HTMLSpanElement` - DOM-элемент названия продукта
-    `protected _price: HTMLSpanElement` - DOM-элемент цены продукта
-    `protected _image: HTMLImageElement` - DOM-элемент картинки продукта
-    `protected _category: HTMLSpanElement` - DOM-элемент категории продукта

Параметры в конструкторе:
-    `container: HTMLElement` - DOM-элемент
-    `events: IEvents` - объект обработчика событий

## Presenter (Слой взаимодействия Model и View слоёв)

Слой, представляющий из себя взаимодействие слоёв Model и View
Реализован слой в файле index.ts

События:
-    `basket:changed` - событие изменения продуктов в корзине
-    `basketRemoveButton:clicked` - событие нажатия на кнопку удаления в модальном окне корзины
-    `basketSubmitButton:clicked` - событие нажатия на кнопку подтверждения в модальном окне корзины
-    `products:received` - событие успешного получения данных о продуктах с сервера
-    `card:clicked` - событие нажатия на карточку продукта в каталоге
-    `modal:opened` - событие открытия модального окна
-    `modal:closed` - событие закрытия модального окна
-    `addToBasketButton:added` - событие добавления продукта в корзину по нажатию на соответствующую кнопку в модальном окне продукта
-    `addToBasketButton:removed` - событие удаления продукта из корзину по нажатию на соответствующую кнопку в модальном окне продукта
-    `basketButton:clicked` - событие нажатия кнопки корзины
-    `paymentMethodAndAddresOrderButton:clicked` - событие нажатия на кнопку подтверждения в модальном окне выбора способа оплаты
-    `contactsOrderButton:clicked` - событие нажатия на кнопку подтверждения в модальном окне контактов
-    `successOrderButton:clicked` - событие нажатия на кнопку подтверждения в модальном окне успешного заказа