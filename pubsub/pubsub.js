/**
 * Конструктор класса обмена сообщениями
 * @constructor
 */
function PubSub(){
    this.handlerBox = {};
};

/**
 * Функция подписки на событие
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет вызвана при возникновении события
 * @return {function}         ссылка на handler
 */
PubSub.prototype.subscribe = function(eventName, handler) {
    if (this.handlerBox[eventName] == undefined) this.handlerBox[eventName] = [];
    PubSub.handlerBox[eventName].push(handler);
    return handler;
};

/**
 * Функция отписки от события
 * @param  {string} eventName имя события
 * @param  {function} handler функция которая будет отписана
 * @return {function}         ссылка на handler
 */
PubSub.prototype.unsubscribe = function(eventName, handler) {

    var tempWay = this.handlerBox[eventName];

    while (tempWay.indexOf(handler) != -1){
        tempWay.splice(tempWay.indexOf(handler), 1);
    }

    return handler;
};

/**
 * Функция генерирующая событие
 * @param  {string} eventName имя события
 * @param  {object} data      данные для обработки соответствующими функциями
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.publish = function(eventName, data) {

    if (this.handlerBox[eventName] == undefined){
        return false;
    } else{
        this.handlerBox[eventName].forEach(function(item){
            setTimeout(item(eventName, data), 5);
        });
        return true;
    }
};

/**
 * Функция отписывающая все функции от определённого события
 * @param  {string} eventName имя события
 * @return {bool}             удачен ли результат операции
 */
PubSub.prototype.off = function(eventName) {

    if (this.handlerBox[eventName] == undefined){
        return false;
    } else { 
        this.handlerBox[eventName] = undefined;
        return true;
    }
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

Function.prototype.subscribe = function(event){
    PubSub.subscribe(event, this);
}

Function.prototype.unsubscribe = function(event){
    PubSub.unsubscribe(event, this);
}

function foo(event, data) {
    //body…
}

/*foo.subscribe('click');

foo.unsubscribe('click');*/

