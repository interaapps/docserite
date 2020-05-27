/*
    JDOM IS A SIMPLE DOM SELECTOR WITH FUNCTIONS!
    This is not finished! If you want to add something, just do it!
*/


class jdom {
    constructor(element, parent=undefined) {
        if (typeof parent=='undefined')
            parent = document;

        this.usign = "queryselector";
        if (element instanceof HTMLElement || element===document  || element===window) {
            this.elem = element;
            this.usign = "htmlelement";
        } else if (element instanceof jdom) {
            this.elem = element.elem;
            this.usign = "jdom";
        } else
            this.elem = parent.querySelectorAll(element);

        this.$ = function(element){
            if (typeof this.elem[0] !== 'undefined')
                return (new jdom(element, this.elem[0]));
            return (new jdom(element, this.elem));
        }
    }

    each(func) {
        if (this.usign == "htmlelement")
            func(this.elem);
        else
            [].forEach.call(this.elem, func);
    }

    getFirstElement() {
        if (this.usign == "htmlelement")
            return this.elem;
        else if (typeof this.elem[0] != 'undefined')
            return this.elem[0];
        return undefined;
    }


    html(html) {
        if (typeof html == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.innerHTML;
            return "";
        } else {
            this.each( function (element) { element.innerHTML = html; });
            return this;
        }
    }

    text(text) {
        if (typeof text == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.innerText;
            return "";
        } else {
            this.each( function (element) { element.innerText = text; });
            return this;
        }
    }

    css(css={}, alternativeValue=undefined) {
        if (typeof css == "string" && typeof alternativeValue == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element.style[css] !== 'undefined')
                return element.style[css];
            return "";
        } else
            this.each( function (element) {
                if (typeof css == "string" && typeof alternativeValue != 'undefined') {
                    element.style[css] = alternativeValue;
                } else {
                    for (var styleAttr in css)
                        element.style[styleAttr] = css[styleAttr];
                }
            });
        return this;
    }

    attr(attributes={}, alternativeValue=undefined) {
        if (typeof attributes == "string" && typeof alternativeValue == 'undefined') {
            var element = this.getFirstElement();

            if (typeof element !== 'undefined')
                return element.getAttribute(attributes);
        } else
            this.each( function (element) {
                if (typeof attributes == "string" && typeof alternativeValue != 'undefined') {
                    element.setAttribute(attributes, alternativeValue);
                } else {
                    for (var attribute in attributes)
                        element.setAttribute(attribute, attributes[attribute]);
                }
            });
        return this;
    }

    removeAttr(name) {
        this.each(function(element) {
            element.removeAttribute(name);
        });
        return this;
    }

    addClass(name) {
        this.each( function (element) {
            element.classList.add(name);
        });
        return this;
    }

    removeClass(name) {
        this.each( function (element) {
            element.classList.remove(name);
        });
        return this;
    }

    id(name) {
        if (typeof name == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.id;
        } else {
            this.each(function(element) {
                element.id = name;
            });
        }
        return this;
    }

    val(value) {
        if (typeof value == 'undefined') {
            var element = this.getFirstElement();
            if (typeof element !== 'undefined')
                return element.value;
        } else {
            this.each(function(element) {
                element.value = value;
            });
        }
        return this;
    }

    append(append) {
        if (append instanceof HTMLElement)
            this.each( function (element) {
                element.appendChild(append);
            });
        else if (append instanceof jdom)
            this.each( function (element) {
                element.appendChild(append.elem);
            });
        else {
            var outerThis = this;
            this.each( function (element) {
                outerThis.html(outerThis.html() + append);
            });
        }
        return this;
    }

    prepend(prepend) {
        if (prepend instanceof HTMLElement)
            this.each( function (element) {
                element.prepend(prepend);
            });
        else if (prepend instanceof jdom)
            this.each( function (element) {
                element.prepend(prepend.elem);
            });
        else {
            var outerThis = this;
            this.each( function (element) {
                outerThis.html(prepend+outerThis.html());
            });
        }
        return this;
    }


    getElem(){
        return this.elem;
    }

    on(what, func, option) {
        this.each( function(element){
            element.addEventListener(what,func);
        }, option);
        return this;
    }

    rmEvent(what, func) {
        this.each(function(element) {
            element.removeEventListener(what, func);
        });
    }

    bind(binds={}) {
        this.each( function(element){
            for (var bind in binds)
                element.addEventListener(bind, binds[bind]);
        });
        return this;
    }

    click(func){
        if (typeof func != 'undefined')
            this.on('click', func);
        else
            (this.getFirstElement()).click();

        return this;
    }

    contextmenu(func) { return this.on('contextmenu', func); }
    change(func) { return this.on('change', func); }
    mouseover(func) { return this.on('mouseover', func); }
    keypress(func) { return this.on('keypress', func); }
    keyup(func) { return this.on('keyup', func); }
    keydown(func) { return this.on('keydown', func); }
    dblclick(func) { return this.on('dblclick', func); }
    resize(func) { return this.on('resize', func); }

    timeupdate(func) { return this.on('timeupdate', func); }
    touchcancle(func) { return this.on('touchcancle', func); }
    touchend(func) { return this.on('touchend', func); }
    touchmove(func) { return this.on('touchmove', func); }
    touchstart(func) { return this.on('touchstart', func); }

    drag(func) { return this.on('drag', func); }
    dragenter(func) { return this.on('dragenter', func); }
    dragleave(func) { return this.on('dragleave', func); }
    dragover(func) { return this.on('dragover', func); }
    dragend(func) { return this.on('dragend', func); }
    dragstart(func) { return this.on('dragstart', func); }
    drop(func) { return this.on('drop', func); }

    focus(func) { return this.on('focus', func); }
    focusout(func) { return this.on('focusout', func); }
    focusin(func) { return this.on('focusin', func); }
    invalid(func) { return this.on('invalid', func); }
    popstate(func) { return this.on('popstate', func); }
    volumechange(func) { return this.on('volumechange', func); }
    unload(func) { return this.on('unload', func); }
    offline(func) { return this.on('offline', func); }
    online(func) { return this.on('online', func); }
    focus(func) { return this.on('focus', func); }

    ready(func) {
        this.on('DOMContentLoaded', func);
        return this;
    }

    hide() {
        this.each( function(element){
            element.style.display = "none";
        });
        return this;
    }

    show() {
        this.each( function(element){
            element.style.display = "";
        });
        return this;
    }

    toggle() {
        this.each( function(element){
            if (element.style.display == "none")
                element.style.display = "";
            else
                element.style.display = "none";
        });
        return this;

    }

    animate(css={}, duration=1000, then=function(){}) {
        this.css("transition", duration+"ms");
        this.css(css);
        setTimeout(function() {
            then();
        }, duration);
        return this;
    }

    animator(animations=[], async = false){
        var counting = 0;
        var outerThis = this;
        for (var animation in animations) {
            const css = typeof animations[animation].css != 'undefined' ? animations[animation].css : {};
            const then = typeof animations[animation].then != 'undefined' ? animations[animation].then : function () {};
            const duration = typeof animations[animation].duration != 'undefined' ? animations[animation].duration : 1000;
            setTimeout(function(){
                outerThis.animate(css, duration, then);
            }, counting);
            if (!async)
                counting += duration;
        }
        return this;
    }

    static noConflict() {
        var $ = _$beforeJdom;
        var $n = _$nBeforeJdom;
        var $$ = _$$beforeJdom;
    }

}

if (typeof $ != 'undefined')
    var _$beforeJdom  = $;
if (typeof $n != 'undefined')
    var _$nBeforeJdom = $n;
if (typeof $$ != 'undefined')
    var _$$beforeJdom = $$;

$jdomfn = function(name, func){
    jdom.prototype[name] = func;
}

$jdomGetter = function(varName){
    varNameArray = varName.split("");
    if (varNameArray[0] !== undefined)
        varNameArray[0] = varName[0].toUpperCase();
    var out = "";
    for (letter in varNameArray)
        out += varNameArray[letter];
    jdom.prototype["get"+out] = function(){
        return this.getFirstElement()[varName];
    }
}

$jdomSetter = function(varName){
    varNameArray = varName.split("");
    if (varNameArray[0] !== undefined)
        varNameArray[0] = varName[0].toUpperCase();
    var out = "";
    for (letter in varNameArray)
        out += varNameArray[letter];
    jdom.prototype["set"+out] = function(value){
        this.each(function(elem){
            elem[varName] = value;
        });
        return this;
    }
}

var $ = function(element){
    return (new jdom(element));
}

var $jdom = function(element){
    return (new jdom(element));
}

var $n = function(element="div"){
    return (new jdom(document.createElement(element)));
}

var $$ = function (element) {
    return document.querySelectorAll(element);
}


if ( typeof module === "object" && typeof module.exports === "object" ) {
    module.exports = $;
}
class CajaxRequest {
    constructor(url,method, data=null, options={}) {
        // INIT
        this.onResponseFunction = ()=>{};
        this.catchFunction = ()=>{};
        this.thenFunction = ()=>{};

        if (data != null) {
            var urlEncodedData = "";
            var urlEncodedDataPairs = [];
            var name;
            for(name in data) {
                urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
            }
            this.data = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
        } else this.data = null;
        this.method = method;
        this.contenttype = (options.usinginput) ? "application/json; charset=utf-8" : "application/x-www-form-urlencoded";

        var xhr = new XMLHttpRequest();

        if (options != null)
            for (var options_key__cajax in options) {
                xhr[options_key__cajax] = options[options_key__cajax];
            }


        xhr.open(method, url+((this.method=="GET")? "?"+this.data : "" ));
        if (options.header != null) for (var requestheader_obj__cajax in options.header) {
            xhr.setRequestHeader(requestheader_obj__cajax, options.header[requestheader_obj__cajax]);
        }

        xhr.setRequestHeader('Content-type', this.contenttype);
        this.request = xhr;
        if (options.usinginput && data != null) this.data = JSON.stringify(data);
    }

    response (func) {
        this.onResponseFunction = func;
        return this;
    }

    then (func) {
        this.thenFunction = func;
        return this;
    }

    catch (func) {
        this.catchFunction = func;
        return this;
    }

    custom (func) {
        func(this.request);
        return this;
    }

    send () {

        (this.request).onload = () => {
            this.onResponseFunction(this.request);
            if ((this.request).readyState == 4 && ((this.request).status == "200" || (this.request).status == "201")) {
                this.thenFunction((this.request));
            } else {
                this.catchFunction((this.request));
            }
        };

        (this.request).send(this.data);
        return this;
    }
}

function PrajaxPromise(url,method, data=null, options={}) {
    return new Promise( (done, error)=>{

            var request = new CajaxRequest(url,method, data, options);
            request.then((resp)=>{
                done(resp);
            });

            request.catch((resp)=>{
                error(resp);
            });

            if (typeof options.cajax != 'undefined') {
                if (typeof options.cajax.custom != 'undefined')
                    request.cajax.custom(options.cajax.custom);

                if (typeof options.cajax.response != 'undefined')
                    request.cajax.response(options.cajax.response);
            }

            request.send();

        }
    )
}

class Cajax {

    static post(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "POST", data, options, usinginput);
    }

    static get(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "GET", data, options, usinginput);
    }

    static put(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "POST", data, options, usinginput);
    }

    static delete(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "DELETE", data, options, usinginput);
    }

    static trace(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "TRACE", data, options, usinginput);
    }

    static connect(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "CONNECT", data, options, usinginput);
    }

    static options(url, data={}, options={}, usinginput=false) {
        return new CajaxRequest(url, "OPTIONS", data, options, usinginput);
    }

    static ajax (json) {
        return new CajaxRequest(
            ((json.url != null) ? json.url : false ),
            ((json.method != null) ? json.method : false ),
            ((json.options != null) ? json.options : false ),
            ((json.data != null) ? json.data : false ),
            ((json.input != null) ? json.input : false ));
    }
}


class Prajax {

    static post(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "POST", data, options, usinginput);
    }

    static get(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "GET", data, options, usinginput);
    }

    static put(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "POST", data, options, usinginput);
    }

    static delete(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "DELETE", data, options, usinginput);
    }

    static trace(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "TRACE", data, options, usinginput);
    }

    static connect(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "CONNECT", data, options, usinginput);
    }

    static options(url, data={}, options={}, usinginput=false) {
        return PrajaxPromise(url, "OPTIONS", data, options, usinginput);
    }

    static ajax (json) {
        return PrajaxPromise(
            ((json.url != null) ? json.url : false ),
            ((json.method != null) ? json.method : false ),
            ((json.options != null) ? json.options : false ),
            ((json.data != null) ? json.data : false ),
            ((json.input != null) ? json.input : false ));
    }
}class Alert {
    constructor(settings = {closebtn: true, canexit: true, title: ""}) {
        this.canexit = (settings.canexit != null) ? settings.canexit : true;
        this.closebtn = (settings.closebtn != null) ? settings.closebtn : true;
        this.title = (settings.title != null) ? settings.title : "";

        this.backElement = document.createElement("div");
        $(this.backElement).addClass("alert_background");
        $("html").append(this.backElement);
        this.element = document.createElement("div");
        this.contents = document.createElement("div");
        $(this.contents).addClass("alert_contents");
        this.backElement.appendChild(this.element);
        this.element.appendChild(this.contents);
        $(this.element).addClass("alert_alert");
        var outerThis = this;

        $(this.backElement).click(function() {
            console.log(outerThis.canexit);
            if (outerThis.canexit) {
                outerThis.close();
            }
        });

        $(this.element).click(function(e) {
            e.stopPropagation();
        });
        if (this.closebtn) {
            var close = document.createElement("a");
            $(close).addClass("waves-effect");
            $(close).addClass("alert_closebutton");
            $(close).html("<i class='material-icons'>close</i>");
            $(close).click(function() {
                outerThis.close();
            });
            outerThis.element.appendChild(close);
        }

        var titleElement = document.createElement("a");
        $(titleElement).html(this.title).addClass("alert_title");
        this.element.appendChild(titleElement);

        this.toolbar = document.createElement("div");
        $(this.toolbar).addClass("alert_toolbar");
        this.element.appendChild(this.toolbar);

        this.close();
    }

    close() {
        $(this.backElement).hide();
        return this;
    }

    open() {
        $(this.backElement).show();
        return this;
    }

    addButton(name, clicked, icon=false) {
        var btn = document.createElement("a");
        $(btn).addClass("alert_button");
        $(btn).click(clicked);
        var iconHtml = "";
        if (icon !== false)
            iconHtml = "<i class='material-icons'>"+icon+"</i>";

        $(btn).html(iconHtml+"<span>"+name+"</span>");
        this.toolbar.appendChild(btn);
        return this;
    }

    addHtml(html) {
        $(this.contents).append(html);
        return this;
    }

    setHtml(html) {
        $(this.contents).html(html);
        return this;
    }

    e() {
        return this.element;
    }

    be() {
        return this.backElement;
    }

}

var snackBarTimeout;

function showSnackBar(text, color="#17fc2e", background="#1e212b") {
    var snackbar = document.querySelector('#snackbar');
    snackbar.textContent = text;
    snackbar.style.color = color;
    snackbar.style.backgroundColor = background;
    snackbar.classList.add('show');
    clearTimeout(snackBarTimeout);
    snackBarTimeout = setTimeout(() => {
        snackbar.classList.remove('show');
    }, 1500);
}



$(window).on("online", function(){
    showSnackBar("You are online!");
});

$(window).on("offline", function(){
    showSnackBar("You are offline!", "#fa1121");
});


var sidenavOpened = false;

function openNav() {
    $(".sidenav").css({
        width:"270px",
        display: "block",
        top: "0",
        marginTop: "0px"
    });
    $("#behind_sidenav").css({
        width: "100%",
        background: "#32323250",
        position: "fixed",
        zIndex: "10000",
        top: "0"
    });
    sidenavOpened = true;
}

function closeNav() {
    $(".sidenav").css({
        width:"0px",
        display: "none",
        top: "0",
        paddingTop: "20px"
    });
    $("#behind_sidenav").css({
        background: "none",
        width: "0px"
    });
    sidenavOpened = false;
}

function checkResize() {
    if (window.innerWidth >= 720){
        $(".sidenav").css({
            width:"270px",
            display: "block",
            top: "65px",
            paddingTop: "20px"
        });

        $("#behind_sidenav").css({
            background: "none",
            width: "270px",
            paddingTop: "20px"
        });
    }
}

$(window).on("resize", function(){
    checkResize();
});



$(window).on("resize", function(){
    $("#behind_sidenav").css({
        width: "270px"
    });
    if (window.innerWidth <= 720){
        closeNav();
    }
});


function checkScroll() {

    if (window.pageYOffset > 1) {
        nav.style.boxShadow = " rgba(0, 0, 0, 0.55) 0px -45px 18px 34px";
    }
    else {
        nav.style.boxShadow = "0px 7px 17px -10px rgba(0,0,0,0)";
    }

}
$(document).ready(function() {
    var nav = $("#nav");
    var navmenu = document.getElementById("navmenu");
    checkScroll();
    window.onscroll = function() {
        checkScroll();
    };
    checkResize();
    if (window.innerWidth <= 720){
        closeNav();
    }

    $(".menubtn").click(function() {
        if (sidenavOpened)
            closeNav();
        else
            openNav();

    });

    $("#behind_sidenav").click(function() {
        if (sidenavOpened) closeNav();

    });

    $(".sidenav-submenu-opener").click(function(){
        if ($(this).$("i").css("transform") === "rotate(90deg)") {
            $(".sidenav-submenu[menu="+$(this).attr("menu")+"]").css("display", "");
            $(this).$("i").css("transform", "rotate(0deg)");
        } else {
            $(".sidenav-submenu[menu="+$(this).attr("menu")+"]").css("display", "block");
            $(this).$("i").css("transform", "rotate(90deg)");
        }
    });

});

let profilePictureImageBase64 = "";
let responseAlert = new Alert({
    closebtn: false,
    canexit: false,
    title: ""
});