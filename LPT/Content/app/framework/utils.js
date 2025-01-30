
Array.prototype.copy = function (sourceArray) {
    for (var i = 0; i < sourceArray.length; i++) this.push(sourceArray[i]);
};

Array.prototype.search = function (field, value) {
    var element = null;
    $.each(this, function (index, item) {
        if (item != null && item[field] == value) {
            element = item;
        }
    });
    return element;
};

Array.prototype.replaceby = function (field, value, element) {
    var i = this.indexOf(field, value);
    if (i != null) {
        this[i] = element;
    }
    return this;
};

Array.prototype.indexOf = function (field, value) {
    for (var i = 0; i < this.length; i++) if (this[i] && this[i][field] == value) return i;
    return null;
};

Array.prototype.remove = function (field, value) {
    var next = true;
    while (next != null) {
        next = this.indexOf(field, value);
        if (next != null) {
            this.splice(next, 1);
        }
    }
};

Array.prototype.indexOfItem = function (item) {
    for (var i = 0; i < this.length; i++) {
        if (angular.equals(this[i], item)) {
            return i;
        }
    }
    return null;
};

Array.prototype.indexOfItemAttrs = function (item, attrs) {

    var result = true;
    var newItem = {};
    var arrayList = [];
    angular.copy(item, newItem);
    angular.copy(this, arrayList);

    //clean item object
    angular.forEach(newItem, function (value, key) {
        angular.forEach(attrs, function (attrValue, attrKey) {
            if (key === attrValue)
                delete newItem[attrValue];
        });
    });
    //clean this object
    for (var i = 0; i < arrayList.length; i++) {
        angular.forEach(arrayList[i], function (value, key) {
            angular.forEach(attrs, function (attrValue, attrKey) {
                if (key === attrValue)
                    delete arrayList[i][attrValue];
            });
        });
    }
    //Compare
    for (var i = 0; i < arrayList.length; i++) {
        if (angular.equals(arrayList[i], newItem)) {
            return i;
        }
    }

    return null;
};

Array.prototype.countOfItemAttrs = function (item, attrs) {

    var result = 0;
    var newItem = {};
    var arrayList = [];
    angular.copy(item, newItem);
    angular.copy(this, arrayList);

    //clean item object
    angular.forEach(newItem, function (value, key) {
        angular.forEach(attrs, function (attrValue, attrKey) {
            if (key === attrValue)
                delete newItem[attrValue];
        });
    });
    //clean this object
    for (var i = 0; i < arrayList.length; i++) {
        angular.forEach(arrayList[i], function (value, key) {
            angular.forEach(attrs, function (attrValue, attrKey) {
                if (key === attrValue)
                    delete arrayList[i][attrValue];
            });
        });
    }
    //Compare
    for (var i = 0; i < arrayList.length; i++) {
        if (angular.equals(arrayList[i], newItem)) {
            result ++;
        }
    }

    return result;
};

Array.prototype.equalArray = function (array, attrs) {

    var newItem = [];
    var arrayList = [];
    angular.copy(array, newItem);
    angular.copy(this, arrayList);

    //clean item object
    angular.forEach(newItem, function (value, key) {
        angular.forEach(attrs, function (attrValue, attrKey) {
            if (key === attrValue)
                delete newItem[attrValue];
        });
    });
    //clean this object
    angular.forEach(arrayList, function (value, key) {
        angular.forEach(attrs, function (attrValue, attrKey) {
            if (key === attrValue)
                delete newItem[attrValue];
        });
    });

    return angular.equals(newItem, arrayList);
};

Array.prototype.removeItem = function (item) {
    var index = this.indexOfItem(item);
    if (index != null) {
        this.splice(index, 1);
    }
};


Array.prototype.setIndex = function (field) {
    for (var i = 0; i < this.length; i++) if (this[i]) this[i][field] = i + 1;
};

Date.prototype.AddDays = function (days) {
    this.setTime(this.getTime() + (days * (1000 * 60 * 60 * 24)));
    return this;
};


Function.prototype.inheritsFrom = function (parentClassOrObject) {
    if (parentClassOrObject.constructor == Function) {
        //Normal Inheritance 
        this.prototype = new parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject.prototype;
    }
    else {
        //Pure Virtual Inheritance 
        this.prototype = parentClassOrObject;
        this.prototype.constructor = this;
        this.prototype.parent = parentClassOrObject;
    }
    return this;
}

var Message = function (title, message) {
    $("#Message .modal-header h4").html(title);
    $("#Message .modal-body p").html(message);
    $("#Message").modal({ backdrop: 'static' });
};

var Question = function (title, message, callback) {
    $("#Question .modal-header h4").html(title);
    $("#Question .modal-body p").html(message);
    $("#Question .modal-footer button").unbind('click').bind('click', function () {
        $("#Question").modal('hide');
        callback();
    });
    $("#Question").modal({ backdrop: 'static' });
};

var Loading = (function () {
    var visible = false;
    return {
        show: function () {
            if (visible === false) {
                visible = true;
                $("#Loading").modal('show');
            }
        },
        hide: function () {
            if (visible === true) {
                visible = false;
                $("#Loading").modal('hide');
                $('body').removeClass('modal-open');
                $('.modal-backdrop').remove();
            }
        }
    }
})();
