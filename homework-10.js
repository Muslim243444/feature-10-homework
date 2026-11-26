import { productsData } from './data.js';

// Выведем в консоль, чтобы проверить, что данные загрузились
console.log("Данные продуктов загружены:", productsData);

// Задание 3. Шаблон продуктовой карточки
function getProductCardTemplate(product) {
    const ingredientsHTML = product.ingredients.map(ing => `<li>${ing}</li>`).join('');

    return `
        <div class="products__item card">
            <img src="${product.imgSrc}" alt="${product.altText}" class="card__image" height="245">
            <h3 class="card__category">${product.category}</h3>
            <h2 class="card__name">${product.title}</h2>
            <div class="card__description">
                <p>${product.description}</p>
            </div>
            <div class="card__compound compound">
                <span class="compound__name">Состав:</span>
                <ul class="compound__list clear-list">
                    ${ingredientsHTML}
                </ul>
            </div>
            <div class="card__price">
                <b>Цена</b> ${product.price} ₽
            </div>
        </div>
    `;
}

// Задание 4. Использование метода reduce()
const productDescriptions = productsData.reduce((acc, product) => {
    acc[product.title] = product.description;
    return acc;
}, {});

console.log("Объект с названиями и описаниями (reduce):", productDescriptions);

// Задание 5. Функции для ввода и рендеринга
function getCardCount() {
    let count = prompt("Сколько карточек отобразить? От 1 до 5");
    count = Number(count); 
    if (isNaN(count) || count < 1 || count > 5) {
        alert("Ошибка! Нужно ввести число от 1 до 5.");
        return getCardCount(); // Рекурсивно вызываем функцию заново, пока не введут правильно
    }
    
    return count;
}

function renderProducts(array) {
    const container = document.querySelector('.products');
    container.innerHTML = ''; 
    const cardsHTML = array.map(product => getProductCardTemplate(product)).join('');
    
    // Вставляем готовый HTML внутрь контейнера
    container.innerHTML = cardsHTML;
}

// ==========================================
// ЗАПУСК (При старте страницы)
// ==========================================

// 1. Спрашиваем у пользователя, сколько карточек показать
const userCount = getCardCount();

// 2. Обрезаем исходный массив (берем только нужное количество)
// Метод slice(0, userCount) берет элементы с 0-го индекса до userCount (не включая его)
const productsToRender = productsData.slice(0, userCount);

// 3. Рендерим (отрисовываем) их на странице
renderProducts(productsToRender);