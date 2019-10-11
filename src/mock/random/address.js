/*
    ## Address
*/

let {pick} = require('./helper')
let {string} = require('./basic')

var {DICT_FIXED, DICT} = require('./address_dict')
var { CHINA_MOBILE_DICT, CHINA_UNICOM_DICT, CHINA_TELECOM_DICT, CHINA_DICT } = require('./phone_dict')
var REGION = ['东北', '华北', '华东', '华中', '华南', '西南', '西北']

let _city = function (provinceCode) {
    var province
    if (provinceCode) province = DICT_FIXED.find(p => p.id === provinceCode)
    if (!province) province = pick(DICT_FIXED)
    return pick(province.children)
}

let _county = function (provinceCode, cityCode) {
    var province
    if (provinceCode) province = DICT_FIXED.find(p => p.id === provinceCode)
    if (!province) province = pick(DICT_FIXED)

    var city
    if (cityCode) city = province.children.find(c => c.id === cityCode)
    if (!city) city = pick(province.children)

    return pick(city.children) || { name: '-' }
}

module.exports = {
    // 随机生成一个大区。
    region: function() {
        return pick(REGION)
    },
    // 随机生成一个（中国）省（或直辖市、自治区、特别行政区）。
    province: function() {
        return pick(DICT_FIXED).name
    },
    // 随机生成一个（中国）市。
    city: function (provinceCode) {
        return _city(provinceCode).name
    },
    // 随机生成一个（中国）县。
    county: function (provinceCode, cityCode) {
        return _county(provinceCode, cityCode).name
    },
    provinceCode: function () {
        return pick(DICT_FIXED).id
    },
    // 随机生成一个（中国）市。
    cityCode: function (provinceCode) {
        return _city(provinceCode).id
    },
    // 随机生成一个（中国）县。
    countyCode: function (provinceCode, cityCode) {
        return _county(provinceCode, cityCode).id
    },
    // 随机生成一个邮政编码（六位数字）。
    zip: function(len) {
        var zip = ''
        for (var i = 0; i < (len || 6); i++) zip += this.natural(0, 9)
        return zip
    },

    // address: function() {},
    phone: function (operator) {
        let operatorPrefix

        if (operator === 'mobile') {
            operatorPrefix = pick(CHINA_MOBILE_DICT)
        } else if (operator === 'unicom') {
            operatorPrefix = pick(CHINA_UNICOM_DICT)
        } else if (operator === 'telecom') {
            operatorPrefix = pick(CHINA_TELECOM_DICT)
        } else {
            operatorPrefix = pick(CHINA_DICT)
        }
        return operatorPrefix + string('number', 8)
    },
    // areacode: function(name) {
    //     return DICT[name] || 0;
    // }
    areaName: function (code) {
        return DICT[code]
    }
    // street: function() {},
    // street_suffixes: function() {},
    // street_suffix: function() {},
    // states: function() {},
    // state: function() {},
}