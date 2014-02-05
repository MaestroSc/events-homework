/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */
function PubSub(){
    this.handlerBox = {};
    var thisFunction = this;

    Function.prototype.subscribe = function(event){
        thisFunction.subscribe(event, this);
    }
    Function.prototype.unsubscribe = function(event){
        thisFunction.unsubscribe(event, this);
    }
};

/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {
    
    var thisHandler = this.handlerBox; //Если объявить с [eventName], то 

    if (!thisHandler[eventName]) thisHandler[eventName] = []; // здесь тогда в объекте некорректно создастся поле для [eventName] и 

    thisHandler = thisHandler[eventName];
    
    if (thisHandler.indexOf(handler) == -1) thisHandler.push(handler); // здесь результат indexOf будет undefained
    return handler;
};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */
PubSub.prototype.unsubscribe = function(eventName, handler) {
    var thisHandler = this.handlerBox[eventName], handlerIndex = thisHandler.indexOf(handler);

    if (handlerIndex != -1) thisHandler.splice(handlerIndex, 1);

    return handler;
};

/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.publish = function(eventName, data) {
    var thisHandler = this.handlerBox[eventName];

    if (!thisHandler) return false;

    thisHandler.forEach(function(item) {
        setTimeout(
            function(){ return item(eventName, data); },
            5
        );
    });

    return true;
}

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {

    if (!this.handlerBox[eventName]) return false;
    
    this.handlerBox[eventName] = undefined;
    return true;
};

var PubSub = new PubSub();

/**
 * @example
 *
 * PubSub.subscribe('click', function(event, data) { console.log(data) });
 * var second = PubSub.subscribe('click', function(event, data) { console.log(data) });
 *
 * //Отписать одну функцию от события 'click':
 * PubSub.unsubscribe('click', second);
 *
 * //Отписать группу функций от события 'click'
 * PubSub.off('click');
 */

/*
    Дополнительный вариант — без явного использования глобального объекта
    нужно заставить работать методы верно у любой функции
 */

function foo(event, data) {
    //body…
}

/*foo.subscribe('click');

foo.unsubscribe('click');*/

